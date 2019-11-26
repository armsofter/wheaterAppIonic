import {Component, OnInit} from '@angular/core';
import {ApiService} from "../service/api.service";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
    searchCity: string;
    searchResults: [{}];

    constructor(private apiService: ApiService, private modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    search(city) {
        if (city.length > 3) {
            this.apiService.searchByCityName(city).subscribe((res: { cod: string, message: string, count: number, list: [{}] }) => {
                if (res.cod === '200' && res.count > 0) {
                    console.log(res);
                    this.searchResults = res.list;
                }
            });
        }
    }

    selectCity(cityId) {
        localStorage.setItem('cityID', cityId);
        const data = cityId;
        this.closeModal(data);
    }

    closeModal(data) {
        this.modalCtrl.dismiss(data);
    }
}
