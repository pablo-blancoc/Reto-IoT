import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  registro = {
    hora: "",
    entrada: false,
    ubicacion: "",
  }

  data: any[] = Array();

  @ViewChild( IonInfiniteScroll ) infiniteScroll: IonInfiniteScroll;

  constructor() {}

  ngOnInit() {
  }

  loadData( event ) {

    setTimeout(() => {
      console.log('Done');

      for (let index = 0; index < 20; index++) {
        let registro = {
          hora: "hora de prueba",
          entrada: index % 2 == 0,
          ubicacion: "ubicación de prueba",
        }
        this.data.push(registro);
      }

      this.infiniteScroll.complete();

      if (this.data.length == 100) {
        this.infiniteScroll.disabled = true;
        console.log("MAX ELEMENTS");
      }
    }, 500);

  }

}
