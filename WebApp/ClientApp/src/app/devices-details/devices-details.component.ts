import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-devices-details',
  templateUrl: './devices-details.component.html',
})
export class DevicesDetailsComponent {
  public chart = []
  public phonesTemp = []

  constructor(private _http: HttpClient) { }

  weeklyAvgTempForAllDev() {
    return this._http.get("http://demo9791456.mockable.io/GetAllAvgTempDevices")
      .map(result => result);
  }


  ngOnInit() {
    this.weeklyAvgTempForAllDev()
      .subscribe(res => {

        let allTemps = res['temps']//.map(result => result)
        let allWeekNumbers = Array.from({ length:52 },(v,k)=> k+1)
        
        //allTemps.forEach((res) => {
        //  let jsdate = new Date(res * 1000)
        //  weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'numeric', day: 'numeric' }))
        //})

        console.log(allTemps);

      })

  }

}

interface PhoneTemp {
  id: number;
  name: string;
  [temps: number]: any;
}
