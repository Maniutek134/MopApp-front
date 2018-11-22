import { Component, ElementRef, ViewChild } from '@angular/core';
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


  public chart= [];
  public devices: Device[];
  public allWeekNumbers: number[];
  public allTemps: number[];
  

  constructor(private _http: HttpClient) { }


  getAllDevices() {
    return this._http.get<Device[]>("http://ec2-18-184-187-189.eu-central-1.compute.amazonaws.com/api/temperature/devices")
      .map(result => result);
   
  }

  getAvgWeeklyTemps(id: number) {
    return this._http.get<AvgWeekTemp[]>("http://ec2-18-184-187-189.eu-central-1.compute.amazonaws.com/api/temperature/plot/" + id.toString())
      .map(result => result);

  }

  chartUpdate(chart: Chart, device:Device) {

    chart.type = 'line';
    chart.data = {
      labels: this.allWeekNumbers,
      datasets: [
        {
          label: "Avg Temp of " + device.name,
          data: this.allTemps,
          borderColor: '#19EF0B',
          backgroundColor: '#19EF0B',
          fill: false
              }
      ]
    }
    chart.options = {
      legend: {
        display: true,
      }

    }


  chart.update();
}

  chartCreate() {
    this.chart = new Chart('canvas', {
      type: 'line'
    });
  }

  ngOnInit() {
    this.getAllDevices()
      .subscribe(result => {

        this.devices = result;
      })

    this.allWeekNumbers = Array.from({ length: 52 }, (v, k) => k + 1);
    //his.chartCreate();
  }

  deviceChoice(deviceId: number) {

    //delete this.chart;

    let currentDevice = this.devices.filter((item) => {
      return item.id == deviceId;
    });

    this.getAvgWeeklyTemps(currentDevice[0].id) //this is how filter works.. rwturns the array of elemnts that suit to filter properties
      .subscribe(result => {

        this.allTemps = result.map(result => result.avgResult)
  
        //this.chartUpdate(this.chart, currentDevice[0]);

       // if (this.myChart)  this.myChart.destroy(); //destroy prev chart instance

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.allWeekNumbers,
            datasets: [
              {
                label: "Avg Temp of " + currentDevice[0].name,
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





interface Device {
  id: number;
  name: string;
  average: number;
}

interface AvgWeekTemp {
  week: number;
  avgResult: number
}


