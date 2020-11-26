import { Injectable } from '@angular/core';
import { Log } from './../shared/Log';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class LogService {
  logListRef: AngularFireList<any>;
  logRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  public createLog(apt: Log) {
    return this.logListRef.push({
      uid: apt.uid,
      date: apt.date,
      location: apt.location,
      enter: apt.enter
    })
  }

  // Get Single
  public getLog(id: string) {
    this.logRef = this.db.object('/logs/' + id);
    return this.logRef;
  }

  // Get List
  public getLogList() {
    this.logListRef = this.db.list('/logs');
    return this.logListRef;
  }

}