import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-eventmanagement',
  standalone: true,
  imports: [
    SidenavComponent
  ],
  templateUrl: './eventmanagement.component.html',
  styleUrl: './eventmanagement.component.css'
})
export class EventmanagementComponent {

}
