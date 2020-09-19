import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginViewModel } from 'src/app/shared/models/login-view-model.model';
import { AuthorizationService } from '../../../core/authorization.service';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    submited: boolean;
    returnUrl: string;
    loginForm: FormGroup;
    errorMessage: string;

    constructor(
        private authenticationService: AuthorizationService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router) {
        if (this.authenticationService.currentUser) {
            this.router.navigate(['/']);
        }
        this.submited = false;
    }

    createForm(): void {
        this.loginForm = this.fb.group({
            Username: new FormControl(
                '', [Validators.required]),
            Password: new FormControl(
                '', [Validators.required])
        });
    }

    ngOnInit() {
        this.createForm();
    }

    onSubmit(): void {
        this.submited = true;
        var loginViewModel = <LoginViewModel>this.loginForm.value;
        if (this.loginForm.valid)
            this.login(loginViewModel);
    }

    login(loginViewModel: LoginViewModel): void {
        this.subscription = this.authenticationService
            .login(loginViewModel)
            .subscribe(
                res => this.router.navigate(['/']),
                errors => this.errorMessage = errors.message);
    }

    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}
