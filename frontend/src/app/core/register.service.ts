import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { RegisterUserViewModel } from '../shared/models/register-user-view-model.model';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) { }

    register(registerViewModel: RegisterUserViewModel): Observable<any>  {
        return this.http.post(environment.apiUrl + `/account/register/patient`, registerViewModel);
    }
}
