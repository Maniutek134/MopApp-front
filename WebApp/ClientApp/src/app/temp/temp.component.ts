import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html'
})

@Injectable()
export class TempComponent {
  public temps: Temperature[];

  constructor(http: HttpClient) {
    http.get<Temperature[]>('https://virtserver.swaggerhub.com/wadimj/MopApp/1.0.0/temperature').subscribe(result => {
      this.temps = result;
    }), error => console.error(error);
  }
}

interface Temperature {
  id: number;
  temp: number;
  timestamp: number;
}
