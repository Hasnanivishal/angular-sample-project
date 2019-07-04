import { TestBed, async, ComponentFixture, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GuestUserService } from './service/guest-user.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let service: GuestUserService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatProgressSpinnerModule,
                BrowserAnimationsModule,
                HttpClientModule
            ],
            providers: [GuestUserService],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        service = TestBed.get(GuestUserService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain router outlet', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('router-outlet')).toBeTruthy();
    });

    it('should render loader', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.loader'))).toBeNull();
        service.isLoading.next(true);
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.loader'))).toBeDefined();
        service.isLoading.next(false);
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.loader'))).toBeNull();
    });
});
