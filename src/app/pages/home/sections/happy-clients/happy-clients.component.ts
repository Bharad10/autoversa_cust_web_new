import { Component } from '@angular/core';
import { OwlOptions} from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-happy-clients',
  templateUrl: './happy-clients.component.html',
  styleUrls: ['./happy-clients.component.css']
})
export class HappyClientsComponent {


    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      nav: true,
      items: 1,
      navText: ['<span class="prev-icon"><i class="fa-solid fa-chevron-left"></i></span>', '<span class="next-icon"><i class="fa-solid fa-chevron-right"></i></span>'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 1
        },
        940: {
          items: 1
        }
      },

    }
  }

