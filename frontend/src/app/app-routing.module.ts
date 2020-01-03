import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ProfileComponent } from './modules/profile/profile.component';
import { VideoStreamComponent } from './modules/video-stream/video-stream.component';


const routes: Routes = [
    { path: 'home', component: ProfileComponent },
    { path: 'i18n', component: VideoStreamComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
