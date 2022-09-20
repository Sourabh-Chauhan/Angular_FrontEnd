import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        DoctorFormComponent,
        PatientFormComponent,
        DoctorInfoComponent,
        PatientInfoComponent,
        ModalComponent,
        AboutComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'HMS'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('HMS');
  });
});
