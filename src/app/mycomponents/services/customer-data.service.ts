import { Injectable } from '@angular/core';

import { HttpClient,HttpParams  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Customerdatainterface } from '../customerdatainterface';




@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {

  private url = "http://192.168.155.20:8008/api/customers";

  

  constructor(private http: HttpClient) { }

  getPagedCustomers(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    return this.http.get<any>(`${this.url}/paged-customers`, { params });
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

