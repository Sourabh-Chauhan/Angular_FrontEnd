import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { Doctor } from 'src/app/shared/utils/Doctor';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css'],
})
export class DoctorFormComponent implements OnInit {
  isSubmitted: boolean = false;
  regForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {
    this.regForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      gender: ['Male', [Validators.required]],
      specialist: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  OnSubmit() {
    //console.log(this.regForm.value);
    this.isSubmitted = true;
    this.doctorService
      .addDoctor(this.regForm.value)
      .subscribe((doctor: Doctor) => {
        //console.log(doctor);
        this.regForm.reset();
      });
  }

  onReset() {
    this.isSubmitted = false;
    this.regForm.reset();
    this.regForm.controls['gender'].setValue('Male');
  }
}
