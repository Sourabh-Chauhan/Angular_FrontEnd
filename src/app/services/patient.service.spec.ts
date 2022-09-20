import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Patient } from '../shared/utils/Patient';

import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve Doctors from the API bia GET', () => {
    const dummyPatients: Patient[] = [
      {
        id: 'PID_00000',
        name: 'Test 1',
        age: 26,
        visitedDoctorID: 'Doc_00000',
        dateOfVist: new Date(),
      },
      {
        id: 'PID_00001',
        name: 'Test 2',
        age: 26,
        visitedDoctorID: 'Doc_00000',
        dateOfVist: new Date(),
      },
    ];

    service.getPatients().subscribe((patients) => {
      expect(patients.length).toBe(2);
      expect(patients).toEqual(dummyPatients);
    });

    expect(service).toBeTruthy();
  });

  it('be able to retrieve Patient from the API bia GET by ID', () => {
    const dummyPatients: Patient[] = [
      {
        id: 'PID_00000',
        name: 'Test 1',
        age: 26,
        visitedDoctorID: 'Doc_00000',
        dateOfVist: new Date(),
      },
      {
        id: 'PID_00001',
        name: 'Test 2',
        age: 26,
        visitedDoctorID: 'Doc_00000',
        dateOfVist: new Date(),
      },
    ];

    let id = 'PID_00000';

    service.getPatient(id).subscribe((patient) => {
      expect(patient).toEqual(dummyPatients[0]);
    });

    expect(service).toBeTruthy();
  });
});
