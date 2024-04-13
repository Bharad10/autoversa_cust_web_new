import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

hide_mobile_menu:boolean=false;
user_auth: boolean = false;
@Input() logoutData: any;
mobile_menu(){
  this.hide_mobile_menu = !this.hide_mobile_menu;
}
menu_close(){
  this.hide_mobile_menu = false;
}


private scrollClassAdded = false;
constructor(private el: ElementRef){ 
}
  ngOnInit(): void {
    if('cust_token' in localStorage){
      this.user_auth = true;
    }
    else{
     this.user_auth = false;
    }  
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollY = window.scrollY;
    const scrollThreshold = 100;

    if (scrollY > scrollThreshold && !this.scrollClassAdded) {
      this.el.nativeElement.querySelector('#menu_desk').classList.add('scrolled');
      this.scrollClassAdded = true;
    } else if (scrollY <= scrollThreshold && this.scrollClassAdded) {
      this.el.nativeElement.querySelector('#menu_desk').classList.remove('scrolled');
      this.scrollClassAdded = false;
    }
  }
 user_login(){
  
 }

  
}



