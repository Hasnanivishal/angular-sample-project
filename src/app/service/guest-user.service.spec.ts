import { TestBed } from '@angular/core/testing';

import { GuestUserService } from './guest-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('GuestUserService', () => {

    let httpClientSpy: { get: jasmine.Spy };
    let service: GuestUserService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new GuestUserService(<any>httpClientSpy);
    });

    it('should return an error when the server returns a 404', () => {
        
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not Found'
        });

        httpClientSpy.get.and.returnValue(of(errorResponse));

        service.getData().subscribe(
            heroes => fail('expected an error, not heroes'),
            error => expect(error.message).toContain('test 404 error')
        );
    });
});
