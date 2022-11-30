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
        for (var i = 7; i < data.list.length; i = i + 8) {
          this.forecastDetails.push(data.list[i]);
        }
        console.log(this.forecastDetails);
      }
    )
  }

}
