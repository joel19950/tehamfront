import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vue2',
  templateUrl: './vue2.component.html',
  styleUrls: ['./vue2.component.css']
})
export class Vue2Component implements OnInit {
  disabled = true;

  private stompClient:any = null;
  name: string='';
  nameVue:string='';
  greetingName:any='';

  constructor(public router:Router) { }

  ngOnInit(): void {
  
    this.connect();
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.greetingName=localStorage.getItem('name');
 }, 2000);
  }

  setConnected(connected: boolean){
    this.disabled = !connected;

    if (connected) {
   //   this.greetings = [];
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
          console.log('Connected: ' + JSON.parse(hello.body).greeting);
          _this.showGreeting(JSON.parse(hello.body).greeting);
        
          
      
      });

      _this.stompClient.subscribe('/topic/h3', function(hello:any) {
        console.log('Connected: ' + JSON.parse(hello.body).greeting);
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

  sendName1(num:number) { 
    if(this.name!=''){
        this.stompClient.send(
          '/gkz/hello',
          {},
    JSON.stringify({ 'name': this.name})
        );
  
      }
      this.router.navigate(['/vue1']);   
    }
    sendName3(num:number) { 
      if(this.name!=''){
          this.stompClient.send(
            '/gkz/hello3',
            {},
      JSON.stringify({ 'name': this.name})
          );
    
        }
        this.router.navigate(['/vue3']); 
      }

      showGreeting(namevue: any){
        localStorage.setItem('name',namevue);
      }
  
}
