import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginViewModel } from 'src/app/shared/models/login-view-model.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenResponse } from 'src/app/shared/models/token-response.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

    private currentUser: User;
    private loggedIn = new BehaviorSubject<boolean>(false);
    private Role = new BehaviorSubject<string>(null);

    constructor(private http: HttpClient, private router: Router) { }

    get isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    get UserRole(): Observable<string> {
        return this.Role.asObservable();
    }


    login(userLoginViewModel: LoginViewModel): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(environment.apiUrl + `/account/login`, userLoginViewModel)
            .pipe(map(tokenResponse => {
                var token = tokenResponse.accessToken;
                
                //this.currentUser = this.setUserInfo(token, userLoginViewModel.Email);

                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.loggedIn.next(true);
                this.Role.next(this.currentUser.Role);
                return tokenResponse;
            }));
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.loggedIn.next(false);
        this.Role.next(null);
        this.router.navigate(['']);

    }

}
