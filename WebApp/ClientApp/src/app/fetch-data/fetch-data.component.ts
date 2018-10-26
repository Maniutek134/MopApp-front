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


  constructor(http: HttpClient) {
    http.get<WeatherForecast[]>('http://ec2-18-184-187-189.eu-central-1.compute.amazonaws.com/api/routes/').subscribe(result => {
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
  id: string;
  name: number;

}
