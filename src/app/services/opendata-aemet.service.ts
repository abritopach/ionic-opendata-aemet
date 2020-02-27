import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpendataAemetService {

  private readonly URL_BASE: string = 'https://opendata.aemet.es/opendata/api/';
  private readonly API_KEY: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZHJicnBhMTk4OEBnbWFpbC5jb20iLCJqdGkiOiJmNDU3M2E5Zi1mZWYzLTQ2MWEtODI0Yi00ZmFmZmVjNDA2YWUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTU4MjgxMDMwMiwidXNlcklkIjoiZjQ1NzNhOWYtZmVmMy00NjFhLTgyNGItNGZhZmZlYzQwNmFlIiwicm9sZSI6IiJ9.DOnvQjebrefPxaodOGI3o5EsNQ_O2ouPdXuoAYD15JE';

  provinces =
  [
    { 'id': '04', 'nm': 'Almería' }, { 'id': '11', 'nm': 'Cádiz' }, { 'id': '14', 'nm': 'Córdoba' },
    { 'id': '18', 'nm': 'Granada' }, { 'id': '21', 'nm': 'Huelva' }, { 'id': '23', 'nm': 'Jaén' },
    { 'id': '29', 'nm': 'Málaga' }, { 'id': '41', 'nm': 'Sevilla' }, { 'id': '22', 'nm': 'Huesca' },
    { 'id': '44', 'nm': 'Teruel' }, { 'id': '50', 'nm': 'Zaragoza' }, { 'id': '33', 'nm': 'Asturias' },
    { 'id': '07', 'nm': 'Balears, Illes' }, { 'id': '35', 'nm': 'Palmas, Las' },
    { 'id': '38', 'nm': 'Santa Cruz de Tenerife' }, { 'id': '39', 'nm': 'Cantabria' },
    { 'id': '05', 'nm': 'Ávila' }, { 'id': '09', 'nm': 'Burgos' }, { 'id': '24', 'nm': 'León' },
    { 'id': '34', 'nm': 'Palencia' }, { 'id': '37', 'nm': 'Salamanca' },
    { 'id': '40', 'nm': 'Segovia' }, { 'id': '42', 'nm': 'Soria' }, { 'id': '47', 'nm': 'Valladolid' },
    { 'id': '49', 'nm': 'Zamora' }, { 'id': '02', 'nm': 'Albacete' }, { 'id': '13', 'nm': 'Ciudad Real' },
    { 'id': '16', 'nm': 'Cuenca' }, { 'id': '19', 'nm': 'Guadalajara' }, { 'id': '45', 'nm': 'Toledo' },
    { 'id': '08', 'nm': 'Barcelona' }, { 'id': '17', 'nm': 'Girona' }, { 'id': '25', 'nm': 'Lleida' },
    { 'id': '43', 'nm': 'Tarragona' }, { 'id': '03', 'nm': 'Alicante/Alacant' },
    { 'id': '12', 'nm': 'Castellón/Castelló' }, { 'id': '46', 'nm': 'Valencia/València' },
    { 'id': '06', 'nm': 'Badajoz' }, { 'id': '10', 'nm': 'Cáceres' }, { 'id': '15', 'nm': 'Coruña, A' },
    { 'id': '27', 'nm': 'Lugo' }, { 'id': '32', 'nm': 'Ourense' }, { 'id': '36', 'nm': 'Pontevedra' },
    { 'id': '28', 'nm': 'Madrid' }, { 'id': '30', 'nm': 'Murcia' }, { 'id': '31', 'nm': 'Navarra' },
    { 'id': '01', 'nm': 'Araba/Álava' }, { 'id': '48', 'nm': 'Bizkaia' }, { 'id': '20', 'nm': 'Gipuzkoa' },
    { 'id': '26', 'nm': 'Rioja, La' }, { 'id': '51', 'nm': 'Ceuta' }, { 'id': '52', 'nm': 'Melilla' }
  ];

  constructor(private http: HttpClient) {
    this.provinces.forEach(province => {
      const value = province.nm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
      console.log('value', value);
      province['value'] = value;
    });
    this.provinces.sort((a, b) => a.nm.localeCompare(b.nm));
  }

  getProvinces() {
    return this.provinces;
  }

  getAllStationsURLData(): Observable<any> {
    // console.log(this.URL_BASE + `valores/climatologicos/inventarioestaciones/todasestaciones/?api_key=${this.API_KEY}`);
    return this.http
    .get(this.URL_BASE + `valores/climatologicos/inventarioestaciones/todasestaciones/?api_key=${this.API_KEY}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
      /*
      tap((result) => {
        console.log('result', result);
      },
      (error) => {
          console.log('error', error.message);
      })
      */
    );
  }

  getData(dataURL: string): Observable<any> {
    return this.http
    .get(dataURL)
    .pipe(
      retry(3),
      catchError(this.handleError),
      /*
      tap((result) => {
        console.log('result', result);
      },
      (error) => {
          console.log('error', error.message);
      })
      */
    );
  }

  getClimatologicalURLData(startDate: string, endDate: string , stationId: string): Observable<any> {
    console.log(this.URL_BASE +
      `/valores/climatologicos/diarios/datos/fechaini/${startDate}/fechafin/${endDate}/estacion/${stationId}/?api_key=${this.API_KEY}`);
    return this.http
    .get(this.URL_BASE +
       `/valores/climatologicos/diarios/datos/fechaini/${startDate}/fechafin/${endDate}/estacion/${stationId}/?api_key=${this.API_KEY}`)
    .pipe(
      retry(3),
      catchError(this.handleError),
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors.
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
