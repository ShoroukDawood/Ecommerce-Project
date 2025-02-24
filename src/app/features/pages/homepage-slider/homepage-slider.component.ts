import { Component, NgModule } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-homepage-slider',
  imports: [CarouselModule],
  templateUrl: './homepage-slider.component.html',
  styleUrl: './homepage-slider.component.scss'
})
export class HomepageSliderComponent {
  customOptions: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
   
    },
    nav: true
  }
}
