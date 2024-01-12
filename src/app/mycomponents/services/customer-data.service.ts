import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Customerdatainterface } from '../customerdatainterface';




@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {

  private url = "http://localhost:8008/api/customers";

  

  constructor(private http: HttpClient) { }

  

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

  GetCustomerById(id: number): Observable<Customerdatainterface[]> {
    return this.http.get<Customerdatainterface[]>(`${this.url}/GetCustomerWithId/${id}`);
  }

  DeleteCustomerById(id: number): Observable<any> {
    return this.http.delete(`${this.url}/DeleteCustomersWithid/${id}`);
  }

  AddNewCustomer(newcustomerdata:any): Observable<any> {
    console.log([newcustomerdata]);
    return this.http.post(`${this.url}/AddNewCustomers`, [newcustomerdata]);
  }

  UpdateCustomer(newcustomerdata:any,id:number): Observable<any> {
    console.log([newcustomerdata]);
    console.log(id);    
  
    return this.http.put(`${this.url}/UpdateCustomersWithid/${id}`, [newcustomerdata]);
  }



}

