import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  lastName: string = '';
  firstName: string = '';
  address: string = '';
  email: string = '';
  phoneNumber: string = '';

  onSubmit() {
    console.log('Form submitted:', {
      lastName: this.lastName,
      firstName: this.firstName,
      address: this.address,
      email: this.email,
      phoneNumber: this.phoneNumber
    });
  }
}
