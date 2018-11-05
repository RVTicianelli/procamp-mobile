import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: any;
  
  @ViewChild('map') mapReference: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let lista = this.navParams.get("list");
    console.log(lista);
    this.initMap(lista);
  }
  
  initMap(lista){
    const location = new google.maps.LatLng(lista[0]["latitude"], lista[0]["longitude"]);
    const options = {
      center:location,
      zoom:12
    }
    const map = new google.maps.Map(this.mapReference.nativeElement, options);

    for (let i = 0; i<lista.length; i++) {
      const newMark = new google.maps.LatLng(lista[i]["latitude"], lista[i]["longitude"])
      this.addMarker(newMark, map);
    }
  }

  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    })
  }
}
