import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NtkmeButtonModule } from '@ctrl/ngx-github-buttons';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OpendataAemetService } from '../services/opendata-aemet.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), FormsModule, NtkmeButtonModule, HttpClientTestingModule],
      providers: [OpendataAemetService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
