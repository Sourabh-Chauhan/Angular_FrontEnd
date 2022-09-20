import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Doctor } from '../shared/utils/Doctor';

import { DoctorService } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve Doctors from the API bia GET', () => {
    const dummyDoctors: Doctor[] = [
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

    service.getDoctors().subscribe((doctors) => {
      expect(doctors.length).toBe(2);
      expect(doctors).toEqual(dummyDoctors);
    });

    expect(service).toBeTruthy();
  });

  it('be able to retrieve Doctor from the API bia GET by ID', () => {
    const dummyDoctors: Doctor[] = [
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

    let id = 'Doc_00000';

    service.getDoctorByID(id).subscribe((doctor) => {
      expect(doctor).toEqual(dummyDoctors[0]);
    });

    expect(service).toBeTruthy();
  });
});
