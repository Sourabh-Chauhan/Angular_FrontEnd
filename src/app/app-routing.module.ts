import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';

const routes: Routes = [
  {
    path: 'doctor',
    component: DoctorFormComponent,
  },
  {
    path: 'patient',
    component: PatientFormComponent,
  },

  {
    path: 'doctorInfo',
    component: DoctorInfoComponent,
  },
  {
    path: 'patientInfo',
    component: PatientInfoComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },

  {
    path: '',
    redirectTo: '/doctorInfo',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/patientInfo',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
