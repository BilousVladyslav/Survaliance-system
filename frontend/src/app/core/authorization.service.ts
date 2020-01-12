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
    private is_admin = new BehaviorSubject<boolean>(null);

    constructor(private http: HttpClient, private router: Router) { }

    get isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    get UserRole(): Observable<boolean> {
        return this.is_admin.asObservable();
    }


    login(userLoginViewModel: LoginViewModel): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(environment.apiUrl + `/account/login`, userLoginViewModel)
            .pipe(map(tokenResponse => {
                this.currentUser = this.setUserInfo(tokenResponse);

                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.loggedIn.next(true);
                this.is_admin.next(this.currentUser.is_admin);
                return tokenResponse;
            }));
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.loggedIn.next(false);
        this.is_admin.next(false);
        this.router.navigate(['']);

    }

    setUserInfo(response: TokenResponse): User {
        var user: User = <User>{
            username: response.username,
            token: response.token,
            is_admin: response.is_admin
        }
        return user;
    }
}
