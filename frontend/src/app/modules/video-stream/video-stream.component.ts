import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthorizationService } from '../../core/authorization.service';
import { DroneService } from '../../core/drone.service';
import { Drone } from '../../shared/models/drone.model';
import { timer, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.css']
})
export class VideoStreamComponent implements OnInit {
    drones: Drone[];
    is_logged: boolean;
    is_admin: boolean;
    subscription: Subscription;

    constructor(private authService: AuthorizationService,
                private droneService: DroneService
    ) { }

    ngOnInit() {
        this.authService.UserRole.subscribe(data => this.is_admin);
        this.authService.isLoggedIn.subscribe(data => this.is_logged);

        this.is_logged = true;

        if (this.is_logged) {
            this.drones = this.droneService.get_drones();
            console.log(this.drones);

            this.subscription = timer(0, 1000).subscribe(val => {
                for (var dr of this.drones) {
                    dr = this.droneService.update_photo(dr)
                    console.log('photo updated')
                }
            });
        }
    }

    getImage(drone: Drone): string {
        if (drone.image == '' || drone.image == undefined)
            return '../../../../assets/images/default.png';
        return 'data:image/png;base64,' + drone.image;
    }

    pause() {
        this.ngOnDestroy()
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
