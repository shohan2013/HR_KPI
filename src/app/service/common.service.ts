import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private con:ConnectionService,private http:HttpClient,private router:Router) { }

     GetUnitlist() : Observable<any[]>{
        return this.http.get<any[]>(this.con.apiurl+"/AllReport/"+localStorage.getItem("Enroll"));
      }

      GetJobstationList(unitid:number,prefix:string) : Observable<any[]>{
        prefix="test"
        return this.http.get<any[]>(this.con.apiurl+"/AllReport/GetJobStation?unitid="+unitid+"&prefix="+prefix);
      }

      GetSubunit(unitid:number) : Observable<any[]>{
        alert(unitid);
        return this.http.get<any[]>(this.con.apiurl+"/AllReport/GetSubUnit?unitid="+unitid);
      }

      GetCluster() : Observable<any[]>{
        return this.http.get<any[]>(this.con.apiurl+"/AllReport/"+localStorage.getItem("Enroll"));
      }
}
