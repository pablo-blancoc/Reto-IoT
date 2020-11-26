import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from '../../shared/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

  Logs = [];

  constructor( private lsv: LogService ) { }

  ngOnInit() {

    this.fetchLogs();
    let logRes = this.lsv.getLogList();
    logRes.snapshotChanges().subscribe(res => {
      this.Logs = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Logs.push(a as Log);
      })
    })

  }

  fetchLogs() {
    this.lsv.getLogList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  onAddLog() {

    const log: any = {
      uid: "prueba-uid",
      location: "prueba-location",
      date: "prueba-date",
      enter: true
    }

    this.lsv.createLog(log).then(res => {
      console.log(res)
    })
      .catch(error => console.log(error));
  }

}
