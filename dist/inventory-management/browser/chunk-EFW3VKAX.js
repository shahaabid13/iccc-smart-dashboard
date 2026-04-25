import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WPHUMBF2.js";

// src/app/services/api.service.ts
var ApiService = class _ApiService {
  http;
  baseUrl = "/api";
  // 🔹 Update if your backend URL changes
  constructor(http) {
    this.http = http;
  }
  /**
   * 🔹 GET request for JSON responses
   */
  get(endpoint, params, p0) {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get(`${this.baseUrl}${endpoint}`, { params: httpParams });
  }
  /**
   * 🔹 POST request for JSON data
   */
  post(url, body, params) {
    return this.http.post(`${this.baseUrl}${url}`, body, { params });
  }
  /**
   * 🔹 PUT request for updating data
   */
  put(endpoint, body) {
    return this.http.put(`${this.baseUrl}${endpoint}`, body, this.jsonHeaders());
  }
  /**
   * 🔹 DELETE request
   */
  delete(endpoint) {
    return this.http.delete(`${this.baseUrl}${endpoint}`);
  }
  /**
   * 🔹 GET request for file download (Excel / PDF / Word)
   * Automatically handles Blob responses.
   */
  getFile(endpoint, params) {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get(`${this.baseUrl}${endpoint}`, {
      params: httpParams,
      responseType: "blob"
    });
  }
  /**
   * 🔹 Common JSON headers helper
   */
  jsonHeaders() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
  }
  static \u0275fac = function ApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ApiService
};
//# sourceMappingURL=chunk-EFW3VKAX.js.map
