import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../core/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    navItems: any[] = [
        { name: 'app.home', route: 'home' },
        { name: 'app.i18n', route: 'frames' },
    ];

    is_logged: boolean = false;
    is_admin: boolean = false;

    countryMenuItems: any[];

    constructor(private authService: AuthorizationService,
                private router: Router
    ) {
       
    }

    ngOnInit(): void {
        this.authService.UserRole.subscribe(data => this.is_admin);
        this.authService.isLoggedIn.subscribe(data => this.is_logged);
    }

    logOut() {
        this.authService.logout();
        this.is_admin = false;
        this.is_logged = false
        this.router.navigate(['/']);
    }
}
