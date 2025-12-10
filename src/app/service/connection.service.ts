import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConnectionService {
  readonly apiurl:string="https://kpiapi.akijbashir.com/api";
  // readonly apiurl:string="http://localhost:5116/api";
  constructor() { }
}

