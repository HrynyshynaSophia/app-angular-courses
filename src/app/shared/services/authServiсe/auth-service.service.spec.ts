import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth-service.service';
describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in a user', () => {
    const login = 'flastname';
    const password = 'flastname';
    const tokenResponse = { token: '58ebfdf7f1f558c5c86e17f6' };
    service.login(login, password);
    const loginRequest = httpTestingController.expectOne(
      'http://localhost:3004/auth/login'
    );
    expect(loginRequest.request.method).toBe('POST');
    loginRequest.flush(tokenResponse);
    service.authChanged.subscribe((authStatus) => {
      expect(authStatus).toBe(true);
    });
    expect(localStorage.getItem('token')).toBe(tokenResponse.token);
  });
  it('should handle a login error', () => {
    const login = 'flastname';
    const password = 'flastname';
    const errorResponse = { message: 'Invalid credentials' };
    service.login(login, password);
    const loginRequest = httpTestingController.expectOne(
      'http://localhost:3004/auth/login'
    );
    expect(loginRequest.request.method).toBe('POST');
    loginRequest.flush(errorResponse, {
      status: 401,
      statusText: 'Unauthorized',
    });
    service.authChanged.subscribe((authStatus) => {
      expect(authStatus).toBe(false);
    });
    service.user.subscribe(() => {
      fail('getUserInfo should not emit in case of an error');
    });
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should log out a user', () => {
    localStorage.setItem('token', 'fake-auth-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeFalsy();
    service.authChanged.subscribe((status) => {
      expect(status).toBe(false);
    });
  });
  it('should return false if user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const isAuthenticated = service.isAuthenticated();
  });
  it('should get user info', () => {
    const token = 'fake-token';
    const userInfoResponse = {
      id: '1',
      name: {
        first: 'FirstName',
        last: 'LastName',
      },
      login: 'flastname',
      password: 'flastname',
    };
    service.getUserInfo().subscribe((user) => {
      expect(user).toEqual(userInfoResponse);
      const userInfoRequest = httpTestingController.expectOne(
        'http://localhost:3004/auth/userInfo'
      );
      expect(userInfoRequest.request.method).toBe('POST');
      expect(userInfoRequest.request.body).toEqual({ token });
      userInfoRequest.flush(userInfoResponse);
    });
    service.user.subscribe((user) => {
      expect(user).toEqual(userInfoResponse);
    });
  });
  it('should handle user info error', () => {
    const errorResponse = { message: 'Unauthorized' };

    service.getUserInfo().subscribe(
      () => {
        fail('getUserInfo should not emit in case of an error');
      },
      (error) => {
        expect(error.error).toEqual(errorResponse);
      }
    );
    const userInfoRequest = httpTestingController.expectOne(
      'http://localhost:3004/auth/userInfo'
    );
    userInfoRequest.flush(errorResponse, {
      status: 401,
      statusText: 'Unauthorized',
    });
  });
});
