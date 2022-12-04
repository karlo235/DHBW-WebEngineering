import {Component, OnInit} from '@angular/core';
import {WetterService} from "../../services/wetter/wetter.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-wetter',
  templateUrl: './wetter.component.html',
  styleUrls: ['./wetter.component.css']
})
export class WetterComponent implements OnInit {

  public wetterDetails: any;
  public forecastDetails: any[] = [];
  public weatherSearchForm!: FormGroup;

  constructor(
    private wetterService: WetterService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""]
    });
  }

  getWeatherData(formValues: any): void {
    this.wetterService.getCurrentWeather(formValues.location).subscribe(
      (data: any) => {
        console.log(data);
        this.wetterDetails = data;
        this.getForecastData(formValues);
      }
    );
  }

  getForecastData(formValues: any): void {
    this.wetterService.getForecast(formValues.location).subscribe(
      (data: any) => {
        console.log(data);
        this.forecastDetails.length = 0;
        for (var i = 7; i < data.list.length; i = i + 8) {
          this.forecastDetails.push(data.list[i]);
        }
        console.log(this.forecastDetails);
      }
    )
  }

  formatDate(date: string): string {
    const date1 = new Date(date);
    return date1.getDate() + '. ' + (date1.getMonth() + 1) + '. ' + date1.getFullYear();
  }

  defineBackgroundImage(): string {
    let backgroundImage = '../assets/background/';
    let hour = new Date().getHours();
    let clear = ['Clear', 'Mist', 'Squall', 'Fog', 'Haze'];
    let rain = ['Rain', 'Drizzle', 'Thunderstorm'];
    if (this.wetterDetails.main !== undefined) {
      if (this.wetterDetails.weather[0].main === 'Clouds') {
        backgroundImage += 'cloudy.jpg';
        return backgroundImage;
      }
      if (hour > 7 && hour < 19) {
        backgroundImage += 'day-';
      }
      else {
        backgroundImage += 'night-';
      }
    }
    if (clear.indexOf(this.wetterDetails.weather[0].main) >= 0) {
      if (this.wetterDetails.main.temp > 14) {
        backgroundImage += 'warm.jpg';
      }
      else {
        backgroundImage += 'cold.jpg';
      }
    }
    else if (this.wetterDetails.weather[0].main === 'Snow') {
      backgroundImage += 'snow.jpg';
    }
    else if (rain.indexOf(this.wetterDetails.weather[0].main) >= 0) {
      backgroundImage += 'rain.jpg';
    }
    return backgroundImage;
  }

}
