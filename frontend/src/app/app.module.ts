import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { VideoStreamComponent } from './modules/video-stream/video-stream.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ContentComponent } from './shared/components/content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/modules/shared.module';
import { RegisterUserComponent } from './modules/register-user/register-user.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizationService } from './core/authorization.service';
import { DroneService } from './core/drone.service';

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        VideoStreamComponent,
        FooterComponent,
        NavbarComponent,
        ContentComponent,
        RegisterUserComponent,
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        RouterModule,
        HttpClientModule,
        
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
