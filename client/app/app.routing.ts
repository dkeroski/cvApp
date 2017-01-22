import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { VacationComponent } from './vacation/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { HomeAdminComponent } from './homeAdmin/index';
import { ListCvComponent } from './listCv/index';
import { ListVacationComponent } from './listVacation/index';
import { editCvComponent } from './editCv/index';
import { viewCvComponent } from './viewCv/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'vacation', component: VacationComponent },
    { path: 'home-admin', component: HomeAdminComponent, canActivate: [AuthGuard] },
    // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'list-cv', component: ListCvComponent },
    { path: 'list-vacation', component: ListVacationComponent },
    { path: 'editCv', component: editCvComponent },
    { path: 'viewCv', component: viewCvComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);