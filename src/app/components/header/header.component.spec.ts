import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NgbModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have render route tabs', () => {
    component.routes = [
      { name: 'Test1', route: 'Test1' },
      { name: 'Test2', route: 'Test2' },
      { name: 'Test3', route: 'Test3' },
      { name: 'Test4', route: 'Test4' },
    ];

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const ul: HTMLElement = fixture.nativeElement.querySelector('ul');
      //console.log(ul);
      const li = ul.querySelectorAll('li');
      //console.log(li.length);

      expect(li.length).toEqual(component.routes.length);
    });
    expect(component).toBeTruthy();
  });
});
