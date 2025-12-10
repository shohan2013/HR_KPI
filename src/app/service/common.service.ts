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
}
