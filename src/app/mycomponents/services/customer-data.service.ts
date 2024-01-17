import { Injectable } from '@angular/core';

import { HttpClient,HttpParams  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Customerdatainterface } from '../customerdatainterface';




@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {

  private url = "http://192.168.155.26:8008/api/customers";

  

  constructor(private http: HttpClient) { }

   
  AddNewCustomer(newcustomerdata:any): Observable<any> {
    return this.http.post(`${this.url}/AddNewCustomers`, [newcustomerdata]);
  }
  CustomersWildsearchid(id:any): Observable<Customerdatainterface[]> {
    return this.http.get<Customerdatainterface[]>(`${this.url}/GetAllCustomersData?idSearch=${id}`);
  }
  CustomersWildsearchname(name:any): Observable<Customerdatainterface[]> {
    return this.http.get<Customerdatainterface[]>(`${this.url}/GetAllCustomersData?nameSearch=${name}`);
  }
  CustomersWildsearchstate(state:any): Observable<Customerdatainterface[]> {
    return this.http.get<Customerdatainterface[]>(`${this.url}/GetAllCustomersData?stateSearch=${state}`);
  }
  GetAllCustomers(): Observable<Customerdatainterface[]> {
    return this.http.get<Customerdatainterface[]>(`${this.url}/GetAllCustomersData`);
  }  
  UpdateCustomer(newcustomerdata:any,id:number): Observable<any> { 
    return this.http.put(`${this.url}/UpdateCustomersWithid/${id}`, [newcustomerdata]);
  }
  DeleteCustomerById(id: number): Observable<any> {
    return this.http.delete(`${this.url}/DeleteCustomersWithid/${id}`);
  }

}

