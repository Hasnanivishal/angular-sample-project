import { TestBed } from '@angular/core/testing';
import { GuestUserService } from './guest-user.service';
import { of } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('GuestUserService', () => {

    let service: GuestUserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GuestUserService]
        });
        service = TestBed.get(GuestUserService);
        httpMock = TestBed.get(HttpTestingController);
    });


    it('should get User data when called getData()', () => {
        const userData = of({ data: { firstname: 'ABC', lastname: 'XYZ', username: 'ABC@XYZ' } });
        service.getData().subscribe((res) => {
            expect(res).toEqual(userData);
        });
        const req = httpMock.expectOne(service.baseUrl + 'userInfo/getData');
        expect(req.request.method).toEqual('GET');
        req.flush(userData);
        httpMock.verify();
    });

    it('should register user when called create()', () => {
        const userRegistrationData = { firstname: 'ABC', lastname: 'XYZ', username: 'ABC@XYZ', password: '123!@#$%abc' };
        const resgistrationResponse = of({ data: { message: 'Created Successfully' } });
        service.create(userRegistrationData).subscribe((res) => {
            expect(res).toEqual(resgistrationResponse);
        });
        const req = httpMock.expectOne(service.baseUrl + 'account/register');
        expect(req.request.method).toEqual('POST');
        req.flush(resgistrationResponse);
        httpMock.verify();
    });

    it('should logged In user when called login()', () => {
        const userLoginData = { username: 'ABC@XYZ', password: '123!@#$%abc' };
        const loginResponse = of({ data: { token: 'abcdefgh123%!@#' } });
        service.login(userLoginData).subscribe((res) => {
            expect(res).toEqual(loginResponse);
        });
        const req = httpMock.expectOne(service.baseUrl + 'account/login');
        expect(req.request.method).toEqual('POST');
        req.flush(loginResponse);
        httpMock.verify();
    });

    it('should update user details when called update()', () => {
        const userData = { firstname: 'XYZ', lastname: 'ABC' };
        const updateResponse = of({ data: { firstname: 'XYZ', lastname: 'ABC' } });
        service.update(userData).subscribe((res) => {
            expect(res).toEqual(updateResponse);
        });
        const req = httpMock.expectOne(service.baseUrl + 'userInfo/update');
        expect(req.request.method).toEqual('POST');
        req.flush(updateResponse);
        httpMock.verify();
    });
});
