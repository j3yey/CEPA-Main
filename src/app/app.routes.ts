import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './Admin/home/home.component';
import { ParticipantmanagementComponent } from './Admin/participantmanagement/participantmanagement.component';
import { EventmanagementComponent } from './Admin/eventmanagement/eventmanagement.component';
import { AboutusComponent } from './Admin/aboutus/aboutus.component';
import { LoginComponent } from './Admin/login/login.component';
import { SidenavComponent } from './Admin/sidenav/sidenav.component';
import { RegisterComponent } from './register/register.component';
import { MailerComponent } from './Admin/mailer/mailer.component';
import { UserhomeComponent } from './User/userhome/userhome.component';
import { UsersidenavComponent } from './User/usersidenav/usersidenav.component';
import { SearchparticipantComponent } from './User/searchparticipant/searchparticipant.component';
import { FeedbackComponent } from './User/feedback/feedback.component';


export const routes: Routes = [
  {
    path: 'admin',
    redirectTo: 'admin/login',
    pathMatch: 'full',
  },
  {
    path: 'user',
    redirectTo: 'user/userhome',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: 'User/UserHome',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UsersidenavComponent,
    children: [
      {
        path: 'userhome',
        component: UserhomeComponent,
      },
      {
        path: 'searchparticipant',
        component: SearchparticipantComponent,
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
      },
    ]
  },
  {
    path: 'admin',
    component: SidenavComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'eventmanagement',
        component: EventmanagementComponent,
      },
      {
        path: 'participantmanagement',
        component: ParticipantmanagementComponent,
      },
      {
        path: 'mailer',
        component: MailerComponent,
      },
      {
        path: 'AboutUs',
        component: AboutusComponent,
      },
    ],
  },
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'user/userhome', // Redirect unknown paths to user home
  },
];
  

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }