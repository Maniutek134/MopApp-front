import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public currentCount = 0;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }


  public putData(http: HttpClient, @Inject('BASE_URL') baseUrl: string, summ:string, temp:number) {
    http.post(baseUrl + 'api/SampleData/PutWeatherForecasts', {
      summ: summ,
      temp : temp
    })
  };



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
