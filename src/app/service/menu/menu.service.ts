import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  controller="/Menu";
  constructor(private http:HttpClient,private con:ConnectionService) { }

  getGMenu(UserID:string):Observable<any[]>{
    
    return this.http.get<any[]>(this.con.apiurl+this.controller+"?UserID="+localStorage.getItem("Enroll"))
  }

  getGSubMenu(UserID:string):Observable<any[]>{

    return this.http.get<any[]>(this.con.apiurl+this.controller+"/LoadGSubMenu"+"?UserID="+localStorage.getItem("Enroll"))
  }

  getGSubSubMenu():Observable<any[]>{
    return this.http.get<any[]>(this.con.apiurl+this.controller+"/LoadGSubSubMenu")
  }
}
