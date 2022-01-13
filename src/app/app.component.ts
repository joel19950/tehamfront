import { Component } from '@angular/core';
//import * as Stomp from '@stomp/stompjs';
//import * as SockJS from 'sockjs-client';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import { Router } from '@angular/router';
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
  vueGet:any=1;

greetingName:any='';
   //stockage de la vue dans la session du navigateur
 // vuGet = localStorage.getItem('vue');
  constructor( public router:Router) { }

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
  if(this.name!=''){
      this.stompClient.send(
        '/gkz/hello',
        {},
  JSON.stringify({ 'name': this.name})
      );
  localStorage.removeItem('vue');
  localStorage.setItem('vue', JSON.stringify(num))
  localStorage.setItem('name',this.name);
  this.name='';
  
  
    }else if(this.name1!=''){
      this.stompClient.send(
        '/gkz/hello',
        {},
        JSON.stringify({ 'name': this.name1})
      );
  localStorage.removeItem('vue');
  localStorage.setItem('vue',JSON.stringify(num))
  localStorage.setItem('name',this.name1);
  this.name1='';

    }else if(this.name2!=''){
      this.stompClient.send(
        '/gkz/hello',
        {},
        JSON.stringify({ 'name': this.name2})
      );
      localStorage.removeItem('vue');
      localStorage.setItem('vue',JSON.stringify(num))
      localStorage.setItem('name', this.name2);
      this.name2='';
    }
    this.vueGet = localStorage.getItem('vue');
    this.greetingName=localStorage.getItem('name');
    console.log(this.greetingName)
    console.log(this.vueGet);
    
    if(this.vueGet==1){
      this.router.navigateByUrl('/vue1')
    } if(this.vueGet==2){
      this.router.navigateByUrl('/vue2')
    } if(this.vueGet==3){
      this.router.navigateByUrl('/vue3')
    }   

  }



  showGreeting(message:any) {
    this.greetings.push(message);
  }






}
