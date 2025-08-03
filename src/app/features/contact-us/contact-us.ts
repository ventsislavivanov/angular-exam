import { Component } from '@angular/core';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-contact-us',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
  readonly pageTitle: string = "Contact us"
}
