import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DoctorFormComponent } from './doctor-form.component';

describe('DoctorFormComponent', () => {
  let component: DoctorFormComponent;
  let fixture: ComponentFixture<DoctorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorFormComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Doctor Registrations Form <h1>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h1');
    const innerText = h2.innerText;
    expect(innerText).toBe('Doctor Registrations Form');
  });

  it('should have Doctor Info form', () => {
    let name = component.regForm.controls['name'].setValue('Doctor Name');
    let age = component.regForm.controls['age'].setValue(24);
    let gender = component.regForm.controls['gender'].setValue('Male');
    let specialist =
      component.regForm.controls['specialist'].setValue('Doctor specialist');

    expect(component.regForm.valid).toBeTruthy();
  });

  it('should have Doctor Info Submitted <h1>', () => {
    component.isSubmitted = true;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
      const innerText = h1.innerText;
      expect(innerText).toBe('Doctor Info Submitted');
    });
    expect(component).toBeTruthy();
  });
});
