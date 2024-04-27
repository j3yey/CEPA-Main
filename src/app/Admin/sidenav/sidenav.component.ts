import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import {MatCommonModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
      RouterOutlet,
      MatSidenavModule,
      FormsModule,
      MatCommonModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule,
      CommonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  title = 'CEPA';
  opened: boolean = true;
  currentDateTime: Date = new Date();
  selectedNavItem: string = '';

  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate(['admin/home']);
    this.selectedNavItem = 'home';
  }

  navigateToEventManagement() {
    this.router.navigate(['admin/eventmanagement']);
    this.selectedNavItem = 'eventmanagement';
  }
  
  navigateToParticipantManagement() {
    this.router.navigate(['admin/participantmanagement']);
    this.selectedNavItem = 'participantmanagement';
  }

  navigateToMailer() {
    this.router.navigate(['admin/mailer']);
    this.selectedNavItem = 'mailer';
  }
  
  navigateToAboutUs() {
    this.router.navigate(['admin/AboutUs']);
    this.selectedNavItem = 'AboutUs';
  }

  redirectToAdminLogin() {
    this.router.navigate(['admin/login']);
  }

  ngOnInit(): void {    
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }
}
