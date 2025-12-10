import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class KpiApprovalService {

  constructor(private con: ConnectionService,private http:HttpClient) { }

  // KPIApprovallist(year:any,status:number) : Observable<any[]>{

  //   return this.http.get<any[]>(this.con.apiurl+"/KPIApproval?docstatusid="+status+'&&year='+year+'&&enroll='+localStorage.getItem("Enroll"));
  // }
  
  KPIApprovallist(year:any,enroll:number) : Observable<any[]>{
 
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval?initiator="+enroll+'&&year='+year+'&&enroll='+localStorage.getItem("Enroll"));
  }

  
    KPIApprovallistIndividual(year:any,enroll:number) : Observable<any[]>{
 
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval?initiator="+enroll+'&&year='+year+'&&enroll='+localStorage.getItem("Enroll"));
  }


  // KPIApprovallistSummary(year:any,status:number) : Observable<any[]>{
  //   return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetDataByEnrollBySummary?docstatusid="+status+'&&year='+year+'&&enroll='+localStorage.getItem("Enroll"));
  // }

  KPIApprovallistSummary(year:any,status:number) : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetDataByEnrollBySummary?docstatusid="+0+'&&year='+year+'&&enroll='+localStorage.getItem("Enroll"));
  }


  Doclist() : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetDoclist");
  }

  Approve(id :number,descriptions:string)
  {
    var obj={
      DESCRIPTIONS:descriptions,
      ID:id,
      KPIID:localStorage.getItem("Enroll")
    }
    return this.http.post(this.con.apiurl+"/KPIApproval",obj);
  }

  Reject(id :number,descriptions:string)
  {
    var obj={
      DESCRIPTIONS:descriptions,
      ID:id,
      KPIID:localStorage.getItem("Enroll")
    }
    return this.http.post(this.con.apiurl+"/KPIApproval/Reject",obj);
  }

  Review(id :number,descriptions:string)
  {
    var obj={
      DESCRIPTIONS:descriptions,
      ID:id,
      KPIID:localStorage.getItem("Enroll")
    }
    return this.http.post(this.con.apiurl+"/KPIApproval/Review",obj);
  }

  GetEvolutionData() : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetSupervisorRevolution?enroll="+localStorage.getItem("Enroll"));
  }

  GetMyEvolutionData() : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetMyEvolution?enroll="+localStorage.getItem("Enroll"));
  }


  GetEvolutionDataByFinancialYear(fyear:string,status:string) : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetSupervisorEvolutionByFinancialYear?enroll="+localStorage.getItem("Enroll")+"&&fyear="+fyear+"&&status="+status);
  }

  GetMyEvolutionByFYear(status:number,fyear:string) : Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetMyEvolutionByFYear?enroll="+localStorage.getItem("Enroll")+"&&fyear="+fyear+"&&status="+status);
  }

  EvolutionApprove(element:any)
  {
    return this.http.post(this.con.apiurl+"/KPIApproval/EvolutionApprove",element);
  }

  EvolutionReject(id :number,descriptions:string)
  {
    var obj={
      DESCRIPTIONS:descriptions,
      ID:id,
      KPIID:localStorage.getItem("Enroll")
    }
    return this.http.post(this.con.apiurl+"/KPIApproval/EvolutionReject",obj);
  }

  GetRating() : Observable<any[]>
  {
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetRating");
  }

  GetFinancialYear() : Observable<any[]>
  {
    return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetFinancialYear");
  }

  GetComment(id:number) : Observable<any[]>
  {
    return this.http.get<any[]>(`${this.con.apiurl}/KPIApproval/GetComments/${id}`);

    //return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetComments"+id);
  }
 
  GetPromotion() : Observable<any[]>
  {
    return this.http.get<any[]>(`${this.con.apiurl}/KPIApproval/GetPromotion`);
  }

  GetProposedPosition() : Observable<any[]>
  {
    return this.http.get<any[]>(`${this.con.apiurl}/KPIApproval/GetPropsedPosition/${localStorage.getItem("Enroll")}`);

    //return this.http.get<any[]>(this.con.apiurl+"/KPIApproval/GetComments"+id);
  }

  GetDataByEnrollSupervisorView(enroll:number,fyear:string) : Observable<any[]>{
    return this.http.get<any[]>(`${this.con.apiurl}/KPI/GetDataByEnrollSupervisorView/${enroll}/${fyear}`);
  }

  GetApproverStatus(id:number) : Observable<any[]>{

    return this.http.get<any[]>(`${this.con.apiurl}/KPIApproval/GetApproverStatus?id=${id}`);
  }
}
