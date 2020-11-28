import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../services/log.service';
import { Log } from '../../shared/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

  Logs = [];
  uid: string = "";

  constructor( private lsv: LogService, private route: ActivatedRoute, private router: Router ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.uid = this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  ngOnInit() {

    this.fetchLogs();
    let logRes = this.lsv.getLogList();
    logRes.snapshotChanges().subscribe(res => {
      this.Logs = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        console.log("UID PASSED: ", this.uid, "     UID GOT: ", a['uid']);
        if( a['uid'] == this.uid ) {
          this.Logs.push(a as Log);
        }
      })
      this.Logs = this.Logs.reverse();
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
