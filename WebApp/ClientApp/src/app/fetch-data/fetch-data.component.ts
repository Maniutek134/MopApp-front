import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

@Injectable()
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public currentCount = 0;


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
  

  putData(http: HttpClient, summ: string){
    http.post('http://localhost:44355/' + 'api/SampleData/WeatherForecasts',summ);
  }


  public incrementCounter() {
    this.currentCount++;
  }

  

 
}
//baseUrl + 'api/SampleData/WeatherForecasts'
interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
