import { CustomerDataService } from '../services/customer-data.service';
import { Component, ViewChild } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  faMagnifyingGlass = faMagnifyingGlass;
  // Customer data object for two-way binding
  customerData = {
    id: '',
    name: '',
    state: ''
  };

  @ViewChild(BodyComponent) bodyComponent!: BodyComponent;
  myForm!: FormGroup;
  idDropdownData: { id: number; name: string; state: string }[] = [];


  ngAfterViewInit(): void {
    this.customersDataService.GetAllCustomers().subscribe((data) => {
      console.log(data);
      this.bodyComponent.customersdatav = data;
    });
  }

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, public customersDataService: CustomerDataService) { }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'ok', {
      duration: 2000,
    });
  }

  

 

  y: number =1;
  placeholderText: string = 'Search by Id';

  setsearchby(variable:number) 
  {
    if(variable==1)
    {
      this.y=1;
      this.placeholderText = 'Search by Id';
    }
    if(variable==2)
    {
      this.y=2;
      this.placeholderText = 'Search by Name';
    }
    if(variable==3)
    {
      this.y=3;
      this.placeholderText = 'Search by State';
    }
  }

  searchValue = '';
  x: number | undefined;


  fetchData(): void {
    if (this.searchValue == '') {
      this.ngAfterViewInit();
    } else {
      this.x = parseInt(this.searchValue)
      

      if(this.y==1)
      {
        this.customersDataService.CustomersWildsearchid(this.x).subscribe((usersFetchedid: any) => {
          this.bodyComponent.customersdatav = usersFetchedid;        
        });
      }

      else if(this.y==2)
      {
        this.customersDataService.CustomersWildsearchname(this.searchValue).subscribe((usersFetchedname: any) => {
          this.bodyComponent.customersdatav = usersFetchedname ;
        });
      }
      else if(this.y==3)
      {
        this.customersDataService.CustomersWildsearchstate(this.searchValue).subscribe((usersFetchedstate: any) => {
          this.bodyComponent.customersdatav = usersFetchedstate;
        });
      }      

    }
  }

  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  })

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }

  logoclick() {
    this.bodyComponent.addboxvisibility();
  }


 
 

  

}

