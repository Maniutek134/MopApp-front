import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

@Injectable()
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public currentCount = 0;
  public chart = []

  //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
  //    this.forecasts = result;
  //  }, error => console.error(error));
  //}
  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get("https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1")
      .map(result => result);
  }


  public putData(http: HttpClient, @Inject('BASE_URL') baseUrl: string, summ: string, temp: number) {
    http.post(baseUrl + 'api/SampleData/PutWeatherForecasts', {
      summ: summ,
      temp: temp
    })
  };



  public incrementCounter() {
    this.currentCount++;
  }

  ngOnInit() {
    this.dailyForecast()
      .subscribe(res => {

        let temp_max = res['list'].map(result => result.temp.max)
        let temp_min = res['list'].map(result => result.temp.min)
        let alldates = res['list'].map(result => result.dt)

        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        })

        console.log(weatherDates);

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });
      })
  }
}
//baseUrl + 'api/SampleData/WeatherForecasts'
interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
