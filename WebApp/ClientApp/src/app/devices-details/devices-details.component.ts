import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";

@Component({
  selector: 'app-devices-details',
  templateUrl: './devices-details.component.html',
})
export class DevicesDetailsComponent {
  public chart = []
  public devicesTemp: DeviceTemp[];
 // public devicesType: string[];
  public deviceTempToView: DeviceTemp[];

  constructor(private _http: HttpClient) { }

  weeklyAvgTempForAllDev() {
    return this._http.get<DeviceTemp[]>("http://demo9791456.mockable.io/GetAllAvgTempDevices")
      .map(result => result);
  }


  ngOnInit() {
    this.weeklyAvgTempForAllDev()
      .subscribe(result => {

        this.devicesTemp = result['list'];
        //        this.devicesType = result['list'].map(result => result.type);


      })
  }


  deviceTempUpdate(deviceType: any) {
    this.deviceTempToView = this.devicesTemp.filter((item) => item.type == deviceType);
    //console.log(this.deviceTempToView);

    let allTemps = this.deviceTempToView[0].temps;
    let allWeekNumbers = Array.from({ length: 52 }, (v, k) => k + 1)

    this.chart = new Chart('canvas', {
      type: 'line',
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
  }



}

interface DeviceTemp {
  id: number;
  type: string;
  temps: number[];
}


