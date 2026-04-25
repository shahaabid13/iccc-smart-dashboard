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
  logout() {
    localStorage.clear();
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
//# sourceMappingURL=chunk-QHHSFO4U.js.map
