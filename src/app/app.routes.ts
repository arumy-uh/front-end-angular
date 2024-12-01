import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/homepage/home-page.component';
import { CreateProjectComponent } from './components/forms/create-project-component/create-project.component';
import { EditProjectComponent } from './components/forms/edit-project-component/edit-project.component';
import { LoginGuardService } from './services/guards/login-guard.service';
import { UserComponent } from './components/users/users.component';

export const routes: Routes = [ 
    {path:'login', component: LoginComponent},
    {path:'register', component: UserComponent},
    {path:'home', component: HomeComponent, canActivate: [LoginGuardService]},
    /*{path: 'createProject', component: CreateProjectComponent},
    {path: 'edit/:id', component: EditProjectComponent},*/
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
];
