import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpendataAemetService } from '../services/opendata-aemet.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  currentYear = new Date().getFullYear();
  info: any;

  constructor(private route: ActivatedRoute, private odAemetService: OpendataAemetService) { }

  ngOnInit() {
    const date: string = this.route.snapshot.paramMap.get('date');
    console.log('date', date);
    this.getCacheClimatologicalValues();
  }

  getCacheClimatologicalValues() {
    console.log(this.odAemetService.climatologicalValues);
    this.info = this.odAemetService.climatologicalValues.filter(value => value.fecha === this.route.snapshot.paramMap.get('date')).pop();
    console.log(this.info);
  }

}
