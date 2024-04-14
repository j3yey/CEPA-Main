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
  selector: 'app-usersidenav',
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
  templateUrl: './usersidenav.component.html',
  styleUrl: './usersidenav.component.css'
})
export class UsersidenavComponent {
  title = 'CEPA';
  opened: boolean = true;
  currentDateTime: Date = new Date();

  constructor(private router: Router) { }
  navigateToHome() {
    this.router.navigate(['user/userhome']);
  }


  ngOnInit(): void {    
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }
}
