import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { VideoStreamComponent } from './modules/video-stream/video-stream.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ContentComponent } from './shared/components/content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        VideoStreamComponent,
        FooterComponent,
        NavbarComponent,
        ContentComponent,
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        AppRoutingModule,
        MatButtonModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
