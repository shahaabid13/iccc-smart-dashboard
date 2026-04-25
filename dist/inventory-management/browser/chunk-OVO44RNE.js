import {
  ParkaddaAuthService
} from "./chunk-BWDQ2XAU.js";
import {
  Router,
  RouterModule
} from "./chunk-AAXJDYQS.js";
import "./chunk-BIRBC32G.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/components/auth/parkadda-login/parkadda-login.component.ts
function ParkaddaLoginComponent_small_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Mobile number is required");
    \u0275\u0275elementEnd();
  }
}
function ParkaddaLoginComponent_small_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function ParkaddaLoginComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "i", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
var ParkaddaLoginComponent = class _ParkaddaLoginComponent {
  fb;
  parkaddaAuthService;
  router;
  loginForm;
  submitting = false;
  error = null;
  constructor(fb, parkaddaAuthService, router) {
    this.fb = fb;
    this.parkaddaAuthService = parkaddaAuthService;
    this.router = router;
    this.loginForm = this.fb.group({
      mobile: ["", [Validators.required, Validators.minLength(10)]],
      password: ["", Validators.required]
    });
  }
  isInvalid(control) {
    const ctrl = this.loginForm.get(control);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }
  onSubmit() {
    this.error = null;
    if (this.loginForm.valid) {
      const { mobile, password } = this.loginForm.value;
      this.submitting = true;
      this.parkaddaAuthService.adminLogin(mobile, password).subscribe({
        next: (res) => {
          this.submitting = false;
          this.router.navigate(["/parkadda/dashboard"]);
        },
        error: (err) => {
          this.error = err.message || "Login failed. Please check your credentials.";
          this.submitting = false;
        },
        complete: () => this.submitting = false
      });
    }
  }
  static \u0275fac = function ParkaddaLoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ParkaddaLoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ParkaddaAuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ParkaddaLoginComponent, selectors: [["app-parkadda-login"]], decls: 32, vars: 10, consts: [[1, "login-wrapper"], [1, "login-left"], ["src", "/IMG_20251203_100849.jpg", "alt", "hero", 1, "left-image"], [1, "login-right"], [1, "login-box"], [1, "subtitle"], [3, "ngSubmit", "formGroup"], [1, "form-group"], [1, "fa", "fa-phone"], ["type", "tel", "formControlName", "mobile", "placeholder", "Enter mobile number"], [4, "ngIf"], [1, "fa", "fa-lock"], ["type", "password", "formControlName", "password", "placeholder", "Enter password"], ["class", "error-message", 4, "ngIf"], ["type", "submit", 1, "btn-login", 3, "disabled"], [1, "footer-text"], [1, "social-icons"], [1, "circle", "blue"], [1, "circle", "red"], [1, "circle", "pink"], [1, "error-message"], [1, "fa", "fa-exclamation-circle"]], template: function ParkaddaLoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "h2");
      \u0275\u0275text(6, "Parkadda Admin Login");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 5);
      \u0275\u0275text(8, "Parking Management System");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "form", 6);
      \u0275\u0275listener("ngSubmit", function ParkaddaLoginComponent_Template_form_ngSubmit_9_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(10, "div", 7)(11, "label");
      \u0275\u0275element(12, "i", 8);
      \u0275\u0275text(13, " Mobile Number");
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "input", 9);
      \u0275\u0275template(15, ParkaddaLoginComponent_small_15_Template, 2, 0, "small", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 7)(17, "label");
      \u0275\u0275element(18, "i", 11);
      \u0275\u0275text(19, " Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "input", 12);
      \u0275\u0275template(21, ParkaddaLoginComponent_small_21_Template, 2, 0, "small", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275template(22, ParkaddaLoginComponent_div_22_Template, 3, 1, "div", 13);
      \u0275\u0275elementStart(23, "button", 14);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 15)(26, "p");
      \u0275\u0275text(27, "Parkadda Admin Portal");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 16);
      \u0275\u0275element(29, "span", 17)(30, "span", 18)(31, "span", 19);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance();
      \u0275\u0275classProp("invalid", ctx.isInvalid("mobile"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.isInvalid("mobile"));
      \u0275\u0275advance();
      \u0275\u0275classProp("invalid", ctx.isInvalid("password"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.isInvalid("password"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.submitting ? "Logging in..." : "LOGIN", " ");
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, CommonModule, NgIf, RouterModule], styles: ['\n\n.login-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  font-family: "Poppins", sans-serif;\n  background: #f3f6fa;\n}\n.login-left[_ngcontent-%COMP%] {\n  flex: 1;\n  display: block;\n  overflow: hidden;\n  background: #fff;\n}\n.left-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.login-right[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: white;\n}\n.login-box[_ngcontent-%COMP%] {\n  width: 360px;\n  padding: 30px;\n  text-align: center;\n  background: #fff;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n}\n.login-box[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-size: 26px;\n  font-weight: 600;\n  color: #333;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  font-size: 13px;\n  color: #999;\n}\n.form-group[_ngcontent-%COMP%] {\n  text-align: left;\n  margin-bottom: 18px;\n  position: relative;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #555;\n  display: block;\n  margin-bottom: 5px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  border: none;\n  border-bottom: 2px solid #ccc;\n  outline: none;\n  font-size: 15px;\n  transition: 0.3s;\n  box-sizing: border-box;\n}\n.form-group.invalid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #ff5252;\n}\n.form-group[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #ff5252;\n  font-size: 12px;\n  position: absolute;\n  bottom: -18px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-bottom: 2px solid #007bff;\n}\n.error-message[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n  padding: 10px 12px;\n  border-radius: 6px;\n  font-size: 13px;\n  margin-bottom: 16px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  border-left: 3px solid #c62828;\n}\n.btn-login[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  background:\n    linear-gradient(\n      to right,\n      #00c6ff,\n      #5a00ff);\n  border: none;\n  color: white;\n  font-weight: 600;\n  border-radius: 25px;\n  cursor: pointer;\n  margin-top: 20px;\n  transition: 0.3s;\n}\n.btn-login[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.9;\n  transform: translateY(-2px);\n}\n.btn-login[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.footer-text[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 12px;\n  color: #999;\n}\n.social-icons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 16px;\n}\n.circle[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n.circle.blue[_ngcontent-%COMP%] {\n  background-color: #3b5998;\n}\n.circle.red[_ngcontent-%COMP%] {\n  background-color: #00acee;\n}\n.circle.pink[_ngcontent-%COMP%] {\n  background-color: #ea4c89;\n}\n@media (max-width: 768px) {\n  .login-wrapper[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .login-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .login-box[_ngcontent-%COMP%] {\n    width: 90%;\n  }\n}\n/*# sourceMappingURL=parkadda-login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ParkaddaLoginComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-parkadda-login", imports: [ReactiveFormsModule, CommonModule, RouterModule], template: `
  <div class="login-wrapper">
    <div class="login-left">
      <img src="/IMG_20251203_100849.jpg" alt="hero" class="left-image" />
    </div>

    <div class="login-right">
      <div class="login-box">
        <h2>Parkadda Admin Login</h2>
        <p class="subtitle">Parking Management System</p>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group" [class.invalid]="isInvalid('mobile')">
            <label><i class="fa fa-phone"></i> Mobile Number</label>
            <input type="tel" formControlName="mobile" placeholder="Enter mobile number" />
            <small *ngIf="isInvalid('mobile')">Mobile number is required</small>
          </div>

          <div class="form-group" [class.invalid]="isInvalid('password')">
            <label><i class="fa fa-lock"></i> Password</label>
            <input type="password" formControlName="password" placeholder="Enter password" />
            <small *ngIf="isInvalid('password')">Password is required</small>
          </div>

          <div *ngIf="error" class="error-message">
            <i class="fa fa-exclamation-circle"></i> {{ error }}
          </div>

          <button type="submit" [disabled]="loginForm.invalid || submitting" class="btn-login">
            {{ submitting ? 'Logging in...' : 'LOGIN' }}
          </button>
        </form>

        <div class="footer-text">
          <p>Parkadda Admin Portal</p>
        </div>

        <div class="social-icons">
          <span class="circle blue"></span>
          <span class="circle red"></span>
          <span class="circle pink"></span>
        </div>
      </div>
    </div>
  </div>
  `, styles: ['/* angular:styles/component:scss;5cbc78d0e9c88f19e17c31cf09edac0e6cfe6892a448206cae6b779f6b7798cd;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/auth/parkadda-login/parkadda-login.component.ts */\n.login-wrapper {\n  display: flex;\n  height: 100vh;\n  font-family: "Poppins", sans-serif;\n  background: #f3f6fa;\n}\n.login-left {\n  flex: 1;\n  display: block;\n  overflow: hidden;\n  background: #fff;\n}\n.left-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.login-right {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: white;\n}\n.login-box {\n  width: 360px;\n  padding: 30px;\n  text-align: center;\n  background: #fff;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n}\n.login-box h2 {\n  margin-bottom: 8px;\n  font-size: 26px;\n  font-weight: 600;\n  color: #333;\n}\n.subtitle {\n  margin-bottom: 24px;\n  font-size: 13px;\n  color: #999;\n}\n.form-group {\n  text-align: left;\n  margin-bottom: 18px;\n  position: relative;\n}\n.form-group label {\n  font-size: 14px;\n  color: #555;\n  display: block;\n  margin-bottom: 5px;\n}\n.form-group input {\n  width: 100%;\n  padding: 10px;\n  border: none;\n  border-bottom: 2px solid #ccc;\n  outline: none;\n  font-size: 15px;\n  transition: 0.3s;\n  box-sizing: border-box;\n}\n.form-group.invalid input {\n  border-bottom: 2px solid #ff5252;\n}\n.form-group small {\n  color: #ff5252;\n  font-size: 12px;\n  position: absolute;\n  bottom: -18px;\n}\n.form-group input:focus {\n  border-bottom: 2px solid #007bff;\n}\n.error-message {\n  background: #ffebee;\n  color: #c62828;\n  padding: 10px 12px;\n  border-radius: 6px;\n  font-size: 13px;\n  margin-bottom: 16px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  border-left: 3px solid #c62828;\n}\n.btn-login {\n  width: 100%;\n  padding: 12px;\n  background:\n    linear-gradient(\n      to right,\n      #00c6ff,\n      #5a00ff);\n  border: none;\n  color: white;\n  font-weight: 600;\n  border-radius: 25px;\n  cursor: pointer;\n  margin-top: 20px;\n  transition: 0.3s;\n}\n.btn-login:hover:not(:disabled) {\n  opacity: 0.9;\n  transform: translateY(-2px);\n}\n.btn-login:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.footer-text {\n  margin-top: 16px;\n  font-size: 12px;\n  color: #999;\n}\n.social-icons {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 16px;\n}\n.circle {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n.circle.blue {\n  background-color: #3b5998;\n}\n.circle.red {\n  background-color: #00acee;\n}\n.circle.pink {\n  background-color: #ea4c89;\n}\n@media (max-width: 768px) {\n  .login-wrapper {\n    flex-direction: column;\n  }\n  .login-left {\n    display: none;\n  }\n  .login-box {\n    width: 90%;\n  }\n}\n/*# sourceMappingURL=parkadda-login.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: ParkaddaAuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ParkaddaLoginComponent, { className: "ParkaddaLoginComponent", filePath: "src/app/components/auth/parkadda-login/parkadda-login.component.ts", lineNumber: 193 });
})();
export {
  ParkaddaLoginComponent
};
//# sourceMappingURL=chunk-OVO44RNE.js.map
