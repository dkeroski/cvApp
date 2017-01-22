import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Vacation } from '../_models/index';

@Injectable()
export class VacationService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:3000/allVacations').map((response: Response) => response.json().data);
    }

    getVacationsForUser(id: number) {
        return this.http.get('http://localhost:3000/getVacationForUser/' + id).map((response: Response) => response.json().vacations);
    }

    getById(id: number) {
        return this.http.get('http://localhost:3000/getVacation/' + id).map((response: Response) => response.json());
    }

    create(vacation: Vacation) {
        return this.http.post('http://localhost:3000/sendVacation', vacation, this.jwt()).map((response: Response) => response.json());
    }

    update(vacation: Vacation, id: string) {
        return this.http.put('http://localhost:3000/editVacation/' + id, vacation, this.jwt()).map((response: Response) => response.json());
    }


    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}