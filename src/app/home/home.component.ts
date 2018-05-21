import {Component, OnInit} from '@angular/core';
import {isUndefined} from 'util';
import * as moment from 'moment';

import {IssService} from '../services/iss.service';
import {DataISS} from '../models/dataISS';
import {Days} from '../models/days';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chooseCity = 3;
  isLoaded = false;
  records: DataISS[] = []
  amount = 10;
  days: Days[] = [];

  cities = [
    {name: 'Tel Aviv', coordinateX: 32.0853, coordinateY: 34.7818},
    {name: 'London', coordinateX: 51.5074, coordinateY: -0.1278},
    {name: 'New York City', coordinateX: 40.7128, coordinateY: -74.0060},
    {name: 'Select city', coordinateX: 0, coordinateY: 0}
  ];

  constructor(private issService: IssService) {
  }

  ngOnInit() {
  }

  selectCity() {

    if (this.chooseCity != 3) {
      this.isLoaded = false;
      this.records = [];
      this.days = [];
      this.issService.getRecords(this.cities[this.chooseCity].coordinateX, this.cities[this.chooseCity].coordinateY, this.amount)
        .subscribe((data) => {

          data.response.forEach((el) => {
            this.addDay(el.risetime);
            const dataISS = new DataISS(new Date(el.risetime * 1000), this.durationConverter(el.duration));
            this.records.push(dataISS);
          });

          this.days.forEach((el) => {
            this.issService.getDayOrNight(this.cities[this.chooseCity].coordinateX, this.cities[this.chooseCity].coordinateY, el.day)
              .subscribe((dataDays) => {
                el.timeIn = new Date(dataDays.results.sunrise).valueOf();
                el.timeOut = new Date(dataDays.results.sunset).valueOf();
                this.dayOrNight(el);
                this.isLoaded = true;
              });
          });
        });
    }
  }

  private addDay(time_timestamp): void {

    const time = new Date(time_timestamp * 1000);
    const day = moment(time).format('YYYY-MM-DD');

    if (isUndefined(this.days.find((el) => el.day === day))) {
      this.days.push(new Days(day, 0, 0));
    }
  }

  private dayOrNight(dayDays): void {

    this.records.forEach((el) => {

        const dayRecord = moment(el.rise).format('YYYY-MM-DD');
        if (dayDays.day === dayRecord) {
          const momentStation = (el.rise).valueOf();
          if (momentStation > dayDays.timeIn && momentStation < dayDays.timeOut) {
            console.log('TRUE');
            el.dayOrNight = true;
          } else {
            console.log('FALSE');
            el.dayOrNight = false;
          }
        }
      }
    );
  }

  private durationConverter(totalSeconds): string {

    const sec_num = parseInt(totalSeconds, 10)
    const hours = Math.floor(sec_num / 3600) % 24
    const minutes = Math.floor(sec_num / 60) % 60
    const seconds = sec_num % 60
    return [hours, minutes, seconds]
      .map(v => v < 10 ? '0' + v : v)
      .join(':');
  }
}
