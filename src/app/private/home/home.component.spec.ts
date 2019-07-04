import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let guestUserService: any;
    let guestUserServiceSpy: any;

    beforeEach(async(() => {
        guestUserService = jasmine.createSpyObj('GuestUserService', ['getData']);

        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [
                HttpClientModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: GuestUserService, useValue: guestUserService }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;

        guestUserServiceSpy = guestUserService.getData.and.returnValue(of({
            data: { firstname: 'ABC', lastname: 'XYZ', username: 'ABC@XYZ', imageFile: 'http://imagefile.XYZ.com' }
        }
        ));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get user data and create profile form when getUserDetails called', () => {
        expect(component.username).toBeUndefined();
        expect(component.fullName).toBeUndefined();

        spyOn(component, 'getUserDetails').and.callThrough();
        component.getUserDetails();

        expect(guestUserService).toBeDefined();
        expect(guestUserServiceSpy).toBeDefined();
        expect(component.getUserDetails).toHaveBeenCalledTimes(1);
        expect(guestUserServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.username).toEqual('ABC@XYZ');
        expect(component.fullName).toEqual('ABC XYZ');
    });

    it('should show correct greeting message by current time', () => {
        jasmine.clock().install();
        var baseTime = new Date(2019, 9, 23, 10, 59, 59);
        jasmine.clock().mockDate(baseTime);
        fixture.detectChanges();

        component.getGreetingMessage();

        expect(component.time).toEqual('Morning');
    });


    afterEach(function () {
        jasmine.clock().uninstall();
    });
});
