import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    navItems: any[] = [
        { name: 'app.home', route: 'home' },
        { name: 'app.i18n', route: 'i18n' },
    ];

    constructor(
    ) {
       
    }

    ngOnInit(): void {
        
    }

}
