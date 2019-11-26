import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ApiService} from "../service/api.service";
import {ModalPage} from "../modal/modal.page";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    searchCity: string;
    cityName: string = 'Омск';
    cityMain = {
        humidity: 0,
        pressure: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        weather: {}
    };
    cityWind: object = {
        deg: 0,
        speed: 0
    }
    metricType: string;
    windDeg: string;

    constructor(private geoLocation: Geolocation, private apiService: ApiService, private modalController: ModalController) {
    }

    ngOnInit(): void {
        this.metricType = 'metric';
    }

    getLocation() {
        this.geoLocation.getCurrentPosition().then((location) => {
            this.apiService.getCityData(location.coords.latitude, location.coords.longitude, this.metricType).subscribe((res: any) => {
                this.cityName = res.name;
                this.cityMain = res.main;
                this.cityMain.weather = res.weather[0];
                this.cityWind = res.wind;
                this.calcWind(res.wind.deg);
            });
        }).catch(err => {
            console.log(err)
        });
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalPage,
            componentProps: {value: 123}
        });
        modal.onDidDismiss()
            .then((data) => {
                const cityID = data['data']; // Here's your selected user!
                this.getCityById(cityID);
            });
        return await modal.present();
    }

    getCityById(cityId) {
        this.apiService.getCityByID(cityId, this.metricType).subscribe((res: any) => {
                this.cityName = res.name;
                this.cityMain = res.main;
                this.cityWind = res.wind;
                this.cityMain.weather = res.weather[0];
                this.calcWind(res.wind.deg);
            }
        );
    }

    selectMetricType(type: string): void {
        this.metricType = type;
    }

    calcWind(wind) {
        if (!Boolean(wind)) {
            this.windDeg = '';
            return;
        }
        console.log(typeof wind, wind);
        if (wind === 360) {
            this.windDeg = 'Северный';
        } else if (wind > 0 && wind < 90) {
            this.windDeg = 'Северо-восточный';
        } else if (wind === 90) {
            this.windDeg = 'Восточный';
        } else if (wind > 90 && wind < 180) {
            this.windDeg = 'Юго-восточный';
        } else if (wind === 180) {
            this.windDeg = 'Южный';
        } else if (wind > 180 && wind < 270) {
            this.windDeg = 'Юго-западный';
        } else if (wind === 270) {
            this.windDeg = 'Западный';
        } else if (wind > 270 && wind < 360) {
            this.windDeg = 'Северо-западный';
        } else {
            this.windDeg = '';
        }

    }
}
