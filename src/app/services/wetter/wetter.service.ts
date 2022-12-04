import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

const apiUrl: string = environment.weather.apiUrl;
const apiKey: string = environment.weather.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WetterService {

  constructor(private http: HttpClient) {
  }

  // Fetch data for current weather based on the location parameter
  getCurrentWeather(loc: string) {
    return this.http.get(`${apiUrl}/weather?q=${loc}&appid=${apiKey}&units=metric&lang=de`)
  }

  // Fetch weather forecast data based on the location parameter
  getForecast(loc: string) {
    return this.http.get(`${apiUrl}/forecast?q=${loc}&appid=${apiKey}&units=metric&lang=de`)
  }

}
