import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  qrData: string = "Pablo Blanco";
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  constructor() {}

  ngOnInit() {
  }

}
