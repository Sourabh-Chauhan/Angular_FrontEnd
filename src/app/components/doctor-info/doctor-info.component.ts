import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTimes, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/shared/utils/Doctor';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css'],
})
export class DoctorInfoComponent implements OnInit {
  AllDoctor: Doctor[] = [];
  selectedDoctor!: Doctor;
  faTimes = faTimes;
  faUserEdit = faUserEdit;

  regForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.regForm = this.fb.group({
      Index: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.AllDoctor = doctors;
      //console.log(doctors);

      if (this.AllDoctor.length > 0) {
        this.selectedDoctor = this.AllDoctor[0];
        this.regForm.controls['Index'].setValue(0);
      }
    });
  }

  onChange(event: any): void {
    //console.log(this.regForm.controls['Index'].value);
    //console.log(event);
    this.selectedDoctor = this.AllDoctor[this.regForm.controls['Index'].value];
  }

  editDoctor(doctor: Doctor) {
    console.log('Yet to implement EditDoctor');
    console.log('editDoctor :', doctor.name);
    //this.doctorService.
  }

  deleteDoctor(doctor: Doctor) {
    //console.log('deleteDoctor :', doctor.name);

    this.doctorService.deleteDoctor(doctor).subscribe({
      next: (doc) => {
        //console.log(doctor);
        this.AllDoctor = this.AllDoctor.filter((t) => t.id !== doc.id);
        this.regForm.reset();
        if (this.AllDoctor.length > 0) {
          this.selectedDoctor = this.AllDoctor[0];
          this.regForm.controls['Index'].setValue(0);
        }
      },
      error: (e) => console.error(e),
      complete: () => console.info('Delete Complete'),
    });
  }
}
