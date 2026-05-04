import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CharteredBikeService } from './chartered-bike.service';
import {
  CharteredBikeLoginResponse,
  CharteredBikeStationResponse,
} from '../models/chartered-bike';

describe('CharteredBikeService', () => {
  let service: CharteredBikeService;
  let httpMock: HttpTestingController;

  const mockLoginResponse: CharteredBikeLoginResponse = {
    data: {
      userId: 589380,
      firstName: 'SSCL',
      emailId: 'sscl@srinagarsmartcity.in',
      token: 'mock_jwt_token_xyz',
      refreshToken: 'mock_refresh_token',
      cityId: 14,
      userRole: 'ROLE_THIRD_PARTY',
      tokenExpiryTime: 1800,
    },
    status: 200,
    message: 'Success',
  };

  const mockStationResponse: CharteredBikeStationResponse = {
    data: [
      {
        companyName: 'Chartered Bike Srinagar',
        primaryColor: '#00844A',
        mapStationDTOs: [
          {
            stationName: 'Nishat Satu',
            stationNumber: 3076,
            latitude: '34.1199453',
            longitude: '74.8800150',
            active: true,
            bikesAvailable: 8,
            bikesTotal: 9,
            bikesRack: 10,
            bikesFree: 8,
            ebikesAvailable: 0,
            reportActiveBikes: 8,
            reportInactiveBikes: 0,
            reportOnTripBikes: 1,
            stolenBikes: 0,
            missingBikes: 0,
            bikeNumberList: [98505, 98695, 98027],
            ecoBikeNumberList: [98505, 98695],
            ebikeNumberList: [98718],
            cityName: 'Srinagar',
            cityId: 14,
          },
        ],
      },
    ],
    status: 200,
    message: 'Success',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharteredBikeService],
    });

    service = TestBed.inject(CharteredBikeService);
    httpMock = TestBed.inject(HttpTestingController);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login()', () => {
    it('should send correct parameters and return login response', (done) => {
      service.login().subscribe((response) => {
        expect(response).toEqual(mockLoginResponse);
        expect(response.data.token).toBe('mock_jwt_token_xyz');
        done();
      });

      const req = httpMock.expectOne((request) => {
        return (
          request.url.includes('/auth/admin-login') &&
          request.params.get('userName') === 'SSCL' &&
          request.params.get('password') === '209107'
        );
      });
      expect(req.request.method).toBe('GET');
      req.flush(mockLoginResponse);
    });

    it('should store token in localStorage on successful login', (done) => {
      service.login().subscribe(() => {
        expect(localStorage.getItem('chartered_bike_token')).toBe(
          'mock_jwt_token_xyz'
        );
        done();
      });

      const req = httpMock.expectOne((request) =>
        request.url.includes('/auth/admin-login')
      );
      req.flush(mockLoginResponse);
    });

    it('should update isAuthenticated$ on successful login', (done) => {
      service.isAuthenticated$.subscribe((isAuth) => {
        if (isAuth) {
          expect(isAuth).toBe(true);
          done();
        }
      });

      service.login().subscribe(() => {});

      const req = httpMock.expectOne((request) =>
        request.url.includes('/auth/admin-login')
      );
      req.flush(mockLoginResponse);
    });

    it('should handle login error', (done) => {
      const errorResponse = { status: 401, message: 'Invalid credentials' };

      service.error$.subscribe((error) => {
        if (error) {
          expect(error).toContain('Authentication failed');
          done();
        }
      });

      service.login().subscribe(
        () => {
          fail('should have failed');
        },
        () => {
          // Error is expected
        }
      );

      const req = httpMock.expectOne((request) =>
        request.url.includes('/auth/admin-login')
      );
      req.flush(errorResponse, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('getStations()', () => {
    beforeEach(() => {
      // Store token before testing getStations
      localStorage.setItem('chartered_bike_token', 'mock_jwt_token_xyz');
      service['isAuthenticatedSubject'].next(true);
    });

    it('should fetch stations with Bearer token', (done) => {
      service.getStations().subscribe((response) => {
        expect(response).toEqual(mockStationResponse);
        done();
      });

      const req = httpMock.expectOne((request) => {
        return (
          request.url.includes('/stations/show-stations-on-map/open') &&
          request.headers.get('Authorization') === 'Bearer mock_jwt_token_xyz' &&
          request.params.get('domain') === 'asia' &&
          request.params.get('companyregionid') === '16'
        );
      });
      expect(req.request.method).toBe('GET');
      req.flush(mockStationResponse);
    });

    it('should handle 401 error and logout', (done) => {
      service.getStations().subscribe(
        () => {
          fail('should have failed');
        },
        () => {
          // Error is expected
        }
      );

      const req = httpMock.expectOne((request) =>
        request.url.includes('/stations/show-stations-on-map/open')
      );
      req.flush({ message: 'Unauthorized' }, {
        status: 401,
        statusText: 'Unauthorized',
      });

      setTimeout(() => {
        expect(localStorage.getItem('chartered_bike_token')).toBeNull();
        done();
      }, 100);
    });

    it('should return error if no token is available', (done) => {
      localStorage.clear();
      service['isAuthenticatedSubject'].next(false);

      service.getStations().subscribe(
        () => {
          fail('should have failed');
        },
        () => {
          // Error is expected
          done();
        }
      );
    });
  });

  describe('Token Management', () => {
    it('should store and retrieve token', () => {
      const token = 'test_token_123';
      service['storeToken'](token);

      expect(service.getToken()).toBe(token);
    });

    it('should store and retrieve login data', () => {
      const loginData = mockLoginResponse.data;
      service['storeLoginData'](loginData);

      const retrieved = service.getLoginData();
      expect(retrieved).toEqual(loginData);
      expect(retrieved?.userId).toBe(589380);
    });

    it('should return null if no token exists', () => {
      localStorage.clear();
      expect(service.getToken()).toBeNull();
    });

    it('should return null if no login data exists', () => {
      localStorage.clear();
      expect(service.getLoginData()).toBeNull();
    });
  });

  describe('logout()', () => {
    beforeEach(() => {
      localStorage.setItem('chartered_bike_token', 'mock_token');
      localStorage.setItem(
        'chartered_bike_login',
        JSON.stringify(mockLoginResponse.data)
      );
      service['isAuthenticatedSubject'].next(true);
    });

    it('should clear token and login data from localStorage', () => {
      service.logout();

      expect(localStorage.getItem('chartered_bike_token')).toBeNull();
      expect(localStorage.getItem('chartered_bike_login')).toBeNull();
    });

    it('should update isAuthenticated$ to false', (done) => {
      service.logout();

      service.isAuthenticated$.subscribe((isAuth) => {
        if (!isAuth) {
          expect(isAuth).toBe(false);
          done();
        }
      });
    });
  });

  describe('Authentication Status', () => {
    it('should return correct authentication status', () => {
      localStorage.clear();
      expect(service.isAuthenticated()).toBe(false);

      localStorage.setItem('chartered_bike_token', 'mock_token');
      // Create new service instance to check token on init
      const newService = new CharteredBikeService(
        TestBed.inject(HttpClientTestingModule)
      );
      expect(newService.getToken()).toBe('mock_token');
    });
  });

  describe('Error Handling', () => {
    it('should emit error messages', (done) => {
      service.error$.subscribe((error) => {
        if (error) {
          expect(error).toBe('Test error message');
          done();
        }
      });

      service['handleError']('Test error message');
    });

    it('should clear errors', (done) => {
      service['handleError']('Test error');

      service.error$.subscribe((error) => {
        if (error === null) {
          expect(error).toBeNull();
          done();
        }
      });

      service.clearError();
    });
  });
});
