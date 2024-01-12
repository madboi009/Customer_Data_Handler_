import { Component, ViewChild } from '@angular/core';
import { CustomerDataService } from '../services/customer-data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../header/header.component'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  

  faPen = faPen;
  faTrash = faTrash;
  selectedUser: any;
  visibleButtonsMap: { [key: string]: boolean } = {};
  isEditModeMap: { [key: string]: boolean } = {};



  public customersdatav: any;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['Id', 'Name', 'State'];
  numberofclicks: number = 0;

  isEditMode = false;
  isaddMode = false;
  editingUserId: string | null = null;

  editNameValue = "";
  editStateValue = "";

  Editform!: FormGroup;

  constructor(private fb: FormBuilder, public customersdata: CustomerDataService, private _snackBar: MatSnackBar) {
    this.gettabledata();
  }

  gettabledata() {
    this.customersdata.GetAllCustomers().subscribe((data) => {
      this.customersdatav = data;
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'ok', {
      duration: 2000,
    });
  }

  showButtons(user: any) {
    if (this.selectedUser === user) {
      this.visibleButtonsMap[this.selectedUser] = !this.visibleButtonsMap[this.selectedUser];
      this.isEditModeMap[user] = false;
    } else {
      for (const key in this.visibleButtonsMap) {
        if (Object.prototype.hasOwnProperty.call(this.visibleButtonsMap, key)) {
          this.visibleButtonsMap[key] = false;
        }
      }
      this.isEditModeMap[this.selectedUser] = false;
      this.selectedUser = user;
      // this.isEditModeMap[user] = false;
      this.visibleButtonsMap[this.selectedUser] = true;
    }
  }

  nameplaceholder: any;
  stateplaceholder: any;

  startEdit(userId: any, name: string, state: string) {
    this.isEditModeMap[userId] = true;
    this.editingUserId = userId; 
 
    this.Editform = this.fb.group({
      Editname: name,
      EditState: state, // Corrected typo in property name
    });


  }

  isEditModeForUser(userId: string): boolean {
    return this.isEditModeMap[userId] || false;
  }

  saveChanges(userId: any) {
    this.visibleButtonsMap[this.selectedUser] = false;
    this.isEditModeMap[userId] = false;
    this.editingUserId = null;

    console.log('Id:', userId);
    console.log('Edit Name:', this.editNameValue);
    console.log('Edit State:', this.editStateValue);

    const customerdata: any = {
      id: userId,
      name: this.editNameValue,
      state: this.editStateValue,
    };

    this.customersdata.UpdateCustomer(customerdata, userId).subscribe(() => {
      console.warn(customerdata);
      console.warn(customerdata.id);
      this.gettabledata();
      this.openSnackBar('customer data edited' + ' ' + [userId] + ' ' + [this.editNameValue] + ' ' + [this.editStateValue])
    });

  }

  addCustomer(customerdata: any) {

    this.customersdata.AddNewCustomer(customerdata).subscribe((data) => {
      this.gettabledata();
      this.openSnackBar('new customer added' + ' ' + [customerdata.id] + ' ' + [customerdata.name] + ' ' + [customerdata.state])
    });
    this.isaddMode = false;

  }


  onSearchSubmit(): void {

    this.editNameValue = this.Editform.get('Editname')?.value;
    this.editStateValue = this.Editform.get('EditState')?.value;


  }


  deleteCustomer(DeleteId: string) {
    const Id = parseInt(DeleteId, 10);
    console.log(`Deleting the customer with Id ${Id} `);
    if (!isNaN(Id)) {
      this.customersdata.DeleteCustomerById(Id).subscribe((data) => {
        this.gettabledata();
        this.openSnackBar('Deleted Customer with id' + ' ' + DeleteId);
      });
    } else {
      alert('Invalid customer ID');
    }
  }
  
  x:number=0;
  addboxvisibility() {
    if(this.x==0)
    {
      this.isaddMode = true;
      this.x=1;
    }
    else
    {
      this.isaddMode = false;
      this.x=0;
    }
  }

}
