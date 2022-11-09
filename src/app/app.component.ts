import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, pipe, startWith } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app.stat';
import { CustomResponse } from './interface/custom.response';
import { ServerService } from './service/server.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  appState$ :Observable<AppState<CustomResponse>> ;
  constructor(private serverService:ServerService){}
  ngOnInit(): void {
    this.appState$= this.serverService.servers$
       .pipe(
        map(resp=>{
       return {dataState:DataState.LOADED_STATE,
        appData:resp}
        }),
        startWith({dataState:DataState.LOADING_STATE}),
        catchError((error:string)=>{
          return of({dataState:DataState.ERROR_STATE,error
        })
      })
        ); 
  }
}
