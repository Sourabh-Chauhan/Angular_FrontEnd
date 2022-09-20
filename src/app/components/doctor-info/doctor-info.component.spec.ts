import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DoctorInfoComponent } from './doctor-info.component';

describe('DoctorInfoComponent', () => {
  let component: DoctorInfoComponent;
  let fixture: ComponentFixture<DoctorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorInfoComponent],
      imports: [ReactiveFormsModule, HttpClientModule, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Select the Doctor <h3>', () => {
    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    const innerText = h3.innerText;
    expect(innerText).toBe('Select the Doctor');
  });

  it('should have Doctor Info form Table with Test data', () => {
    component.AllDoctor = [
      {
        id: 'Doc_00000',
        name: 'Test',
        age: 59,
        gender: 'Male',
        specialist: 'Test',
        numberOfpatientAttened: 8,
      },
      {
        id: 'Doc_00001',
        name: 'Test 1',
        age: 59,
        gender: 'Female',
        specialist: 'Test 2',
        numberOfpatientAttened: 8,
      },
    ];

    let index = component.regForm.controls['Index'].setValue(0);
    component.onChange(index);

    //console.log(component.selectedDoctor);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const h1: HTMLElement = fixture.nativeElement.querySelector('h1');

      const name: HTMLElement =
        fixture.nativeElement.querySelector('#doc_name');

      expect(component.selectedDoctor).toBeNull();
      expect(h1.innerText).toBe('Doctor Info');
      expect(name.innerText).toBe('Test');
    });

    expect(component.regForm.valid).toBeTruthy();
  });
});
