import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class IssService {

  urlJSONP = 'http://api.open-notify.org/iss-pass.json';
  urlSunrise = 'https://api.sunrise-sunset.org/json';

  constructor(private http: HttpClient) {

  }

  getRecords(lat: number, lon: number, amount: number): Observable<any> {

    const params = '?lat=' + lat + '&lon=' + lon + '&n=' + amount + '&callback=JSONP_CALLBACK';

    return this.http.jsonp(this.urlJSONP + params, 'CALLBACK');
  }

  getDayOrNight(lat: number, lng: number, date: string): Observable<any> {

    const params = '?lat=' + lat + '&lng=' + lng + '&date=' + date + '&formatted=0';

    return this.http.get(this.urlSunrise + params);

  }
}
