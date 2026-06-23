import {
  HttpClient
} from "./chunk-6LIGNQX5.js";
import {
  BehaviorSubject,
  Injectable,
  catchError,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-OXNL7LB6.js";

// src/app/services/auth.service.ts
var AuthService = class _AuthService {
  http;
  isAgency() {
    throw new Error("Method not implemented.");
  }
  getUserAgency() {
    throw new Error("Method not implemented.");
  }
  getUserRole() {
    throw new Error("Method not implemented.");
  }
  resetPassword(email, newPassword) {
    throw new Error("Method not implemented.");
  }
  verifyEmail(email) {
    throw new Error("Method not implemented.");
  }
  /** ------------------------
   * API BASE URL
   * ------------------------- */
  apiUrl = "/api/auth";
  // ✅ Spring Boot backend
  /** ------------------------
   * USER STATE MANAGEMENT
   * ------------------------- */
  currentUserSubject = new BehaviorSubject(null);
  currentUser$ = this.currentUserSubject.asObservable();
  constructor(http) {
    this.http = http;
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }
  /** ------------------------
   * LOGIN FUNCTION (from backend)
   * ------------------------- */
  login(username, password) {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(tap((res) => {
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("username", res.username);
      const user = {
        id: res.username,
        username: res.username,
        email: `${res.username}@app.local`,
        role: res.role
      };
      this.setCurrentUser(user);
    }), catchError((err) => {
      console.error("Login failed:", err);
      return throwError(() => err);
    }));
  }
  /** ------------------------
   * REGISTER FUNCTION (if backend supports it)
   * ------------------------- */
  register(user) {
    return this.http.post(`${this.apiUrl}/create`, user).pipe(tap((res) => {
      if (res?.token)
        this.setToken(res.token);
      if (res?.user)
        this.setCurrentUser(res.user);
    }), catchError((err) => {
      console.error("Registration error:", err);
      return throwError(() => err);
    }));
  }
  /** ------------------------
   * LOGOUT FUNCTION
   * ------------------------- */
  // ✅ FIX - Only clear admin-specific keys
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
  /** ------------------------
   * TOKEN + ROLE MANAGEMENT
   * ------------------------- */
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  setRole(role) {
    localStorage.setItem("role", role);
  }
  getRole() {
    return localStorage.getItem("role");
  }
  getAgencyName() {
    return localStorage.getItem("agencyName");
  }
  /** ------------------------
   * USER STATE MANAGEMENT
   * ------------------------- */
  isAuthenticated() {
    return !!this.getToken();
  }
  isAdmin() {
    return this.getRole()?.toLowerCase() === "admin";
  }
  getCurrentUser() {
    return this.currentUserSubject.value;
  }
  setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  /**
   * DEVELOPMENT ONLY: Auto-generate a test token for development/testing
   * This bypasses the need to login to test the weighbridge module
   */
  initializeDevToken() {
    if (!this.getToken()) {
      const devToken = "dev-test-token-" + Date.now();
      localStorage.setItem("token", devToken);
      localStorage.setItem("role", "admin");
      console.log("\u2705 [DEV] Test token created for weighbridge testing");
      console.log("   Token:", devToken);
    }
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-X53ASRZJ.js.map
