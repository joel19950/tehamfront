import { Component } from '@angular/core';
//import * as Stomp from '@stomp/stompjs';
//import * as SockJS from 'sockjs-client';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'tehamfront';

  
  description = 'Angular-WebSocket Demo';

  greetings: string[] = [];
  disabled = true;

  private stompClient:any = null;
  name: string='';
  name1:string='';
  name2:string='';
  vueGet:number=1;

greetingName:string='';
   //stockage de la vue dans la session du navigateur
 // vuGet = localStorage.getItem('vue');
  constructor() { }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame:any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/hi', function(hello:any) {

        _this.showGreeting(JSON.parse(hello.body).greeting);
        
        _this.greetingName=JSON.parse(hello.body).greeting;
      });
    });

    
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName(num:number) {
    this.greetingName='';
    
    if(this.name!=''){
      this.stompClient.send(
        '/gkz/hello',
        {},
        JSON.stringify({ 'name': this.name})
      );
  localStorage.removeItem('vue');
  localStorage.setItem('vue', JSON.stringify(num))
  
    }else if(this.name1!=''){
      this.stompClient.send(
        '/gkz/hello',
        {},
        JSON.stringify({ 'name': this.name1})
      );
  localStorage.removeItem('vue');
  localStorage.setItem('vue',JSON.stringify(num))
  
  
    }else if(this.name2!=''){
      this.stompClient.send(
        '/gkz/hello',
        {},
        JSON.stringify({ 'name': this.name2})
      );
      localStorage.removeItem('vue');
      localStorage.setItem('vue',JSON.stringify(num))
  
    }

this.vueGet=num;

  }


  showGreeting(message:any) {
    this.greetings.push(message);
  }






}
