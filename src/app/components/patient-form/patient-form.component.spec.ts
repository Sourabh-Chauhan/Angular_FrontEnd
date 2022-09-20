import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PatientFormComponent } from './patient-form.component';

describe('PatientFormComponent', () => {
  let component: PatientFormComponent;
  let fixture: ComponentFixture<PatientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientFormComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Patient Registrations Form <h1>', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
    const innerText = h1.innerText;
    expect(innerText).toBe('Patient Registrations Form');
  });

  it('should have Patient Registrations Form filled correctly ', () => {
    let name = component.regForm.controls['name'].setValue('Patient Name');
    let age = component.regForm.controls['age'].setValue(24);
    let visitedDoctorID =
      component.regForm.controls['visitedDoctorID'].setValue('Doc_00000');

    let dateOfVist = component.regForm.controls['dateOfVist'].setValue(
      new Date().toISOString()
    );

    expect(component.regForm.valid).toBeTruthy();
  });

  it('should have Patient Info Submitted <h1>', () => {
    component.isSubmitted = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
      const innerText = h1.innerText;
      expect(innerText).toBe('Patient Info Submitted');
    });

    expect(component).toBeTruthy();
  });
});
