import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {
  readonly pageTitle: string = "About us";
}
