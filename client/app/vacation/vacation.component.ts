import { Component, OnInit } from '@angular/core';

import { User, Vacation } from '../_models/index';
import { UserService } from '../_services/index';
import { AlertService, AuthenticationService, VacationService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'vacation.component.html',
    styleUrls: ['./vacation.component.css']
})

export class VacationComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    model: any = {};
    vacations: Vacation[] = [];
    constructor(private userService: UserService, private vacationService: VacationService, private route: ActivatedRoute,
        private router: Router) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        var id = JSON.parse(localStorage.getItem('id_user'));
        this.vacationService.getVacationsForUser(id).subscribe(
            data => {
                this.vacations = data;
            },
            error => {
                console.log(error)
            });
    }
    bookVacation() {
        this.model.userID = JSON.parse(localStorage.getItem('id_user'));
        this.model.status = "pending";
        this.model.firstName = this.currentUser.firstName;
        this.model.lastName = this.currentUser.lastName;
        this.vacationService.create(this.model).subscribe(
            data => {
                this.ngOnInit()
                //this.router.navigate(['/home']);
            },
            error => {
                console.log(error)
            });
    }



}
