import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from 'src/app/login/login.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { RegistrationComponent } from 'src/app/registration/registration.component';

xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, LoginComponent, ErrorComponent, RegistrationComponent ],
      imports: [
        RouterTestingModule,
        AppRoutingModule,
    ]
    })
    .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Successfully logout', async(inject([Router], (router) => {
    spyOn(router, 'navigate');
    expect(localStorage.getItem('authToken')).toEqual('DummyTokenIsSent');
    component.logout();
    expect(localStorage.getItem('authToken')).toEqual('');
    expect(component.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    })
  ));
});
