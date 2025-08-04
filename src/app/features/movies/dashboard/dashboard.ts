import { Component } from '@angular/core';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  pageTitle: string = "Dashboard";
}
