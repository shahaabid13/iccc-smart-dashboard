import {
  BehaviorSubject,
  HttpClient,
  Injectable,
  catchError,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WPHUMBF2.js";

// src/app/services/parkadda-auth.service.ts
var ParkaddaAuthService = class _ParkaddaAuthService {
  http;
  baseUrl = "/api";
  parkaddaTokenSubject = new BehaviorSubject(this.getParkaddaToken());
  parkaddaToken$ = this.parkaddaTokenSubject.asObservable();
  parkaddaMobileSubject = new BehaviorSubject(this.getParkaddaMobile());
  parkaddaMobile$ = this.parkaddaMobileSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  /**
   * Admin login for Parkadda - obtains Bearer token
   * @param mobile Admin mobile number
   * @param password Admin password
   * @returns Observable with access token
   */
  adminLogin(mobile, password) {
    const loginRequest = { mobile, password };
    return this.http.post(`${this.baseUrl}/user/admin-login/`, loginRequest).pipe(tap((response) => {
      this.setParkaddaToken(response.access_token);
      this.setParkaddaMobile(mobile);
    }), catchError((error) => {
      console.error("Parkadda admin login failed:", error);
      return throwError(() => new Error("Admin login failed. Please check credentials."));
    }));
  }
  /**
   * Get stored Parkadda token
   */
  getParkaddaToken() {
    return localStorage.getItem("parkadda_token");
  }
  /**
   * Set Parkadda token in localStorage
   */
  setParkaddaToken(token) {
    localStorage.setItem("parkadda_token", token);
    this.parkaddaTokenSubject.next(token);
  }
  /**
   * Get stored Parkadda mobile
   */
  getParkaddaMobile() {
    return localStorage.getItem("parkadda_mobile");
  }
  /**
   * Set Parkadda mobile in localStorage
   */
  setParkaddaMobile(mobile) {
    localStorage.setItem("parkadda_mobile", mobile);
    this.parkaddaMobileSubject.next(mobile);
  }
  /**
   * Check if user is logged into Parkadda
   */
  isParkaddaLoggedIn() {
    return !!this.getParkaddaToken();
  }
  /**
   * Check if user is authenticated (alias for isParkaddaLoggedIn)
   */
  isParkaddaAuthenticated() {
    return this.isParkaddaLoggedIn();
  }
  /**
   * Logout from Parkadda
   */
  logout() {
    localStorage.removeItem("parkadda_token");
    localStorage.removeItem("parkadda_mobile");
    this.parkaddaTokenSubject.next(null);
    this.parkaddaMobileSubject.next(null);
  }
  /**
   * Logout from Parkadda (alias)
   */
  parkaddaLogout() {
    this.logout();
  }
  static \u0275fac = function ParkaddaAuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ParkaddaAuthService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ParkaddaAuthService, factory: _ParkaddaAuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ParkaddaAuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ParkaddaAuthService
};
//# sourceMappingURL=chunk-BWDQ2XAU.js.map
