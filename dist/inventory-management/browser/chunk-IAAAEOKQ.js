import {
  AuthService
} from "./chunk-QHHSFO4U.js";
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
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/components/auth/login/login.component.ts
function LoginComponent_small_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Username is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_small_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  fb;
  authService;
  router;
  loginForm;
  submitting = false;
  constructor(fb, authService, router) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  isInvalid(control) {
    const ctrl = this.loginForm.get(control);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.submitting = true;
      this.authService.login(username, password).subscribe({
        next: (res) => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("role", res.role);
          if (res.role === "ADMIN") {
            this.router.navigate(["/admin/dashboard"]);
          } else {
            this.router.navigate(["/inventory"]);
          }
        },
        error: () => {
          alert("\u274C Invalid username or password");
          this.submitting = false;
        },
        complete: () => this.submitting = false
      });
    }
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 27, vars: 9, consts: [[1, "login-wrapper"], [1, "login-left"], ["src", "/IMG_20251203_100849.jpg", "alt", "hero", 1, "left-image"], [1, "login-right"], [1, "login-box"], [3, "ngSubmit", "formGroup"], [1, "form-group"], [1, "fa", "fa-user"], ["type", "text", "formControlName", "username", "placeholder", "Enter username"], [4, "ngIf"], [1, "fa", "fa-lock"], ["type", "password", "formControlName", "password", "placeholder", "Enter password"], ["type", "submit", 1, "btn-login", 3, "disabled"], [1, "footer-links"], [1, "social-icons"], [1, "circle", "blue"], [1, "circle", "red"], [1, "circle", "pink"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "h2");
      \u0275\u0275text(6, "Login");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "form", 5);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_7_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(8, "div", 6)(9, "label");
      \u0275\u0275element(10, "i", 7);
      \u0275\u0275text(11, " Username");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "input", 8);
      \u0275\u0275template(13, LoginComponent_small_13_Template, 2, 0, "small", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 6)(15, "label");
      \u0275\u0275element(16, "i", 10);
      \u0275\u0275text(17, " Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "input", 11);
      \u0275\u0275template(19, LoginComponent_small_19_Template, 2, 0, "small", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "button", 12);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(22, "div", 13);
      \u0275\u0275elementStart(23, "div", 14);
      \u0275\u0275element(24, "span", 15)(25, "span", 16)(26, "span", 17);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance();
      \u0275\u0275classProp("invalid", ctx.isInvalid("username"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.isInvalid("username"));
      \u0275\u0275advance();
      \u0275\u0275classProp("invalid", ctx.isInvalid("password"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.isInvalid("password"));
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.submitting ? "Logging in..." : "LOGIN", " ");
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, CommonModule, NgIf, RouterModule], styles: ['\n\n.login-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  font-family: "Poppins", sans-serif;\n  background: #f3f6fa;\n}\n.login-left[_ngcontent-%COMP%] {\n  flex: 1;\n  display: block;\n  overflow: hidden;\n  background: #fff;\n}\n.left-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.login-right[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: white;\n}\n.login-box[_ngcontent-%COMP%] {\n  width: 360px;\n  padding: 30px;\n  text-align: center;\n  background: #fff;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n}\n.login-box[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  font-size: 26px;\n  font-weight: 600;\n  color: #333;\n}\n.form-group[_ngcontent-%COMP%] {\n  text-align: left;\n  margin-bottom: 18px;\n  position: relative;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #555;\n  display: block;\n  margin-bottom: 5px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  border: none;\n  border-bottom: 2px solid #ccc;\n  outline: none;\n  font-size: 15px;\n  transition: 0.3s;\n}\n.form-group.invalid[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #ff5252;\n}\n.form-group[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #ff5252;\n  font-size: 12px;\n  position: absolute;\n  bottom: -18px;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-bottom: 2px solid #007bff;\n}\n.btn-login[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  background:\n    linear-gradient(\n      to right,\n      #00c6ff,\n      #5a00ff);\n  border: none;\n  color: white;\n  font-weight: 600;\n  border-radius: 25px;\n  cursor: pointer;\n  margin-top: 20px;\n  transition: 0.3s;\n}\n.btn-login[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.btn-login[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.footer-links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 14px;\n  font-size: 13px;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #5a00ff;\n  text-decoration: none;\n  font-weight: 500;\n  transition: 0.2s;\n}\n.footer-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.social-icons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 16px;\n}\n.circle[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n.circle.blue[_ngcontent-%COMP%] {\n  background-color: #3b5998;\n}\n.circle.red[_ngcontent-%COMP%] {\n  background-color: #00acee;\n}\n.circle.pink[_ngcontent-%COMP%] {\n  background-color: #ea4c89;\n}\n@media (max-width: 768px) {\n  .login-wrapper[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .login-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .login-box[_ngcontent-%COMP%] {\n    width: 90%;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-login", imports: [ReactiveFormsModule, CommonModule, RouterModule], template: `
  <div class="login-wrapper">
    <div class="login-left">
      <img src="/IMG_20251203_100849.jpg" alt="hero" class="left-image" />
    </div>

    <div class="login-right">
      <div class="login-box">
        <h2>Login</h2>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group" [class.invalid]="isInvalid('username')">
            <label><i class="fa fa-user"></i> Username</label>
            <input type="text" formControlName="username" placeholder="Enter username" />
            <small *ngIf="isInvalid('username')">Username is required</small>
          </div>

          <div class="form-group" [class.invalid]="isInvalid('password')">
            <label><i class="fa fa-lock"></i> Password</label>
            <input type="password" formControlName="password" placeholder="Enter password" />
            <small *ngIf="isInvalid('password')">Password is required</small>
          </div>

          <button type="submit" [disabled]="loginForm.invalid || submitting" class="btn-login">
            {{ submitting ? 'Logging in...' : 'LOGIN' }}
          </button>
        </form>

        <div class="footer-links">
        </div>

        <div class="social-icons">
          <span class="circle blue"></span>
          <span class="circle red"></span>
          <span class="circle pink"></span>
        </div>
      </div>
    </div>
  </div>
  `, styles: ['/* angular:styles/component:scss;c132a656fe794e9ef6179d85aadee7ed474619bdf1cb3e5e0b26d41cee1eb9d4;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/auth/login/login.component.ts */\n.login-wrapper {\n  display: flex;\n  height: 100vh;\n  font-family: "Poppins", sans-serif;\n  background: #f3f6fa;\n}\n.login-left {\n  flex: 1;\n  display: block;\n  overflow: hidden;\n  background: #fff;\n}\n.left-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.login-right {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: white;\n}\n.login-box {\n  width: 360px;\n  padding: 30px;\n  text-align: center;\n  background: #fff;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  border-radius: 12px;\n}\n.login-box h2 {\n  margin-bottom: 24px;\n  font-size: 26px;\n  font-weight: 600;\n  color: #333;\n}\n.form-group {\n  text-align: left;\n  margin-bottom: 18px;\n  position: relative;\n}\n.form-group label {\n  font-size: 14px;\n  color: #555;\n  display: block;\n  margin-bottom: 5px;\n}\n.form-group input {\n  width: 100%;\n  padding: 10px;\n  border: none;\n  border-bottom: 2px solid #ccc;\n  outline: none;\n  font-size: 15px;\n  transition: 0.3s;\n}\n.form-group.invalid input {\n  border-bottom: 2px solid #ff5252;\n}\n.form-group small {\n  color: #ff5252;\n  font-size: 12px;\n  position: absolute;\n  bottom: -18px;\n}\n.form-group input:focus {\n  border-bottom: 2px solid #007bff;\n}\n.btn-login {\n  width: 100%;\n  padding: 12px;\n  background:\n    linear-gradient(\n      to right,\n      #00c6ff,\n      #5a00ff);\n  border: none;\n  color: white;\n  font-weight: 600;\n  border-radius: 25px;\n  cursor: pointer;\n  margin-top: 20px;\n  transition: 0.3s;\n}\n.btn-login:hover {\n  opacity: 0.9;\n}\n.btn-login:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.footer-links {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 14px;\n  font-size: 13px;\n}\n.footer-links a {\n  color: #5a00ff;\n  text-decoration: none;\n  font-weight: 500;\n  transition: 0.2s;\n}\n.footer-links a:hover {\n  text-decoration: underline;\n}\n.social-icons {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 16px;\n}\n.circle {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n.circle.blue {\n  background-color: #3b5998;\n}\n.circle.red {\n  background-color: #00acee;\n}\n.circle.pink {\n  background-color: #ea4c89;\n}\n@media (max-width: 768px) {\n  .login-wrapper {\n    flex-direction: column;\n  }\n  .login-left {\n    display: none;\n  }\n  .login-box {\n    width: 90%;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/components/auth/login/login.component.ts", lineNumber: 178 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-IAAAEOKQ.js.map
