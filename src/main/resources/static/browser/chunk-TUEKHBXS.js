import {
  Pipe,
  setClassMetadata,
  ɵɵdefinePipe
} from "./chunk-OXNL7LB6.js";

// src/app/pipes/reduce.pipe.ts
var ReducePipe = class _ReducePipe {
  transform(array, property, initialValue = 0) {
    if (!Array.isArray(array)) {
      return initialValue;
    }
    return array.reduce((sum, item) => {
      const value = item[property];
      const numValue = typeof value === "number" ? value : 0;
      return sum + numValue;
    }, initialValue);
  }
  static \u0275fac = function ReducePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReducePipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "reduce", type: _ReducePipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReducePipe, [{
    type: Pipe,
    args: [{
      name: "reduce",
      standalone: true
    }]
  }], null, null);
})();

export {
  ReducePipe
};
//# sourceMappingURL=chunk-TUEKHBXS.js.map
