export class DataISS {
  public rise: Date;
  public duration: string;
  public dayOrNight: boolean;

  constructor(rise: Date, duration: string, dayOrNight?: boolean) {
    this.rise = rise;
    this.duration = duration;
    this.dayOrNight = dayOrNight;
  }
}
