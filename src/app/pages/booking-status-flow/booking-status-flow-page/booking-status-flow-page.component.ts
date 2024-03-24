import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-status-flow-page',
  templateUrl: './booking-status-flow-page.component.html',
  styleUrls: ['./booking-status-flow-page.component.css']
})
export class BookingStatusFlowPageComponent {
  
  bgColor1: string = '';
  bgColor2: string = '';

  changeBackgroundColor(sectionNumber: number) {
    if (sectionNumber === 1) {
      this.bgColor1 = '#e1e1e1';
      this.bgColor2 = '';
    } else if (sectionNumber === 2) {
      this.bgColor1 = '';
      this.bgColor2 = '#e1e1e1';
    }
  }
}
