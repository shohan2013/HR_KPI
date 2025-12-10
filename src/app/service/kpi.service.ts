import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class KpiService {
  constructor(private con: ConnectionService,private http:HttpClient) { }

  GetCatagorylist() : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPI");
  }

  GetKPIlist() : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPI/GetKPIDataByEnroll/"+localStorage.getItem("Enroll"));
  }


  GetKPIlistByID(id:number) : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPI/GetKPIDataByID/"+id);
  }

  GetPeriodCategory() : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPI/GetPeriodCategory");
  }

  GetPeriodCategoryDetails(id:number) : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPI/GetPeriodCategoryDetails?id="+id);
  }

  Save(obj :any[])
  {
    return this.http.post(this.con.apiurl+"/KPI", obj );
  }

  Update(id:number,obj :any)
  {
    return this.http.put<any>(this.con.apiurl+"/KPI?id="+id,obj);
  }

  Delete(id : number)
  {
    return this.http.delete<any>(this.con.apiurl+"/KPI?id="+id);
  }

  GetKPIlistFYear(fyear:any) : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPI/GetKPIDataByFYear/"+localStorage.getItem("Enroll")+"/"+fyear);
  }

  CheckWeight(id:number) : Observable<any[]>
  {
    return this.http.get<any[]>(`${this.con.apiurl}/KPI/CheckWeight/${id}/${localStorage.getItem('Enroll')}`);
  }

  SendForEvolution() : Observable<any[]>
  {
    return this.http.get<any[]>(`${this.con.apiurl}/KPI/SendForEvolution/${localStorage.getItem('Enroll')}`);
    //return this.http.post(this.con.apiurl+"/KPI", localStorage.getItem('Enroll') );
    //return this.http.post<any>(`${this.con.apiurl}/KPI/SendForEvolution/${localStorage.getItem('Enroll')}`);
  }

  UpdateList(element:any)
  {
    return this.http.post(this.con.apiurl+"/KPI/UpdateList", element );
    //return this.http.post(this.con.apiurl+"/KPI", localStorage.getItem('Enroll') );
    //return this.http.post<any>(`${this.con.apiurl}/KPI/SendForEvolution/${localStorage.getItem('Enroll')}`);
  }

}
