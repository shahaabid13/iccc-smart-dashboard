import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PbsStationsComponent } from './pbs-stations.component';
import { CharteredBikeService } from '../../../services/chartered-bike.service';
import {
  CharteredBikeLoginResponse,
  CharteredBikeStationResponse,
} from '../../../models/chartered-bike';
import { of, throwError } from 'rxjs';

describe('PbsStationsComponent', () => {
  let component: PbsStationsComponent;
  let fixture: ComponentFixture<PbsStationsComponent>;
  let charteredBikeService: jasmine.SpyObj<CharteredBikeService>;

  const mockLoginResponse: CharteredBikeLoginResponse = {
    data: {
      userId: 589380,
      firstName: 'SSCL',
      emailId: 'test@example.com',
      token: 'mock_token_xyz',
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
          {
            stationName: 'Dal Lake',
            stationNumber: 3077,
            latitude: '34.1250',
            longitude: '74.8850',
            active: true,
            bikesAvailable: 3,
            bikesTotal: 10,
            bikesRack: 12,
            bikesFree: 2,
            ebikesAvailable: 1,
            reportActiveBikes: 3,
            reportInactiveBikes: 1,
            reportOnTripBikes: 2,
            stolenBikes: 0,
            missingBikes: 0,
            bikeNumberList: [98500, 98501],
            ecoBikeNumberList: [98502],
            ebikeNumberList: [],
            cityName: 'Srinagar',
            cityId: 14,
          },
        ],
      },
    ],
    status: 200,
    message: 'Success',
  };

  beforeEach(async () => {
    const charteredBikeSpy = jasmine.createSpyObj('CharteredBikeService', [
      'login',
      'getStations',
      'logout',
      'clearError',
    ]);
    charteredBikeSpy.isAuthenticated$ = of(false);
    charteredBikeSpy.loading$ = of(false);
    charteredBikeSpy.error$ = of(null);
    charteredBikeSpy.isAuthenticated.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [
        PbsStationsComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: CharteredBikeService, useValue: charteredBikeSpy },
      ],
    }).compileComponents();

    charteredBikeService = TestBed.inject(
      CharteredBikeService
    ) as jasmine.SpyObj<CharteredBikeService>;
    fixture = TestBed.createComponent(PbsStationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should authenticate and load stations on init', () => {
    charteredBikeService.login.and.returnValue(of(mockLoginResponse));
    charteredBikeService.getStations.and.returnValue(of(mockStationResponse));
    charteredBikeService.isAuthenticated$ = of(true);

    component.ngOnInit();

    expect(charteredBikeService.login).toHaveBeenCalled();
  });

  it('should fetch stations successfully', (done) => {
    charteredBikeService.getStations.and.returnValue(of(mockStationResponse));
    component['fetchStations']();

    setTimeout(() => {
      expect(component.allStations.length).toBe(2);
      expect(component.companyName).toBe('Chartered Bike Srinagar');
      expect(component.primaryColor).toBe('#00844A');
      done();
    }, 100);
  });

  it('should apply minBikes filter correctly', () => {
    component.allStations = [
      {
        ...mockStationResponse.data[0].mapStationDTOs[0],
        statusColor: '#4CAF50',
        statusLabel: 'Available',
        availabilityPercentage: 89,
      },
      {
        ...mockStationResponse.data[0].mapStationDTOs[1],
        statusColor: '#FF9800',
        statusLabel: 'Low Stock',
        availabilityPercentage: 30,
      },
    ];

    component.minBikesFilter = 5;
    component.applyFilters();

    expect(component.filteredStations.length).toBe(1);
    expect(component.filteredStations[0].stationName).toBe('Nishat Satu');
  });

  it('should apply search filter correctly', () => {
    component.allStations = [
      {
        ...mockStationResponse.data[0].mapStationDTOs[0],
        statusColor: '#4CAF50',
        statusLabel: 'Available',
        availabilityPercentage: 89,
      },
      {
        ...mockStationResponse.data[0].mapStationDTOs[1],
        statusColor: '#FF9800',
        statusLabel: 'Low Stock',
        availabilityPercentage: 30,
      },
    ];

    component.searchQuery = 'Dal';
    component.applyFilters();

    expect(component.filteredStations.length).toBe(1);
    expect(component.filteredStations[0].stationName).toBe('Dal Lake');
  });

  it('should handle login error gracefully', (done) => {
    const error = { status: 401, message: 'Unauthorized' };
    charteredBikeService.login.and.returnValue(throwError(() => error));

    component['authenticate']();

    setTimeout(() => {
      expect(component.isLoading).toBe(false);
      done();
    }, 100);
  });

  it('should calculate stats correctly', () => {
    component.allStations = [
      {
        ...mockStationResponse.data[0].mapStationDTOs[0],
        statusColor: '#4CAF50',
        statusLabel: 'Available',
        availabilityPercentage: 89,
      },
      {
        ...mockStationResponse.data[0].mapStationDTOs[1],
        statusColor: '#FF9800',
        statusLabel: 'Low Stock',
        availabilityPercentage: 30,
      },
    ];

    expect(component.getTotalBikesAvailable()).toBe(11);
    expect(component.getTotalBikes()).toBe(19);
    expect(component.getActiveStationsCount()).toBe(2);
  });

  it('should logout and clear data', () => {
    component.allStations = mockStationResponse.data[0].mapStationDTOs;
    component.companyName = 'Test Company';
    component.logout();

    expect(charteredBikeService.logout).toHaveBeenCalled();
    expect(component.allStations.length).toBe(0);
    expect(component.companyName).toBe('');
  });

  it('should refresh data', () => {
    charteredBikeService.getStations.and.returnValue(of(mockStationResponse));
    component.refreshData();

    expect(charteredBikeService.clearError).toHaveBeenCalled();
  });

  it('should enrich station with UI properties', () => {
    const station = mockStationResponse.data[0].mapStationDTOs[0];
    const enriched = component['enrichStation'](station);

    expect(enriched.availabilityPercentage).toBe(89);
    expect(enriched.statusColor).toBe('#4CAF50');
    expect(enriched.statusLabel).toBe('Available');
  });

  it('should handle empty stations response', (done) => {
    const emptyResponse: CharteredBikeStationResponse = {
      data: [],
      status: 200,
      message: 'Success',
    };
    charteredBikeService.getStations.and.returnValue(of(emptyResponse));

    component['fetchStations']();

    setTimeout(() => {
      expect(component.allStations.length).toBe(0);
      done();
    }, 100);
  });
});
