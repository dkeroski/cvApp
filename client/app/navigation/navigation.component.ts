import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.css']
})

export class NavigationComponent implements OnInit {
    currentUser: User;
    flag: boolean
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.flag = false;
        if (this.currentUser != undefined) {
            this.flag = true;
        } else {
            this.flag = false;
        }

    }

    ngOnInit() {

    }


}
