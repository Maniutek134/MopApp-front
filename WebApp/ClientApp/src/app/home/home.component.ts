import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public chart = []
  public devicesAvgTemp: DeviceAvgTemp[];
  public allNames: string[];
  public allTemps: number[];

  constructor(private _http: HttpClient) { }


  getAllDevicesAvgTemp() {
    return this._http.get<DeviceAvgTemp[]>("http://ec2-18-195-99-124.eu-central-1.compute.amazonaws.com/api/temperature/devices")
      .map(result => result);
  }

  ngOnInit() {
    this.getAllDevicesAvgTemp().
      subscribe(result => {

        this.devicesAvgTemp=result;

        this.allTemps = result.map(result => result.average)
        this.allNames = result.map(result => result.name)

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: this.allNames,
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

  saveDataToCSV() {
    let date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //Jan == 0
    var day = date.getDate();

    new Angular5Csv(this.devicesAvgTemp, 'avgYearAllDevTemps_' + year + month + day);
  }


}

interface DeviceAvgTemp {
  id: number;
  name: string;
  average: number;
}
