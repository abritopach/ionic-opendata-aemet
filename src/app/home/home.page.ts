import { Component, OnInit } from '@angular/core';

import { OpendataAemetService } from '../services/opendata-aemet.service';
import { LoadingController } from '@ionic/angular';
import { IziToastService } from '../services/izi-toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentYear = new Date().getFullYear();
  provinces = [];
  allStations = [];
  stations = [];
  startDate = new Date();
  endDate = new Date();
  selectedProvince = '';
  selectedStation = '';
  climValues = [];
  loading: HTMLIonLoadingElement;

  constructor(private odAemetService: OpendataAemetService, private loadingCtrl: LoadingController, private iziToast: IziToastService) {
  }

  ngOnInit() {
    this.provinces = this.odAemetService.getProvinces();
    this.getAllStations();
  }

  getAllStations() {
    this.odAemetService.getAllStationsURLData().subscribe((data) => {
      console.log(data);
      this.odAemetService.getData(data.datos).subscribe((stations) => {
        console.log(stations);
        this.allStations = stations;
        this.stations = stations;
      });
    });
  }

  onProvinceChange(event) {
    console.log('HomePage::onProvinceChange method called', event);
    this.stations = [];
    this.stations = this.allStations.filter(station => station.provincia === event.detail.value);
    this.stations.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  onStationChange(event) {
    console.log('HomePage::onStationChange method called', event.detail.value);
    this.selectedStation = event.detail.value;
  }

  getClimatologicalValues() {
    this.showLoading();
    const start = new Date(this.startDate).toISOString().replace('.000Z', 'UTC');
    const end = new Date(this.endDate).toISOString().replace('.000Z', 'UTC');
    console.log('HomePage::getClimatologicalValues method called', start, end);
    this.odAemetService.getClimatologicalURLData(start, end, this.selectedStation).subscribe((data) => {
      console.log(data);
      if (data.estado === 200) {
        this.odAemetService.getClimatologicalValues(data.datos).subscribe((values) => {
          console.log(values);
          this.climValues = values;
        });
      } else {
        this.iziToast.show('Climatological values', 'Sorry, no matching data available.',
        'red', 'ico-error', 'assets/avatar.png');
      }
      this.hideLoading();
    });
  }

  async showLoading(): Promise<void> {
    try {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    } catch (error) {
      console.error(error);
    }
}

  hideLoading(): Promise<boolean> {
      return this.loading.dismiss();
  }

}
