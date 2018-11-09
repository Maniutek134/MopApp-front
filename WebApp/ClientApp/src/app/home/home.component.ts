import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public chart = []
  public devicesAvgTemp: DeviceAvgTemp[];
  public allTypes: string[];
  public allTemps: number[];

  constructor(private _http: HttpClient) { }


  getAllDevicesAvgTemp() {
    return this._http.get<DeviceAvgTemp[]>("http://demo9791456.mockable.io/plot")
      .map(result => result);
  }

  ngOnInit() {
    this.getAllDevicesAvgTemp().
      subscribe(result => {

        this.devicesAvgTemp=result['list'];

        this.allTemps = result['list'].map(result => result.avgTemp)
        this.allTypes = result['list'].map(result => result.type)

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: this.allTypes,
            datasets: [
              {
                label: "Avg Temps",
                data: this.allTemps,
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

interface DeviceAvgTemp {
  id: number;
  type: string;
  avgTemp: number;
}
