import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-CSMEO5BW.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-DUN6GKUJ.js";
import {
  MatFormFieldModule
} from "./chunk-OMQ3L3ZA.js";
import "./chunk-VD67GU43.js";
import {
  MatCard,
  MatCardModule,
  MatFormField,
  MatLabel
} from "./chunk-AK2ZYAID.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-AJHCE7D6.js";
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
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-4AUWEQTR.js";
import {
  CommonModule,
  Component,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// src/app/components/auth/forgot-password/forgot-password.component.ts
function ForgotPasswordComponent_p_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.message);
  }
}
function ForgotPasswordComponent_div_15_div_12_p_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "Password must be at least 6 characters.");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_div_15_div_12_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "Passwords do not match.");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_div_15_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275template(1, ForgotPasswordComponent_div_15_div_12_p_1_Template, 2, 0, "p", 19)(2, ForgotPasswordComponent_div_15_div_12_p_2_Template, 2, 0, "p", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.newPassword && ctx_r0.newPassword.length < 6);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.newPassword && ctx_r0.confirmPassword && ctx_r0.newPassword !== ctx_r0.confirmPassword);
  }
}
function ForgotPasswordComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "mat-form-field", 3)(2, "mat-label");
    \u0275\u0275text(3, "New Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function ForgotPasswordComponent_div_15_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.newPassword, $event) || (ctx_r0.newPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-form-field", 3)(6, "mat-label");
    \u0275\u0275text(7, "Confirm Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function ForgotPasswordComponent_div_15_Template_input_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.confirmPassword, $event) || (ctx_r0.confirmPassword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 5)(10, "button", 16);
    \u0275\u0275listener("click", function ForgotPasswordComponent_div_15_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setNewPassword());
    });
    \u0275\u0275text(11, " Set New Password ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, ForgotPasswordComponent_div_15_div_12_Template, 3, 2, "div", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.newPassword);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.confirmPassword);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.canSetNew());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.verified);
  }
}
var ForgotPasswordComponent = class _ForgotPasswordComponent {
  auth;
  router;
  snackBar;
  verify() {
    throw new Error("Method not implemented.");
  }
  setNewPassword() {
    throw new Error("Method not implemented.");
  }
  email = "";
  message = "";
  verified = false;
  newPassword = "";
  confirmPassword = "";
  apiUrl;
  http;
  constructor(auth, router, snackBar) {
    this.auth = auth;
    this.router = router;
    this.snackBar = snackBar;
  }
  verifyEmail(email) {
    return this.http.post(`${this.apiUrl}/verify-email`, { email });
  }
  canSetNew() {
    return this.verified && this.newPassword && this.newPassword.length >= 6 && this.newPassword === this.confirmPassword;
  }
  resetPassword(email, newPassword) {
    return this.http.post(`${this.apiUrl}/reset-password`, { email, newPassword });
  }
  static \u0275fac = function ForgotPasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ForgotPasswordComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForgotPasswordComponent, selectors: [["app-forgot-password"]], decls: 23, vars: 4, consts: [[1, "forgot-container"], [1, "forgot-card"], [1, "header"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "email", "placeholder", "you@example.com", 3, "ngModelChange", "ngModel"], [1, "btn-row"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["class", "message", 4, "ngIf"], ["class", "password-section", 4, "ngIf"], [1, "links"], ["routerLink", "/login"], ["routerLink", "/register"], [1, "message"], [1, "password-section"], ["matInput", "", "type", "password", "placeholder", "Enter new password", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "password", "placeholder", "Confirm new password", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "primary-btn", 3, "click", "disabled"], ["class", "validation-messages", 4, "ngIf"], [1, "validation-messages"], ["class", "warn", 4, "ngIf"], [1, "warn"]], template: function ForgotPasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "div", 2)(3, "h2");
      \u0275\u0275text(4, "Reset Your Password");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "Please enter your registered email address to verify your account.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-form-field", 3)(8, "mat-label");
      \u0275\u0275text(9, "Email Address");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function ForgotPasswordComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 5)(12, "button", 6);
      \u0275\u0275listener("click", function ForgotPasswordComponent_Template_button_click_12_listener() {
        return ctx.verify();
      });
      \u0275\u0275text(13, " Verify Email ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(14, ForgotPasswordComponent_p_14_Template, 2, 1, "p", 7)(15, ForgotPasswordComponent_div_15_Template, 13, 4, "div", 8);
      \u0275\u0275elementStart(16, "div", 9)(17, "a", 10);
      \u0275\u0275text(18, "Back to Login");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "span");
      \u0275\u0275text(20, "\xA0|\xA0");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "a", 11);
      \u0275\u0275text(22, "Register");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.email);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.message);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.verified);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterModule, RouterLink, MatCardModule, MatCard, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatButtonModule, MatButton, MatSnackBarModule], styles: ['\n\n.forgot-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 80vh;\n  border-radius: 8px;\n  margin-top: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #5a00ff,\n      #00c6ff);\n  font-family: "Poppins", sans-serif;\n  background-image: url(/scs.jpg);\n}\n.forgot-card[_ngcontent-%COMP%] {\n  width: 420px;\n  padding: 32px 28px;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);\n  border-radius: 12px;\n  background-color: #fff;\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease;\n}\n.header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n  font-weight: 600;\n  color: #3f51b5;\n}\n.header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 10px;\n}\n.btn-row[_ngcontent-%COMP%] {\n  text-align: right;\n  margin-top: 15px;\n}\n.btn-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 18px;\n  border-radius: 6px;\n}\n.primary-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #00c6ff,\n      #5a00ff);\n  color: #fff;\n  border: none;\n  padding: 10px 18px;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.primary-btn[disabled][_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.validation-messages[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.warn[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 13px;\n  margin: 4px 0;\n}\n.password-section[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  border-top: 1px solid #eee;\n  padding-top: 15px;\n}\n.message[_ngcontent-%COMP%] {\n  color: #444;\n  margin-top: 12px;\n  text-align: center;\n  font-size: 14px;\n}\n.links[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 20px;\n  font-size: 14px;\n}\n.links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #5a00ff;\n  text-decoration: none;\n  font-weight: 500;\n}\n.links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 480px) {\n  .forgot-card[_ngcontent-%COMP%] {\n    width: 90%;\n    padding: 24px 18px;\n  }\n}\n/*# sourceMappingURL=forgot-password.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ForgotPasswordComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-forgot-password", imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSnackBarModule
    ], template: `
    <div class="forgot-container">
      <mat-card class="forgot-card">
        <div class="header">
          <h2>Reset Your Password</h2>
          <p>Please enter your registered email address to verify your account.</p>
        </div>

        <!-- Email Verification -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email Address</mat-label>
          <input
            matInput
            type="email"
            placeholder="you@example.com"
            [(ngModel)]="email"
          />
        </mat-form-field>

        <div class="btn-row">
          <button
            mat-flat-button
            color="primary"
            (click)="verify()"
            [disabled]="!email"
          >
            Verify Email
          </button>
        </div>

        <p class="message" *ngIf="message">{{ message }}</p>

        <!-- Password Reset Section -->
        <div *ngIf="verified" class="password-section">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>New Password</mat-label>
            <input
              matInput
              type="password"
              placeholder="Enter new password"
              [(ngModel)]="newPassword"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Confirm Password</mat-label>
            <input
              matInput
              type="password"
              placeholder="Confirm new password"
              [(ngModel)]="confirmPassword"
            />
          </mat-form-field>

          <div class="btn-row">
            <button
              type="button"
              class="primary-btn"
              (click)="setNewPassword()"
              [disabled]="!canSetNew()"
            >
              Set New Password
            </button>
          </div>
          <div *ngIf="verified" class="validation-messages">
            <p *ngIf="newPassword && newPassword.length < 6" class="warn">Password must be at least 6 characters.</p>
            <p *ngIf="newPassword && confirmPassword && newPassword !== confirmPassword" class="warn">Passwords do not match.</p>
          </div>
        </div>

        <div class="links">
          <a routerLink="/login">Back to Login</a>
          <span>&nbsp;|&nbsp;</span>
          <a routerLink="/register">Register</a>
        </div>
      </mat-card>
    </div>
  `, styles: ['/* angular:styles/component:scss;7b38e2c45f3f54d51a8b1ac01a193fcc123b36add9a8e93f67b6fd39c5970f6b;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/auth/forgot-password/forgot-password.component.ts */\n.forgot-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 80vh;\n  border-radius: 8px;\n  margin-top: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      #5a00ff,\n      #00c6ff);\n  font-family: "Poppins", sans-serif;\n  background-image: url(/scs.jpg);\n}\n.forgot-card {\n  width: 420px;\n  padding: 32px 28px;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);\n  border-radius: 12px;\n  background-color: #fff;\n  animation: fadeIn 0.5s ease;\n}\n.header {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.header h2 {\n  margin-bottom: 6px;\n  font-weight: 600;\n  color: #3f51b5;\n}\n.header p {\n  font-size: 14px;\n  color: #666;\n}\n.full-width {\n  width: 100%;\n  margin-top: 10px;\n}\n.btn-row {\n  text-align: right;\n  margin-top: 15px;\n}\n.btn-row button {\n  padding: 8px 18px;\n  border-radius: 6px;\n}\n.primary-btn {\n  background:\n    linear-gradient(\n      90deg,\n      #00c6ff,\n      #5a00ff);\n  color: #fff;\n  border: none;\n  padding: 10px 18px;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}\n.primary-btn[disabled] {\n  opacity: 0.5;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.validation-messages {\n  margin-top: 8px;\n}\n.warn {\n  color: #d32f2f;\n  font-size: 13px;\n  margin: 4px 0;\n}\n.password-section {\n  margin-top: 20px;\n  border-top: 1px solid #eee;\n  padding-top: 15px;\n}\n.message {\n  color: #444;\n  margin-top: 12px;\n  text-align: center;\n  font-size: 14px;\n}\n.links {\n  text-align: center;\n  margin-top: 20px;\n  font-size: 14px;\n}\n.links a {\n  color: #5a00ff;\n  text-decoration: none;\n  font-weight: 500;\n}\n.links a:hover {\n  text-decoration: underline;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 480px) {\n  .forgot-card {\n    width: 90%;\n    padding: 24px 18px;\n  }\n}\n/*# sourceMappingURL=forgot-password.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }, { type: MatSnackBar }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForgotPasswordComponent, { className: "ForgotPasswordComponent", filePath: "src/app/components/auth/forgot-password/forgot-password.component.ts", lineNumber: 220 });
})();
export {
  ForgotPasswordComponent
};
//# sourceMappingURL=chunk-MJBR2GNN.js.map
