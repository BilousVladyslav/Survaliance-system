import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenResponse } from 'src/app/shared/models/token-response.model';
import { map } from 'rxjs/operators';
import { Drone } from '../shared/models/drone.model';
import { DroneList } from '../shared/models/drones-list.model';
import { DroneToUpdate } from '../shared/models/drone-update.model';


@Injectable({
  providedIn: 'root'
})
export class DroneService {

    public drones: Drone[] = [];

    constructor(private http: HttpClient, private router: Router) {
        this.update_drone_list()

    }

    setDroneInfo(name: string): Drone {
        var drone: Drone = <Drone>{
            name: name,
            image: "",
            photo_created: ""
        }
        return drone;
    }

    update_drone_list(): void {
        var drones: Drone[] = [];
        this.http.get<DroneList>(environment.apiUrl + `drones/`)
            .subscribe(res => {
                res['names'].forEach(function (item) {
                    var drone: Drone = <Drone>{
                        name: item,
                        image: "",
                        photo_created: ""
                    }
                    drones.push(drone);
                })
            });
        this.drones = drones
    }

    update_photo(drone: Drone) {
        const options = { params: new HttpParams().set('name', drone.name) };
        this.http.get<Drone>(environment.apiUrl + `frames/`, options)
            .subscribe(droneResponse => {
                drone.image = droneResponse.image;
                drone.photo_created = droneResponse.photo_created;
            });
        return drone;
    }

    get_drones() {
        return this.drones;
    }
}
