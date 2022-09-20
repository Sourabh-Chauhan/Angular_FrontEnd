import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;

  routes = [
    { name: 'Doctor Registration', route: 'doctor' },
    { name: 'Patient Registration', route: 'patient' },
    { name: 'Show Doctor Info', route: 'doctorInfo' },
    { name: 'Show Patient Info', route: 'patientInfo' },
    { name: 'About', route: 'about' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
