import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public chart = []


  constructor(private _http: HttpClient) { }

  weeklyAvgTemp() {
    return this._http.get("http://demo9791456.mockable.io/GetAvgTemp")
      .map(result => result);
  }


  ngOnInit() {
    this.weeklyAvgTemp()
      .subscribe(res => {

        let allTemps = res['temps']//.map(result => result)
        let allWeekNumbers = Array.from({ length:52 },(v,k)=> k+1)
        
        //allTemps.forEach((res) => {
        //  let jsdate = new Date(res * 1000)
        //  weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'numeric', day: 'numeric' }))
        //})

        console.log(allTemps);

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: allWeekNumbers,
            datasets: [
              {
                label: "Avg Temp",
                data: allTemps,
                borderColor: '#19EF0B',
                backgroundColor: '#19EF0B',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: true,
            }
          }
        });
      })

  }

}
