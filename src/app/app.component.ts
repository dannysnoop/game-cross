import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { filter, map } from 'rxjs/operators';
import { TYPE_BET, UserBetDto} from "./DTO/user-bet.dto";

import { webSocket } from "rxjs/webSocket";
const subject = webSocket('wss://sub.lixi88.club/websocket/ws-minigame/715/05kjp5r1/websocket?access_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3d2VjaGFtMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTY1ODk2ODN9.2anDQiFnoaleqAjrGGY01BsFaIuPKpKvkoKkQ-kpa6k90wRVhsL9JRbXSLPyB08du3DYo3xKxxYrDrjqmmMazA');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'game-cross';
  url = `https://sub.lixi88.club/api/tx/thongkephien/`
  taixiuId = ''
  totalBetTai = 0
  totalBetXiu = 0

  winAmount = 0
  result = ''
  count = 0
  bookMaker = 0
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    subject.subscribe(
      msg => console.log('message received: '), // Called whenever there is a message from the server.
      err => console.log('1'), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  getDataFromGame() {
    const url = this.url + this.taixiuId
    this.http.post(url , {}).pipe(map((z: any)=> {
      return {lstData: z.lstData, result : z.result}
    })).subscribe(({lstData, result}) => {

        this.totalBetTai = lstData.filter((z: UserBetDto)=> z.typed === TYPE_BET.tai).reduce((a: any, b: any) => a + b.betamount  ,  0);
        this.totalBetXiu = lstData.filter((z : UserBetDto)=> z.typed === TYPE_BET.xiu).reduce((a: any, b: any) => a + b.betamount  ,  0);
        this.winAmount = lstData.reduce((a: any, b: any) => a + b.winamount  ,  0);


        this.result  = result && JSON.parse(result).reduce((a: any,b : any ) => a + b , 0)

      if( ((this.totalBetTai  - this.totalBetXiu )  > 0  &&  +this.result > 10) || ((this.totalBetTai - this.totalBetXiu) < 0  && +this.result <=10)) {
          this.count ++ ;
          this.bookMaker = 1
      }else {
        this.bookMaker = 0;
      }
    })
  }


}
