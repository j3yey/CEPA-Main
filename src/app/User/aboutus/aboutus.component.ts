import { Component, ElementRef, VERSION, ViewChild} from '@angular/core';
import { UsersidenavComponent } from '../usersidenav/usersidenav.component';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [UsersidenavComponent, CommonModule, MatCardModule ,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatDialogModule,MatMenuTrigger, MatMenuModule ] ,
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
  @ViewChild('scroll') scroll!: ElementRef;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { width: '1000px', maxHeight: '90vh' });

    dialogRef.afterOpened().subscribe(() => {
      this.scrollToTop();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  scrollToTop() {
    if (this.scroll) {
      this.scroll.nativeElement.scrollTop = 0;
    }
  }
  
}
