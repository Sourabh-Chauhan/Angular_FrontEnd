import { Component, OnInit } from '@angular/core';
import {
  faTimes,
  faUserEdit,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/shared/utils/Patient';
import { debounce, debounceTime } from 'rxjs';
import { Doctor } from 'src/app/shared/utils/Doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  faTimes = faTimes;
  faUserEdit = faUserEdit;
  faReceipt = faReceipt;
  selectedPatient!: Patient | null;
  selectedDoctor!: Doctor;
  errorMessage: string = '';

  regForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private modalService: NgbModal
  ) {
    this.regForm = this.fb.group({
      patientID: [
        '',
        [Validators.required, Validators.pattern('^PID_[0-9]{5}')],
      ],
    });
  }

  OnChangePatientID(patientID: any): void {
    this.errorMessage = '';

    this.selectedPatient = null;
    if (patientID && !this.regForm.controls['patientID'].errors) {
      this.patientService.getPatient(patientID).subscribe({
        next: (patient) => {
          this.errorMessage = '';
          this.selectedPatient = patient;

          this.doctorService.getDoctorByID(patient.visitedDoctorID).subscribe({
            next: (doctor) => {
              this.selectedDoctor = doctor;
            },
            error: (e) => {
              console.error(e);
              this.errorMessage = e.message;
            },
            complete: () => console.info('DoctorService complete'),
          });
        },
        error: (e) => {
          console.error(e);
          this.errorMessage = e.message;
        },
        complete: () => console.info('PatientService complete'),
      });
    }
  }

  ngOnInit(): void {}

  editPatient(patient: Patient) {
    console.log('Yet to implement EditPatient');
    console.log('editPatient :', patient.name);
  }

  deletePatient(patient: Patient) {
    console.log('deletePatient :', patient.name);

    this.patientService.deletePatient(patient).subscribe({
      next: (deletePatient: Patient) => {
        console.log(deletePatient);
        this.regForm.reset();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  open(patient: Patient) {
    console.log('Open Prescription modal for  :', patient.name);
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.heading = 'Prescription';
    modalRef.componentInstance.data = [
      { medication: 'AAAAAAAAAA', dose: 1 },
      { medication: 'bbbbbbbbbb', dose: 2 },
      { medication: 'cccccccccc', dose: 3 },
    ];
  }
}
