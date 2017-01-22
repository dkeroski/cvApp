import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, Cv } from '../_models/index';
import { CvService, UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'viewCv.component.html',
    styleUrls:['viewCv.component.css']
})

export class viewCvComponent implements OnInit {
    private subscription: Subscription;
    currentUser: User;
    users: User[] = [];
    cv: Cv;
    basic: {};
    work: [Object];
    skills: [Object];
    languages: [Object];
    education: [Object];
    constructor(private userService: UserService, private cvService: CvService, private activatedRoute: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.basic = {};
        this.work = [Object];
        this.skills = [Object];
        this.languages = [Object];
        this.education = [Object];

        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                let id = param['id'];
                this.cvService.getCvForUser(id).subscribe(
                    data => {
                        this.cv = data;
                        this.basic = this.cv.basics;
                        this.work = this.cv.work;
                        this.skills = this.cv.skills;
                        this.languages = this.cv.languages;
                        this.education = this.cv.education;
                    },
                    error => {
                        console.log(error)
                    });
            });
    }

    ngOnInit() {

    }

}