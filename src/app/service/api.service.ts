import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private ROOT_URL: string;
  private appId: string = 'f65866d78e794d96f6e07e563782e19a';
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://api.openweathermap.org/';
  }

  getCityData(latitude: number, longitude: number, type: string) {
   return this.http.get(`${this.ROOT_URL}data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${type}&APPID=${this.appId}`);
  }
  searchByCityName(cityName) {
    return this.http.get(`${this.ROOT_URL}data/2.5/find?q=${cityName}&APPID=${this.appId}`);
  }
  getCityByID(cityID, type: string) {
    return this.http.get(`${this.ROOT_URL}data/2.5/weather?id=${cityID}&units=${type}&APPID=${this.appId}`);
  }
  getIcon(iconCode) {
    return this.http.get(`http://openweathermap.org/img/w/${iconCode}.png`);
  }
}
