import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Doctor } from 'src/app/shared/utils/Doctor';
import { Patient } from 'src/app/shared/utils/Patient';

import { PatientInfoComponent } from './patient-info.component';

describe('PatientInfoComponent', () => {
  let component: PatientInfoComponent;
  let fixture: ComponentFixture<PatientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientInfoComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Enter Patient ID <h3>', () => {
    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    const innerText = h3.innerText;
    expect(innerText).toBe('Enter Patient ID');
  });

  it('should call PatientService and DoctorService', fakeAsync(() => {
    let patientService = fixture.debugElement.injector.get(PatientService);
    let patientStub = spyOn(patientService, 'getPatient').and.callFake(
      (): Observable<Patient> => {
        return of<Patient>({
          id: 'PID_00001',
          name: 'Sourabh Chauhan',
          age: 26,
          visitedDoctorID: 'Doc_00000',
          dateOfVist: new Date(),
        });
      }
    );

    let doctorService = fixture.debugElement.injector.get(DoctorService);

    let doctorStub = spyOn(doctorService, 'getDoctorByID').and.callFake(() => {
      return of<Doctor>({
        id: 'Doc_00000',
        name: 'Test',
        age: 59,
        gender: 'Male',
        specialist: 'Test',
        numberOfpatientAttened: 8,
      });
    });

    let patientID =
      component.regForm.controls['patientID'].setValue('PID_00000');
    component.OnChangePatientID('PID_00001');

    expect(component.selectedPatient).not.toBeNull();
    expect(component.selectedDoctor).not.toBeNull();
    expect(component).toBeTruthy();
  }));
});
