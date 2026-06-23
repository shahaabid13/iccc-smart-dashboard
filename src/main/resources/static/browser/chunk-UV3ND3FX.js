import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from "./chunk-6LIGNQX5.js";
import {
  BehaviorSubject,
  Injectable,
  catchError,
  retry,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OXNL7LB6.js";

// src/app/services/chartered-bike.service.ts
var CharteredBikeService = class _CharteredBikeService {
  http;
  baseUrl = "https://api.charteredbike.in/api/v1";
  tokenKey = "chartered_bike_token";
  loginDataKey = "chartered_bike_login";
  // BehaviorSubjects for reactive state management
  isAuthenticatedSubject = new BehaviorSubject(this.isTokenValid());
  loadingSubject = new BehaviorSubject(false);
  errorSubject = new BehaviorSubject(null);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  constructor(http) {
    this.http = http;
    this.checkTokenOnInit();
  }
  /**
   * Check if token is valid on service initialization
   */
  checkTokenOnInit() {
    const token = this.getToken();
    const loginData = this.getLoginData();
    if (token && loginData) {
      this.isAuthenticatedSubject.next(true);
    }
  }
  /**
   * Authenticate with Chartered Bike API
   * Credentials are hardcoded as per API spec (SSCL / 209107)
   */
  login() {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    const params = new HttpParams().set("userName", "SSCL").set("password", "209107");
    return this.http.get(`${this.baseUrl}/auth/admin-login`, { params }).pipe(tap((response) => {
      if (response.status === 200 && response.data?.token) {
        this.storeToken(response.data.token);
        this.storeLoginData(response.data);
        this.isAuthenticatedSubject.next(true);
        this.loadingSubject.next(false);
      }
    }), catchError((error) => {
      this.handleError("Authentication failed. Please try again.", error);
      return throwError(() => error);
    }));
  }
  /**
   * Fetch all bike stations from the API
   * Requires valid JWT token
   */
  getStations() {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    const token = this.getToken();
    if (!token) {
      this.handleError("Not authenticated. Please login first.");
      return throwError(() => new Error("No token available"));
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    const params = new HttpParams().set("domain", "asia").set("companyregionid", "16");
    return this.http.get(`${this.baseUrl}/stations/show-stations-on-map/open`, { headers, params }).pipe(
      retry(1),
      // Retry once on failure
      tap((response) => {
        if (response.status === 200) {
          this.loadingSubject.next(false);
        }
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.logout();
          this.handleError("Session expired. Please login again.");
        } else {
          this.handleError("Failed to fetch stations. Please try again.", error);
        }
        this.loadingSubject.next(false);
        return throwError(() => error);
      })
    );
  }
  /**
   * Store JWT token in localStorage
   */
  storeToken(token) {
    try {
      localStorage.setItem(this.tokenKey, token);
    } catch (error) {
      console.error("Failed to store token:", error);
    }
  }
  /**
   * Retrieve JWT token from localStorage
   */
  getToken() {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch (error) {
      console.error("Failed to retrieve token:", error);
      return null;
    }
  }
  /**
   * Store login data (user info) in localStorage
   */
  storeLoginData(data) {
    try {
      localStorage.setItem(this.loginDataKey, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to store login data:", error);
    }
  }
  /**
   * Retrieve login data from localStorage
   */
  getLoginData() {
    try {
      const data = localStorage.getItem(this.loginDataKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to retrieve login data:", error);
      return null;
    }
  }
  /**
   * Check if token exists and is valid
   */
  isTokenValid() {
    return !!this.getToken();
  }
  /**
   * Logout: Clear all stored data
   */
  logout() {
    try {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.loginDataKey);
      this.isAuthenticatedSubject.next(false);
      this.errorSubject.next(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }
  /**
   * Handle errors and emit to error subject
   */
  handleError(message, error) {
    console.error(message, error);
    this.errorSubject.next(message);
    this.loadingSubject.next(false);
  }
  /**
   * Clear error message
   */
  clearError() {
    this.errorSubject.next(null);
  }
  /**
   * Get current authentication status synchronously
   */
  isAuthenticated() {
    return this.isAuthenticatedSubject.value;
  }
  static \u0275fac = function CharteredBikeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CharteredBikeService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CharteredBikeService, factory: _CharteredBikeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CharteredBikeService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  CharteredBikeService
};
//# sourceMappingURL=chunk-UV3ND3FX.js.map
