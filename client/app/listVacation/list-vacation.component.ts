import { Component, OnInit } from '@angular/core';

import { Vacation, User } from '../_models/index';
import { UserService } from '../_services/index';
import { AlertService, AuthenticationService, VacationService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'list-vacation.component.html',
    styleUrls: ['./list-vacation.component.css']
})

export class ListVacationComponent implements OnInit {
    currentUser: User;
    vacations: Vacation[] = [];
    pending: Vacation[] = [];
    approved: Vacation[] = [];
    disapproved: Vacation[] = [];
    model: any = {};
    constructor(private userService: UserService, private vacationService: VacationService, private route: ActivatedRoute,
        private router: Router) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.vacationService.getAll().subscribe(
            data => {
                this.vacations = data;
                var pend: Vacation[] = [];
                var app: Vacation[] = [];
                var disapp: Vacation[] = [];
                this.vacations.forEach(vacation => {
                    if (vacation.status == "pending") {
                        pend.push(vacation);
                    } else if (vacation.status == "approved") {
                        app.push(vacation);
                    } else if (vacation.status == "disapproved") {
                        disapp.push(vacation);
                    }
                    this.pending = pend;
                    this.approved = app;
                    this.disapproved = disapp;
                });

            },
            error => {
                console.log(error)
            });

    }

    approveVacation(vacation: Vacation, id: string) {
        vacation.status = "approved"
        this.vacationService.update(vacation, id).subscribe(
            data => {
                this.ngOnInit()
            },
            error => {
                console.log(error)
            });

    }

    disapproveVacation(vacation: Vacation, id: string) {
        vacation.status = "disapproved"
        this.vacationService.update(vacation, id).subscribe(
            data => {
                this.ngOnInit()
            },
            error => {
                console.log(error)
            });

    }
}
