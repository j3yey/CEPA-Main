import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-mailer',
  standalone: true,
  imports: [
    SidenavComponent
  ],
  templateUrl: './mailer.component.html',
  styleUrl: './mailer.component.css'
})
export class MailerComponent {

}
