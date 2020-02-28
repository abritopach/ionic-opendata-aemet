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

  maxDate = new Date().toISOString().slice(0, 10);
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
      this.odAemetService.getData(data.datos).subscribe((stations) => {
        this.allStations = stations;
        this.stations = stations;
      });
    });
  }

  onProvinceChange(event) {
    this.stations = [];
    this.stations = this.allStations.filter(station => station.provincia === event.detail.value);
    this.stations.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  onStationChange(event) {
    this.selectedStation = event.detail.value;
  }

  getClimatologicalValues() {
    this.showLoading();
    const start = new Date(this.startDate).toISOString().replace('.000Z', 'UTC');
    const end = new Date(this.endDate).toISOString().replace('.000Z', 'UTC');
    this.odAemetService.getClimatologicalURLData(start, end, this.selectedStation).subscribe((data) => {
      if (data.estado === 200) {
        this.odAemetService.getClimatologicalValues(data.datos).subscribe((values) => {
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
