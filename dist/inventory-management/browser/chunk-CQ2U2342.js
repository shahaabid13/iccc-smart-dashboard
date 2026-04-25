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

// src/app/components/shared/header/coming-soon.component.ts
var ComingSoonComponent = class _ComingSoonComponent {
  static \u0275fac = function ComingSoonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ComingSoonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ComingSoonComponent, selectors: [["app-coming-soon"]], decls: 13, vars: 0, consts: [[1, "coming-root"], [1, "coming-card"], [1, "coming-badge"], [1, "coming-title"], [1, "coming-desc"], [1, "coming-actions"], ["routerLink", "/", 1, "btn", "btn-primary"], ["routerLink", "/inventory", 1, "btn", "btn-outline"]], template: function ComingSoonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275text(3, "Coming Soon");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h2", 3);
      \u0275\u0275text(5, "This feature is not ready yet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "We\u2019re working on it \u2014 check back soon. In the meantime you can return to the dashboard.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "a", 6);
      \u0275\u0275text(10, "Back to Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "a", 7);
      \u0275\u0275text(12, "View Inventory");
      \u0275\u0275elementEnd()()()();
    }
  }, dependencies: [RouterModule, RouterLink], styles: ["\n\n.coming-root[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  padding: 40px;\n}\n.coming-card[_ngcontent-%COMP%] {\n  max-width: 720px;\n  width: 100%;\n  background: #fff;\n  border-radius: 12px;\n  padding: 28px 32px;\n  box-shadow: 0 8px 30px rgba(22, 42, 80, 0.06);\n  text-align: center;\n}\n.coming-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: #f0f7ff;\n  color: #0066cc;\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.coming-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #122e52;\n  margin-bottom: 8px;\n}\n.coming-desc[_ngcontent-%COMP%] {\n  color: #556;\n  margin-bottom: 18px;\n}\n.coming-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 10px 16px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: #fff;\n  background: #122e52;\n}\n.btn-outline[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #122e52;\n  border: 1px solid #122e52;\n}\n/*# sourceMappingURL=coming-soon.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComingSoonComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [RouterModule], selector: "app-coming-soon", template: `
    <div class="coming-root">
      <div class="coming-card">
        <div class="coming-badge">Coming Soon</div>
        <h2 class="coming-title">This feature is not ready yet</h2>
        <p class="coming-desc">We\u2019re working on it \u2014 check back soon. In the meantime you can return to the dashboard.</p>
        <div class="coming-actions">
          <a routerLink="/" class="btn btn-primary">Back to Dashboard</a>
          <a routerLink="/inventory" class="btn btn-outline">View Inventory</a>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;fb8f4423d0285469a4b6ea98def410126ece7d13b71bd7f7e3960afd49751072;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/shared/header/coming-soon.component.ts */\n.coming-root {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 60vh;\n  padding: 40px;\n}\n.coming-card {\n  max-width: 720px;\n  width: 100%;\n  background: #fff;\n  border-radius: 12px;\n  padding: 28px 32px;\n  box-shadow: 0 8px 30px rgba(22, 42, 80, 0.06);\n  text-align: center;\n}\n.coming-badge {\n  display: inline-block;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: #f0f7ff;\n  color: #0066cc;\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.coming-title {\n  font-size: 20px;\n  color: #122e52;\n  margin-bottom: 8px;\n}\n.coming-desc {\n  color: #556;\n  margin-bottom: 18px;\n}\n.coming-actions {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}\n.btn {\n  display: inline-block;\n  padding: 10px 16px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: #fff;\n  background: #122e52;\n}\n.btn-outline {\n  background: transparent;\n  color: #122e52;\n  border: 1px solid #122e52;\n}\n/*# sourceMappingURL=coming-soon.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ComingSoonComponent, { className: "ComingSoonComponent", filePath: "src/app/components/shared/header/coming-soon.component.ts", lineNumber: 34 });
})();
export {
  ComingSoonComponent
};
//# sourceMappingURL=chunk-CQ2U2342.js.map
