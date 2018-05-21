export class Days {
  public day: string;
  public timeIn: number;
  public timeOut: number;

  constructor (day: string, timeIn: number, timeOut: number) {
    this.day = day;
    this.timeIn = timeIn;
    this.timeOut = timeOut;
  }
}
