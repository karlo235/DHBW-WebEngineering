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

  // Fetch data for current weather based on the location from the form
  getWeatherData(formValues: any): void {
    this.wetterService.getCurrentWeather(formValues.location).subscribe(
      (data: any) => {
        console.log(data);
        this.wetterDetails = data;
        this.getForecastData(formValues);
      }
    );
  }

  // Fetch weather forecast data based on the location from the form
  getForecastData(formValues: any): void {
    this.wetterService.getForecast(formValues.location).subscribe(
      (data: any) => {
        console.log(data);
        this.forecastDetails.length = 0;
        // Every 8th item because there is always data for 8 timepoints of a day
        for (var i = 7; i < data.list.length; i = i + 8) {
          this.forecastDetails.push(data.list[i]);
        }
        console.log(this.forecastDetails);
      }
    )
  }

  // Format the date to be shown on the forecast card
  formatDate(date: string): string {
    const date1 = new Date(date);
    return date1.getDate() + '. ' + (date1.getMonth() + 1) + '. ' + date1.getFullYear();
  }

  // Define which image will be used as background based on the weather data and current time
  defineBackgroundImage(): string {
    let backgroundImage = '../assets/background/';
    let hour = new Date().getHours();
    let clear = ['Clear', 'Mist', 'Squall', 'Fog', 'Haze']; // If any of these conditions is met for a location, then a specific image will be used
    let rain = ['Rain', 'Drizzle', 'Thunderstorm']; // If any of these conditions is met for a location, then a specific image will be used
    if (this.wetterDetails.main !== undefined) {
      if (this.wetterDetails.weather[0].main === 'Clouds') { // Single condition for a specific image
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
      if (this.wetterDetails.main.temp > 14) { // Single condition for a specific temperature
        backgroundImage += 'warm.jpg';
      }
      else {
        backgroundImage += 'cold.jpg';
      }
    }
    else if (this.wetterDetails.weather[0].main === 'Snow') { // Single condition for a specific image
      backgroundImage += 'snow.jpg';
    }
    else if (rain.indexOf(this.wetterDetails.weather[0].main) >= 0) {
      backgroundImage += 'rain.jpg';
    }
    return backgroundImage;
  }

}
