import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, timer } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Doctor } from 'src/app/shared/utils/Doctor';
import { Patient } from 'src/app/shared/utils/Patient';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  isSubmitted: boolean = false;
  AllDoctor!: Doctor[];
  dateTime!: Date;
  errorMessage: string = '';
  regForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {
    this.regForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required]],
      visitedDoctorID: ['', [Validators.required]],
      dateOfVist: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.AllDoctor = doctors;
      this.regForm.controls['visitedDoctorID'].setValue(this.AllDoctor[0].id);
    });

    setInterval(() => {
      this.regForm.controls['dateOfVist'].setValue(new Date());
    }, 1000);
  }

  OnSubmit() {
    this.isSubmitted = true;

    this.patientService
      .addPatient(this.regForm.value)
      .subscribe((patient: Patient) => {
        this.regForm.reset();
      });
  }

  onReset() {
    this.isSubmitted = false;
    this.regForm.reset();
    this.regForm.controls['visitedDoctorID'].setValue(this.AllDoctor[0].id);
  }
}
