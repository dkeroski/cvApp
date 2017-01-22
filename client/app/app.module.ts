import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, VacationService, CvService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { VacationComponent } from './vacation/index';
import { NavigationComponent } from './navigation/index';
import { HomeAdminComponent } from './homeAdmin/index';
import { ListCvComponent } from './listCv/index';
import { ListVacationComponent } from './listVacation/index';
import { editCvComponent } from './editCv/index';
import { viewCvComponent } from './viewCv/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        VacationComponent,
        NavigationComponent,
        HomeAdminComponent,
        ListCvComponent,
        ListVacationComponent,
        viewCvComponent,
        editCvComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        VacationService,
        CvService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }