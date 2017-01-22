import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Cv } from '../_models/index';

@Injectable()
export class CvService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:3000/allCVs').map((response: Response) => response.json().data);
    }
    getCvForUser(id: number) {
        return this.http.get('http://localhost:3000/getCvForUser/' + id).map((response: Response) => response.json().cv);
    }

    getById(id: number) {
        return this.http.get('http://localhost:3000/getCv/' + id).map((response: Response) => response.json());
    }

    create(cv: Cv) {
        console.log(cv);
        return this.http.post('http://localhost:3000/saveCv', cv, this.jwt()).map((response: Response) => response.json());
    }

    update(cv: Cv, id: string) {
        return this.http.put('http://localhost:3000/editCv/' + id, cv, this.jwt()).map((response: Response) => response.json());
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