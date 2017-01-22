import { Component, OnInit } from '@angular/core';

import { User, Cv } from '../_models/index';
import { UserService } from '../_services/index';
import { AlertService, AuthenticationService, CvService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'listCv',
    moduleId: module.id,
    templateUrl: 'all-cv.component.html',
    styleUrls: ['all-cv.component.css']
})

export class ListCvComponent implements OnInit {
    currentUser: User;
    cvs: Cv[] = [];
    model: any = {};
    constructor(private userService: UserService, private route: ActivatedRoute, private cvService: CvService,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllCvs();
    }
    private loadAllCvs() {
        this.cvService.getAll().subscribe(cvs => { this.cvs = cvs; });
    }
						
    }
