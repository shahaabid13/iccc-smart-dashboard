import {
  HttpClient,
  Injectable,
  catchError,
  map,
  of,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-WPHUMBF2.js";

// src/app/services/smc.service.ts
var SmcService = class _SmcService {
  http;
  getMonthlyNetTrend;
  getMonthlyGrossWeight;
  getMonthlyGrossTrend(wbId) {
    throw new Error("Method not implemented.");
  }
  // Updated API base URL for the new endpoint
  baseUrl = "/api/weighbridge";
  constructor(http) {
    this.http = http;
  }
  /**
   * Get all weighbridge data for a specific WB ID
   */
  getAllWeighbridgeData(wbId) {
    const url = `${this.baseUrl}/report/data/all/${wbId}`;
    return this.http.get(url).pipe(tap((response) => console.log("\u{1F535} Raw API Response:", response)), map((response) => {
      let dataArray = [];
      if (Array.isArray(response)) {
        dataArray = response;
      } else if (response && typeof response === "object") {
        if (Array.isArray(response.data)) {
          dataArray = response.data;
        } else if (Array.isArray(response.records)) {
          dataArray = response.records;
        } else if (Array.isArray(response.result)) {
          dataArray = response.result;
        } else if (Array.isArray(response.items)) {
          dataArray = response.items;
        } else if (response && typeof response === "object" && !Array.isArray(response)) {
          dataArray = [response];
        }
      }
      console.log("\u2705 Parsed Data Array:", dataArray?.length || 0, "records");
      if (dataArray.length > 0) {
        console.log("\u{1F4CA} Sample record:", dataArray[0]);
      }
      return dataArray || [];
    }), catchError((error) => {
      console.error("\u274C API Error:", error);
      console.warn("\u26A0\uFE0F Using fallback data");
      return of(this.getFallbackData());
    }));
  }
  // Add these methods to your SmcService class
  getNetTrend(wbId, startDate, endDate) {
    return this.http.get(`${this.baseUrl}/report/trend/net/${wbId}`).pipe(map((data) => {
      return Array.isArray(data) ? data.map((item) => ({
        dateTime: item.dateTime || item.date || item.timestamp,
        netWeight: item.netWeight || item.weight || 0
      })) : [];
    }), catchError((error) => {
      console.error("Error fetching net trend:", error);
      return of(this.getMockTrendData("Net Weight"));
    }));
  }
  getGrossTrend(wbId, startDate, endDate) {
    return this.http.get(`${this.baseUrl}/report/trend/gross/${wbId}`).pipe(map((data) => {
      return Array.isArray(data) ? data.map((item) => ({
        dateTime: item.dateTime || item.date || item.timestamp,
        grossWeight: item.grossWeight || item.weight || 0
      })) : [];
    }), catchError((error) => {
      console.error("Error fetching gross trend:", error);
      return of(this.getMockTrendData("Gross Weight"));
    }));
  }
  getVehicleTrend(wbId) {
    return this.http.get(`${this.baseUrl}/report/trend/vehicle/${wbId}`).pipe(map((data) => {
      return Array.isArray(data) ? data.map((vehicle) => ({
        vehicleNo: vehicle.vehicleNo || vehicle.vno || "Vehicle",
        data: Array.isArray(vehicle.data) ? vehicle.data.map((item) => ({
          dateTime: item.dateTime || item.date || item.timestamp,
          netWeight: item.netWeight || item.weight || 0
        })) : []
      })) : [];
    }), catchError((error) => {
      console.error("Error fetching vehicle trend:", error);
      return of(this.getMockVehicleData());
    }));
  }
  getLast24Trend(wbId) {
    return this.http.get(`${this.baseUrl}/report/trend/last24/${wbId}`).pipe(map((data) => {
      return Array.isArray(data) ? data.map((item) => ({
        dateTime: item.dateTime || item.date || item.timestamp,
        weight: item.netWeight || item.weight || 0
      })) : [];
    }), catchError((error) => {
      console.error("Error fetching last 24 trend:", error);
      return of(this.getMockTrendData("Last 24 Hours"));
    }));
  }
  getTimeframeData(request) {
    return this.http.post(`${this.baseUrl}/timeframe/data`, request).pipe(catchError((error) => {
      console.error("Error fetching timeframe data:", error);
      return of(this.getMockTimeframeData());
    }));
  }
  getMonthlyWeightData(wbId, type, startDate, endDate) {
    const params = { wbId, type, startDate, endDate };
    return this.http.get(`${this.baseUrl}/report/monthly/${type}`, { params }).pipe(map((data) => {
      return Array.isArray(data) ? data : [];
    }), catchError((error) => {
      console.error(`Error fetching monthly ${type} weight:`, error);
      return of([]);
    }));
  }
  getLast24HoursData(wbId) {
    return this.http.get(`${this.baseUrl}/report/last24/${wbId}`).pipe(map((data) => {
      return Array.isArray(data) ? data : [];
    }), catchError((error) => {
      console.error("Error fetching last 24 hours data:", error);
      return of([]);
    }));
  }
  getSummary(start, end, wbId) {
    const params = { start, end, wbId };
    const url = `${this.baseUrl}/report/summary/day`;
    console.log("\u{1F535} API Request - getSummary:", { url, params });
    return this.http.get(url, { params }).pipe(tap((data) => {
      console.log("\u2705 API Response - getSummary:", data);
    }), map((data) => {
      const totalTrips = data?.totalTrips ?? data?.totalVehicles ?? 0;
      const totalNetWeight = data?.totalNetWeight ?? data?.totalWeight ?? 0;
      const average = totalTrips ? Math.round(totalNetWeight / totalTrips) : 0;
      return {
        totalNetWeight,
        totalTrips
      };
    }), catchError((error) => {
      console.error("\u274C API Error - getSummary:", error);
      console.log("\u26A0\uFE0F Returning mock data instead");
      return of(this.getMockSummaryData());
    }));
  }
  // Mock data methods for development
  getMockTrendData(label) {
    const data = [];
    const baseDate = /* @__PURE__ */ new Date();
    for (let i = 0; i < 10; i++) {
      data.push({
        date: new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1e3).toISOString(),
        weight: Math.floor(Math.random() * 1e3) + 500,
        label
      });
    }
    return data;
  }
  getMockVehicleData() {
    const vehicles = ["JK13E4846", "JK13E4847", "JK13E4848", "JK13E4849", "JK13E4850"];
    return vehicles.map((vehicle) => ({
      vehicleNumber: vehicle,
      weight: Math.floor(Math.random() * 2e3) + 1e3
    }));
  }
  getMockSummaryData() {
    return {
      totalWeight: 15420,
      totalVehicles: 25,
      averageWeight: 616.8,
      maxWeight: 1250
    };
  }
  getMockTimeframeData() {
    return [
      {
        periodName: "Week 1: 01 Nov to 07 Nov (7 days)",
        startDate: "2025-11-01",
        endDate: "2025-11-07",
        totalEntries: 0,
        totalNetWeight: 0,
        totalGrossWeight: 0,
        averageNetWeight: 0,
        averageGrossWeight: 0
      },
      {
        periodName: "Week 2: 08 Nov to 14 Nov (7 days)",
        startDate: "2025-11-08",
        endDate: "2025-11-14",
        totalEntries: 0,
        totalNetWeight: 0,
        totalGrossWeight: 0,
        averageNetWeight: 0,
        averageGrossWeight: 0
      },
      {
        periodName: "Week 3: 15 Nov to 21 Nov (7 days)",
        startDate: "2025-11-15",
        endDate: "2025-11-21",
        totalEntries: 4,
        totalNetWeight: 37415,
        totalGrossWeight: 76915,
        averageNetWeight: 9353.75,
        averageGrossWeight: 19228.75
      },
      {
        periodName: "Week 4: 22 Nov to 28 Nov (7 days)",
        startDate: "2025-11-22",
        endDate: "2025-11-28",
        totalEntries: 186,
        totalNetWeight: 1708915,
        totalGrossWeight: 3442870,
        averageNetWeight: 9187.71505376344,
        averageGrossWeight: 18510.05376344086
      },
      {
        periodName: "Week 5: 29 Nov to 05 Dec (7 days)",
        startDate: "2025-11-29",
        endDate: "2025-12-05",
        totalEntries: 322,
        totalNetWeight: 2958585,
        totalGrossWeight: 5957e3,
        averageNetWeight: 9188.152173913044,
        averageGrossWeight: 18500
      },
      {
        periodName: "Week 6: 06 Dec to 08 Dec (3 days)",
        startDate: "2025-12-06",
        endDate: "2025-12-08",
        totalEntries: 138,
        totalNetWeight: 1390075,
        totalGrossWeight: 2675440,
        averageNetWeight: 10073.007246376812,
        averageGrossWeight: 19387.246376811596
      }
    ];
  }
  // Keep your existing trend methods
  /**
   * Updated fallback mock data to match the new API response structure
   */
  getFallbackData() {
    console.warn("Using fallback data - API might be unavailable");
    return [
      {
        id: {
          slipno: 1,
          wbId: "SRNGR_LANDFILL_WB1"
        },
        vno: "TESTING",
        vname: "TATA 407",
        sname: "abd",
        tweight: 0,
        gweight: 95,
        gdate: "2025-11-21T14:39:37",
        tdate: "2025-11-21T14:40:06",
        nweight: 95,
        driver: "ttt",
        edate: "2025-11-21T14:40:06",
        zone: "kjhkjlh",
        mts: "kjhkj",
        ward: "lkjlk"
      },
      {
        id: {
          slipno: 2,
          wbId: "SRNGR_LANDFILL_WB1"
        },
        vno: "JK13E4846",
        vname: "TOYOTA",
        sname: "SMC Srinagar",
        tweight: 24e3,
        gweight: 44e3,
        gdate: "2025-11-21T12:34:12",
        tdate: "2025-11-21T12:34:01",
        nweight: 2e4,
        driver: "A. Khan",
        edate: "2025-11-21T12:34:12",
        zone: "Zone A",
        mts: "MTS-1",
        ward: "Ward 5"
      }
    ];
  }
  static \u0275fac = function SmcService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SmcService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SmcService, factory: _SmcService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SmcService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  SmcService
};
//# sourceMappingURL=chunk-OHINZ2ZQ.js.map
