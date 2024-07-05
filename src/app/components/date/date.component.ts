import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss'
})
export class DateComponent {
  @Input() startDateTime : string = "";
  @Input() endDateTime : string = "";

  startDate : string = "";
  endDate : string = "";
  startTime : string = "";
  endTime : string = "";

  calculatedTimeToCompletion : string = "";

  ngOnInit() {
    [this.startDate, this.startTime] = this.separateDateAndTime(this.startDateTime);
    [this.endDate, this.endTime] = this.separateDateAndTime(this.endDateTime);
    this.calculatedTimeToCompletion = this.calculateTimeToCompletion(this.startTime, this.endTime);

  }
  separateDateAndTime(dateTime : string) {
    var datePlusTimeList = dateTime.split("T");
    return datePlusTimeList;
  }

  calculateTimeToCompletion(start : string, end : string) {
    var startHour = "", startMinute = "", startSecond = "";
    var endHour = "", endMinute = "", endSecond = "";
    var endArray = end.split(":");
    var startArray = start.split(":");

    startHour = startArray[0];
    startMinute = startArray[1];
    startSecond = startArray[2]    

    endHour = endArray[0];
    endMinute = endArray[1];
    endSecond = endArray[2];
    
    var calHour = (Number(endHour) - Number(startHour))
    var calMinute = (Number(endMinute) - Number(startMinute))
    var calSecond = (Number(endSecond) - Number(startSecond))
 
    console.log(calHour, calMinute, calSecond)
    var timeInSeconds = Number(calHour * 3600) + Number(calMinute * 60) + Number(calSecond);
    return timeInSeconds.toString();
  }


}
