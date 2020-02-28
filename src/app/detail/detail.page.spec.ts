import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NtkmeButtonModule } from '@ctrl/ngx-github-buttons';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OpendataAemetService } from '../services/opendata-aemet.service';


describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), FormsModule, NtkmeButtonModule, HttpClientTestingModule],
      providers: [OpendataAemetService,
        {
          provide: ActivatedRoute,
          useValue: {
              snapshot: {
                  paramMap: {
                      get(): string {
                          return '2020-02-28';
                      },
                  },
              },
          },
      },]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
