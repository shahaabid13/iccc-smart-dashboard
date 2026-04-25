import {
  RouterLink,
  RouterModule
} from "./chunk-AAXJDYQS.js";
import "./chunk-BIRBC32G.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/components/shared/header/page-not-found.component.ts
var PageNotFoundComponent = class _PageNotFoundComponent {
  static \u0275fac = function PageNotFoundComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PageNotFoundComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PageNotFoundComponent, selectors: [["app-page-not-found"]], decls: 13, vars: 0, consts: [[1, "p404-root"], [1, "p404-card"], [1, "p404-code"], [1, "p404-title"], [1, "p404-desc"], [1, "p404-actions"], ["routerLink", "/", 1, "btn", "btn-primary"], ["routerLink", "/inventory", 1, "btn", "btn-outline"]], template: function PageNotFoundComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275text(3, "404");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275text(5, "Page Not Found");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275text(7, "The page you are looking for doesn't exist or has been moved.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "a", 6);
      \u0275\u0275text(10, "Go Home");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "a", 7);
      \u0275\u0275text(12, "View Inventory");
      \u0275\u0275elementEnd()()()();
    }
  }, dependencies: [RouterModule, RouterLink], styles: ["\n\n.p404-root[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  padding: 40px;\n}\n.p404-card[_ngcontent-%COMP%] {\n  max-width: 720px;\n  width: 100%;\n  background: #fff;\n  border-radius: 12px;\n  padding: 32px 36px;\n  box-shadow: 0 8px 30px rgba(22, 42, 80, 0.08);\n  text-align: center;\n}\n.p404-code[_ngcontent-%COMP%] {\n  font-size: 88px;\n  font-weight: 800;\n  color: #122e52;\n  margin-bottom: 4px;\n}\n.p404-title[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: #122e52;\n  margin-bottom: 8px;\n}\n.p404-desc[_ngcontent-%COMP%] {\n  color: #556;\n  margin-bottom: 20px;\n}\n.p404-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 10px 16px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: #fff;\n  background: #122e52;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #122e52;\n  border: 1px solid #122e52;\n}\n/*# sourceMappingURL=page-not-found.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageNotFoundComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [RouterModule], selector: "app-page-not-found", template: `
    <div class="p404-root">
      <div class="p404-card">
        <div class="p404-code">404</div>
        <div class="p404-title">Page Not Found</div>
        <div class="p404-desc">The page you are looking for doesn't exist or has been moved.</div>
        <div class="p404-actions">
          <a routerLink="/" class="btn btn-primary">Go Home</a>
          <a routerLink="/inventory" class="btn btn-outline">View Inventory</a>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;c7901017b6d377fa9c042a759b09c94694af71679bc6f17c9b619a9d20955f7e;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/shared/header/page-not-found.component.ts */\n.p404-root {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  padding: 40px;\n}\n.p404-card {\n  max-width: 720px;\n  width: 100%;\n  background: #fff;\n  border-radius: 12px;\n  padding: 32px 36px;\n  box-shadow: 0 8px 30px rgba(22, 42, 80, 0.08);\n  text-align: center;\n}\n.p404-code {\n  font-size: 88px;\n  font-weight: 800;\n  color: #122e52;\n  margin-bottom: 4px;\n}\n.p404-title {\n  font-size: 22px;\n  font-weight: 700;\n  color: #122e52;\n  margin-bottom: 8px;\n}\n.p404-desc {\n  color: #556;\n  margin-bottom: 20px;\n}\n.p404-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.btn {\n  display: inline-block;\n  padding: 10px 16px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: #fff;\n  background: #122e52;\n}\n.btn-outline {\n  background: transparent;\n  color: #122e52;\n  border: 1px solid #122e52;\n}\n/*# sourceMappingURL=page-not-found.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PageNotFoundComponent, { className: "PageNotFoundComponent", filePath: "src/app/components/shared/header/page-not-found.component.ts", lineNumber: 34 });
})();
export {
  PageNotFoundComponent
};
//# sourceMappingURL=chunk-OLLWLM22.js.map
