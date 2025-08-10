import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-form-field',
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css'
})
export class FormField {
  @Input() label?: string;
  @Input() name!: string;
  @Input() errors: { $uid: string | number; $message: string }[] = [];
  @Input() icon?: IconProp;
  @Input() inputGroupPrependName?: string;
  @Input() disabled = false;
}
