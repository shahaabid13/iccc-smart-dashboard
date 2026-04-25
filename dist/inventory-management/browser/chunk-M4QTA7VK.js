import {
  AuthService
} from "./chunk-QHHSFO4U.js";
import {
  Router,
  RouterLink,
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
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/components/auth/register/register.component.ts
function RegisterComponent_div_0_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1, " Username is required ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_0_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1, " Valid email required ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_0_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1, " Password is required ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_div_0_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("show", ctx_r1.showToast);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.toastMessage);
  }
}
function RegisterComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "div", 3);
    \u0275\u0275elementStart(2, "div", 4)(3, "div", 5)(4, "h1", 6);
    \u0275\u0275text(5, "Admin Registration");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "form", 7);
    \u0275\u0275listener("ngSubmit", function RegisterComponent_div_0_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275elementStart(7, "div", 8)(8, "label", 9);
    \u0275\u0275text(9, "Username");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 10);
    \u0275\u0275template(11, RegisterComponent_div_0_div_11_Template, 2, 0, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 8)(13, "label", 9);
    \u0275\u0275text(14, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 12);
    \u0275\u0275template(16, RegisterComponent_div_0_div_16_Template, 2, 0, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 8)(18, "label", 9);
    \u0275\u0275text(19, "Password");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 13);
    \u0275\u0275template(21, RegisterComponent_div_0_div_21_Template, 2, 0, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 8)(23, "label", 9);
    \u0275\u0275text(24, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "select", 14)(26, "option", 15);
    \u0275\u0275text(27, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 16);
    \u0275\u0275text(29, "Agency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "option", 17);
    \u0275\u0275text(31, "Admin");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "button", 18);
    \u0275\u0275text(33, "Register");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 19);
    \u0275\u0275text(35, " Already have an account? ");
    \u0275\u0275elementStart(36, "a", 20);
    \u0275\u0275text(37, "Sign in \u2192");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(38, RegisterComponent_div_0_div_38_Template, 2, 3, "div", 21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.form.controls["username"].invalid && ctx_r1.form.controls["username"].touched);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.form.controls["email"].invalid && ctx_r1.form.controls["email"].touched);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.form.controls["password"].invalid && ctx_r1.form.controls["password"].touched);
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx_r1.form.invalid);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.toastMessage);
  }
}
function RegisterComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "h2");
    \u0275\u0275text(2, "\u274C Access Denied");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Only admins can register new users.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 25);
    \u0275\u0275listener("click", function RegisterComponent_ng_template_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.router.navigate(["/login"]));
    });
    \u0275\u0275text(6, "Go to Login");
    \u0275\u0275elementEnd()();
  }
}
var RegisterComponent = class _RegisterComponent {
  fb;
  auth;
  router;
  form;
  toastMessage = "";
  showToast = false;
  isAdmin = false;
  constructor(fb, auth, router) {
    this.fb = fb;
    this.auth = auth;
    this.router = router;
    this.form = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      role: ["user", Validators.required]
    });
  }
  ngOnInit() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.isAdmin = user.role === "ADMIN";
    } else {
      this.isAdmin = false;
    }
    if (!this.isAdmin) {
      setTimeout(() => this.router.navigate(["/login"]), 2e3);
    }
  }
  showToastMessage(message) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3e3);
  }
  submit() {
    if (this.form.invalid)
      return;
    const user = this.form.value;
    const storedUsers = localStorage.getItem("mockUsers");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const exists = users.some((u) => u.username === user.username || u.email === user.email);
    if (exists) {
      this.showToastMessage("User already exists. Try another username or email.");
      return;
    }
    const newUser = {
      id: `local-${Date.now()}`,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role
    };
    users.push(newUser);
    localStorage.setItem("mockUsers", JSON.stringify(users));
    this.showToastMessage("Registration successful! Redirecting to login...");
    setTimeout(() => {
      this.router.navigate(["/login"]);
    }, 1500);
  }
  static \u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 3, vars: 2, consts: [["notAllowed", ""], ["class", "signup-wrapper", 4, "ngIf", "ngIfElse"], [1, "signup-wrapper"], [1, "left-hero"], [1, "signup-panel"], [1, "signup-card"], [1, "title"], [1, "signup-form", 3, "ngSubmit", "formGroup"], [1, "field"], [1, "label"], ["placeholder", "Username...", "formControlName", "username", 1, "input"], ["class", "error", 4, "ngIf"], ["placeholder", "Email address...", "type", "email", "formControlName", "email", 1, "input"], ["placeholder", "Password...", "type", "password", "formControlName", "password", 1, "input"], ["formControlName", "role", 1, "input"], ["value", "user"], ["value", "agency"], ["value", "admin"], ["type", "submit", 1, "signup-btn", 3, "disabled"], [1, "signin-link"], ["routerLink", "/login"], ["class", "toast", 3, "show", 4, "ngIf"], [1, "error"], [1, "toast"], [1, "not-allowed"], [1, "back-btn", 3, "click"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, RegisterComponent_div_0_Template, 39, 6, "div", 1)(1, RegisterComponent_ng_template_1_Template, 7, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const notAllowed_r4 = \u0275\u0275reference(2);
      \u0275\u0275property("ngIf", ctx.isAdmin)("ngIfElse", notAllowed_r4);
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterModule, RouterLink], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.signup-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 80vh;\n}\n.left-hero[_ngcontent-%COMP%] {\n  flex: 1;\n  background-image: url(/IMG_20251203_100859.jpg);\n  background-size: cover;\n  background-position: center;\n  position: relative;\n  border-radius: 8px;\n}\n.signup-panel[_ngcontent-%COMP%] {\n  width: 420px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #fff;\n}\n.signup-card[_ngcontent-%COMP%] {\n  width: 360px;\n  padding: 32px;\n  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);\n  border-radius: 8px;\n}\n.title[_ngcontent-%COMP%] {\n  margin: 0 0 18px 0;\n  font-size: 28px;\n  font-weight: 700;\n  text-align: center;\n  color: #5a00ff;\n}\n.signup-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  margin-bottom: 6px;\n}\n.input[_ngcontent-%COMP%] {\n  padding: 10px 8px;\n  border: none;\n  border-bottom: 1px solid #e6e6e6;\n  outline: none;\n  font-size: 14px;\n}\n.input[_ngcontent-%COMP%]:focus {\n  border-bottom-color: #5a00ff;\n}\n.signup-btn[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  padding: 12px;\n  border-radius: 28px;\n  border: none;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #ff6a88,\n      #5a00ff);\n  cursor: pointer;\n  font-weight: 600;\n}\n.signup-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.signin-link[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-size: 13px;\n  color: #666;\n  text-align: right;\n}\n.signin-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #5a00ff;\n  text-decoration: none;\n  font-weight: 600;\n}\n.toast[_ngcontent-%COMP%] {\n  visibility: hidden;\n  opacity: 0;\n  transition: opacity 0.3s;\n  margin-top: 12px;\n  background: #333;\n  color: #fff;\n  padding: 10px 12px;\n  border-radius: 6px;\n  text-align: center;\n}\n.toast.show[_ngcontent-%COMP%] {\n  visibility: visible;\n  opacity: 1;\n}\n.not-allowed[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 80vh;\n  text-align: center;\n}\n.not-allowed[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #b71c1c;\n  margin-bottom: 10px;\n}\n.not-allowed[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #555;\n  margin-bottom: 20px;\n}\n.back-btn[_ngcontent-%COMP%] {\n  background: #5a00ff;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n}\n@media (max-width: 900px) {\n  .signup-wrapper[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .left-hero[_ngcontent-%COMP%] {\n    height: 240px;\n    width: 100%;\n  }\n  .signup-panel[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{ standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], selector: "app-register", template: `
    <div class="signup-wrapper" *ngIf="isAdmin; else notAllowed">
      <div class="left-hero"></div>
      <div class="signup-panel">
        <div class="signup-card">
          <h1 class="title">Admin Registration</h1>

          <form [formGroup]="form" (ngSubmit)="submit()" class="signup-form">
            <div class="field">
              <label class="label">Username</label>
              <input class="input" placeholder="Username..." formControlName="username" />
              <div class="error" *ngIf="form.controls['username'].invalid && form.controls['username'].touched">
                Username is required
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <input class="input" placeholder="Email address..." type="email" formControlName="email" />
              <div class="error" *ngIf="form.controls['email'].invalid && form.controls['email'].touched">
                Valid email required
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <input class="input" placeholder="Password..." type="password" formControlName="password" />
              <div class="error" *ngIf="form.controls['password'].invalid && form.controls['password'].touched">
                Password is required
              </div>
            </div>

            <div class="field">
              <label class="label">Role</label>
              <select class="input" formControlName="role">
                <option value="user">User</option>
                <option value="agency">Agency</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" class="signup-btn" [disabled]="form.invalid">Register</button>
          </form>

          <div class="signin-link">
            Already have an account? <a routerLink="/login">Sign in \u2192</a>
          </div>

          <!-- Toast Message -->
          <div *ngIf="toastMessage" class="toast" [class.show]="showToast">{{ toastMessage }}</div>
        </div>
      </div>
    </div>

    <!-- If not admin -->
    <ng-template #notAllowed>
      <div class="not-allowed">
        <h2>\u274C Access Denied</h2>
        <p>Only admins can register new users.</p>
        <button (click)="router.navigate(['/login'])" class="back-btn">Go to Login</button>
      </div>
    </ng-template>
  `, styles: ["/* angular:styles/component:scss;ab136510bb3545b4a899ed7d6b35766931b28c972342b5f816f9dfb0a4674b1f;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/auth/register/register.component.ts */\n:host {\n  display: block;\n}\n.signup-wrapper {\n  display: flex;\n  min-height: 80vh;\n}\n.left-hero {\n  flex: 1;\n  background-image: url(/IMG_20251203_100859.jpg);\n  background-size: cover;\n  background-position: center;\n  position: relative;\n  border-radius: 8px;\n}\n.signup-panel {\n  width: 420px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #fff;\n}\n.signup-card {\n  width: 360px;\n  padding: 32px;\n  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08);\n  border-radius: 8px;\n}\n.title {\n  margin: 0 0 18px 0;\n  font-size: 28px;\n  font-weight: 700;\n  text-align: center;\n  color: #5a00ff;\n}\n.signup-form {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.label {\n  font-size: 12px;\n  margin-bottom: 6px;\n}\n.input {\n  padding: 10px 8px;\n  border: none;\n  border-bottom: 1px solid #e6e6e6;\n  outline: none;\n  font-size: 14px;\n}\n.input:focus {\n  border-bottom-color: #5a00ff;\n}\n.signup-btn {\n  margin-top: 6px;\n  padding: 12px;\n  border-radius: 28px;\n  border: none;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #ff6a88,\n      #5a00ff);\n  cursor: pointer;\n  font-weight: 600;\n}\n.signup-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.signin-link {\n  margin-top: 12px;\n  font-size: 13px;\n  color: #666;\n  text-align: right;\n}\n.signin-link a {\n  color: #5a00ff;\n  text-decoration: none;\n  font-weight: 600;\n}\n.toast {\n  visibility: hidden;\n  opacity: 0;\n  transition: opacity 0.3s;\n  margin-top: 12px;\n  background: #333;\n  color: #fff;\n  padding: 10px 12px;\n  border-radius: 6px;\n  text-align: center;\n}\n.toast.show {\n  visibility: visible;\n  opacity: 1;\n}\n.not-allowed {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 80vh;\n  text-align: center;\n}\n.not-allowed h2 {\n  color: #b71c1c;\n  margin-bottom: 10px;\n}\n.not-allowed p {\n  color: #555;\n  margin-bottom: 20px;\n}\n.back-btn {\n  background: #5a00ff;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n}\n@media (max-width: 900px) {\n  .signup-wrapper {\n    flex-direction: column;\n  }\n  .left-hero {\n    height: 240px;\n    width: 100%;\n  }\n  .signup-panel {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/components/auth/register/register.component.ts", lineNumber: 113 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-M4QTA7VK.js.map
