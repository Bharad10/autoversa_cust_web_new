import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent {

  constructor(
    private router: Router,
  ) {
  }

  blogdetailspage() {
    this.router.navigateByUrl('blog-details');
  }
}
