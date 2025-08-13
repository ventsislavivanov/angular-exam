import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-jumbotron',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-jumbotron.html',
  styleUrl: './search-jumbotron.css'
})
export class SearchJumbotron {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() callToAction: string | undefined;

  searchCtrl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });

  constructor(private router: Router) {}

  onSearch(): void {
    if (this.searchCtrl.invalid) {
      this.searchCtrl.markAsTouched();
      return;
    }

    const query = this.searchCtrl.value.trim();
    this.router.navigate(['search-movie', query]);
  }
}
