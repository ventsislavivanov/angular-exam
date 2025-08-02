import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components';
import { Footer } from './shared/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-exam';
}
