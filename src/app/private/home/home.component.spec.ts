import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GuestUserService } from 'src/app/service/guest-user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HomePageListingComponent } from '../home-page-listing/home-page-listing.component';
import { MockComponent } from 'ng-mocks';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let guestUserService: any;
    let guestUserServiceSpy: any;

    beforeEach(async(() => {
        guestUserService = jasmine.createSpyObj('GuestUserService', ['getData']);

        TestBed.configureTestingModule({
            declarations: [HomeComponent, MockComponent(HomePageListingComponent)],
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

    it('should contain child component home-page-list', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-home-page-listing')).toBeTruthy();
    });

    it('should send/recive data to child component using @Input/@Output', () => {
        component.selectedApi = 'SetUp';
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.css('app-home-page-listing'));
        expect(element).toBeTruthy();
        const child: HomePageListingComponent = element.componentInstance;
        expect(child.selectedApi).toBe('SetUp');

        child.removeApi.emit('Architecture');
        expect(component.apiList).not.toContain('Architecture');
        expect(component.selectedApi).toEqual('Introduction');
        fixture.detectChanges();
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
        let baseTime = new Date(2019, 9, 23, 11, 59, 59);
        jasmine.clock().mockDate(baseTime);
        fixture.detectChanges();
        component.getGreetingMessage();
        expect(component.time).toEqual('Morning');

        baseTime = new Date(2019, 9, 23, 17, 59, 59);
        jasmine.clock().mockDate(baseTime);
        fixture.detectChanges();
        component.getGreetingMessage();
        expect(component.time).toEqual('Afternoon');


        baseTime = new Date(2019, 9, 23, 19, 59, 59);
        jasmine.clock().mockDate(baseTime);
        fixture.detectChanges();
        component.getGreetingMessage();
        expect(component.time).toEqual('Evening');
    });

    it('should render thr list of items present in apiList', () => {
        component.apiList = ['A', 'B', 'C', 'D'];
        fixture.detectChanges();
        const buttonA = fixture.debugElement.query(By.css('.list-group-item-action0'));
        expect(buttonA).toBeDefined();
        expect(buttonA.nativeElement.textContent).toEqual('A ');
    });

    it('should render active class on the selected item from list', () => {
        component.apiList = ['ABC', 'DEF', 'GHI', 'JKL'];
        component.selectedApi = 'GHI';
        fixture.detectChanges();
        const buttonA = fixture.debugElement.query(By.css('.list-group-item-action2'));
        expect(buttonA).toBeDefined();
        expect(buttonA.nativeElement.classList).toContain('active');
    });

    it('should set the selectedAPI value when listClicked function is called', () => {
        component.apiList = ['ABC', 'DEF', 'GHI', 'JKL'];
        component.listClick(null, 'JKL');
        expect(component.selectedApi).toEqual('JKL');
    });

    it('should remove the selectedAPI from List when removeSelectedApi function is called', () => {
        component.apiList = ['Introduction', 'DEF', 'GHI', 'JKL'];
        component.removeSelectedApi('GHI');
        expect(component.apiList).not.toContain('GHI');
        expect(component.selectedApi).toEqual('Introduction');
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });
});
