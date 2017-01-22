import { Component, OnInit } from '@angular/core';

import { User, Cv } from '../_models/index';
import { UserService, CvService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls:['home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    cv: Cv;
    flagHideCreateButton: boolean;
    constructor(private userService: UserService, private cvService: CvService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.cv = new Cv({}, [], [], [], []);
        this.flagHideCreateButton = false;
    }

    ngOnInit() {
        this.loadAllUsers();
        var id = JSON.parse(localStorage.getItem('id_user'));

        this.cvService.getCvForUser(id).subscribe(
            data => {
                if (data == undefined) {
                    this.flagHideCreateButton = true;
                } else {
                    this.flagHideCreateButton = false;
                }
            },
            error => {
                console.log(error);
            });
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    createCv() {
        var id = JSON.parse(localStorage.getItem('id_user'));
        this.cvService.getCvForUser(id).subscribe(
            data => {
                if (data == undefined) {
                    this.cv.userId = JSON.parse(localStorage.getItem('id_user'));
                    console.log(this.cv);
                    this.cv.basics.firstName = this.currentUser.firstName;
                    this.cv.basics.lastName = this.currentUser.lastName;
                    this.cv.basics.email = this.currentUser.email;
                    this.cv.basics.jobPosition = '';
                    this.cv.basics.phone = '';
                    this.cv.basics.summary = '';
                    this.cvService.create(this.cv).subscribe(
                        data => {
                            console.log(data);
                        },
                        error => {
                            console.log(error);
                        });
                    this.flagHideCreateButton = false;
                }
            },
            error => {
                console.log(error);
            });
    }
}