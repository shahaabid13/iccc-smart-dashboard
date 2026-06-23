import {
  CharteredBikeService
} from "./chunk-UV3ND3FX.js";
import {
  MatDividerModule,
  MatToolbar,
  MatToolbarModule
} from "./chunk-P4PCFTEG.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-CDHLY53M.js";
import {
  MatOption,
  MatSelect,
  MatSelectModule
} from "./chunk-GP53F2Q2.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-YVIEHVQN.js";
import "./chunk-AREEN4Y3.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-FCQFOFUY.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-L77IW56B.js";
import {
  MatFormFieldModule
} from "./chunk-WHDPFR7X.js";
import "./chunk-QWWSWOTY.js";
import {
  MatFormField,
  MatLabel,
  MatSuffix
} from "./chunk-MSRYKTCV.js";
import "./chunk-54RZU52J.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-A5CP52TD.js";
import {
  A11yModule,
  AriaDescriber,
  InteractivityChecker,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIconButton,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _VisuallyHiddenLoader,
  _animationsDisabled,
  _getAnimationsState
} from "./chunk-NNMEMFZC.js";
import "./chunk-W7WDMGEW.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-LZCG3VZ3.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-6LIGNQX5.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  HOST_TAG_NAME,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  Subject,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  numberAttribute,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-OXNL7LB6.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-TXDUYLVM.js";

// node_modules/@angular/material/fesm2022/progress-bar.mjs
function MatProgressBar_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 2);
  }
}
var MAT_PROGRESS_BAR_DEFAULT_OPTIONS = new InjectionToken("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");
var MAT_PROGRESS_BAR_LOCATION = new InjectionToken("mat-progress-bar-location", {
  providedIn: "root",
  factory: MAT_PROGRESS_BAR_LOCATION_FACTORY
});
function MAT_PROGRESS_BAR_LOCATION_FACTORY() {
  const _document = inject(DOCUMENT);
  const _location = _document ? _document.location : null;
  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => _location ? _location.pathname + _location.search : ""
  };
}
var MatProgressBar = class _MatProgressBar {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _renderer = inject(Renderer2);
  _cleanupTransitionEnd;
  constructor() {
    const animationsState = _getAnimationsState();
    const defaults = inject(MAT_PROGRESS_BAR_DEFAULT_OPTIONS, {
      optional: true
    });
    this._isNoopAnimation = animationsState === "di-disabled";
    if (animationsState === "reduced-motion") {
      this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion");
    }
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      this.mode = defaults.mode || this.mode;
    }
  }
  /** Flag that indicates whether NoopAnimations mode is set to true. */
  _isNoopAnimation;
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the progress bar. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/progress-bar/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  _color;
  _defaultColor = "primary";
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  _value = 0;
  /** Buffer value of the progress bar. Defaults to zero. */
  get bufferValue() {
    return this._bufferValue || 0;
  }
  set bufferValue(v) {
    this._bufferValue = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  _bufferValue = 0;
  /**
   * Event emitted when animation of the primary progress bar completes. This event will not
   * be emitted when animations are disabled, nor will it be emitted for modes with continuous
   * animations (indeterminate and query).
   */
  animationEnd = new EventEmitter();
  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  get mode() {
    return this._mode;
  }
  set mode(value) {
    this._mode = value;
    this._changeDetectorRef.markForCheck();
  }
  _mode = "determinate";
  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._cleanupTransitionEnd = this._renderer.listen(this._elementRef.nativeElement, "transitionend", this._transitionendHandler);
    });
  }
  ngOnDestroy() {
    this._cleanupTransitionEnd?.();
  }
  /** Gets the transform style that should be applied to the primary bar. */
  _getPrimaryBarTransform() {
    return `scaleX(${this._isIndeterminate() ? 1 : this.value / 100})`;
  }
  /** Gets the `flex-basis` value that should be applied to the buffer bar. */
  _getBufferBarFlexBasis() {
    return `${this.mode === "buffer" ? this.bufferValue : 100}%`;
  }
  /** Returns whether the progress bar is indeterminate. */
  _isIndeterminate() {
    return this.mode === "indeterminate" || this.mode === "query";
  }
  /** Event handler for `transitionend` events. */
  _transitionendHandler = (event) => {
    if (this.animationEnd.observers.length === 0 || !event.target || !event.target.classList.contains("mdc-linear-progress__primary-bar")) {
      return;
    }
    if (this.mode === "determinate" || this.mode === "buffer") {
      this._ngZone.run(() => this.animationEnd.next({
        value: this.value
      }));
    }
  };
  static \u0275fac = function MatProgressBar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressBar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatProgressBar,
    selectors: [["mat-progress-bar"]],
    hostAttrs: ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", "tabindex", "-1", 1, "mat-mdc-progress-bar", "mdc-linear-progress"],
    hostVars: 10,
    hostBindings: function MatProgressBar_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-valuenow", ctx._isIndeterminate() ? null : ctx.value)("mode", ctx.mode);
        \u0275\u0275classMap("mat-" + ctx.color);
        \u0275\u0275classProp("_mat-animation-noopable", ctx._isNoopAnimation)("mdc-linear-progress--animation-ready", !ctx._isNoopAnimation)("mdc-linear-progress--indeterminate", ctx._isIndeterminate());
      }
    },
    inputs: {
      color: "color",
      value: [2, "value", "value", numberAttribute],
      bufferValue: [2, "bufferValue", "bufferValue", numberAttribute],
      mode: "mode"
    },
    outputs: {
      animationEnd: "animationEnd"
    },
    exportAs: ["matProgressBar"],
    decls: 7,
    vars: 5,
    consts: [["aria-hidden", "true", 1, "mdc-linear-progress__buffer"], [1, "mdc-linear-progress__buffer-bar"], [1, "mdc-linear-progress__buffer-dots"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"], [1, "mdc-linear-progress__bar-inner"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__secondary-bar"]],
    template: function MatProgressBar_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275domElement(1, "div", 1);
        \u0275\u0275conditionalCreate(2, MatProgressBar_Conditional_2_Template, 1, 0, "div", 2);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(3, "div", 3);
        \u0275\u0275domElement(4, "span", 4);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(5, "div", 5);
        \u0275\u0275domElement(6, "span", 4);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleProp("flex-basis", ctx._getBufferBarFlexBasis());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.mode === "buffer" ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275styleProp("transform", ctx._getPrimaryBarTransform());
      }
    },
    styles: [".mat-mdc-progress-bar{--mat-progress-bar-animation-multiplier: 1;display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mat-progress-bar-reduced-motion{--mat-progress-bar-animation-multiplier: 2}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mat-progress-bar-track-height, 4px),var(--mat-progress-bar-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mat-progress-bar-track-height, 4px);border-radius:var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{background-image:radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);background-repeat:repeat-x;background-size:calc(calc(var(--mat-progress-bar-track-height, 4px) / 2)*5);background-position:left;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBar, [{
    type: Component,
    args: [{
      selector: "mat-progress-bar",
      exportAs: "matProgressBar",
      host: {
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        "tabindex": "-1",
        "[attr.aria-valuenow]": "_isIndeterminate() ? null : value",
        "[attr.mode]": "mode",
        "class": "mat-mdc-progress-bar mdc-linear-progress",
        "[class]": '"mat-" + color',
        "[class._mat-animation-noopable]": "_isNoopAnimation",
        "[class.mdc-linear-progress--animation-ready]": "!_isNoopAnimation",
        "[class.mdc-linear-progress--indeterminate]": "_isIndeterminate()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `<!--
  All children need to be hidden for screen readers in order to support ChromeVox.
  More context in the issue: https://github.com/angular/components/issues/22165.
-->
<div class="mdc-linear-progress__buffer" aria-hidden="true">
  <div
    class="mdc-linear-progress__buffer-bar"
    [style.flex-basis]="_getBufferBarFlexBasis()"></div>
  <!-- Remove the dots outside of buffer mode since they can cause CSP issues (see #28938) -->
  @if (mode === 'buffer') {
    <div class="mdc-linear-progress__buffer-dots"></div>
  }
</div>
<div
  class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
  aria-hidden="true"
  [style.transform]="_getPrimaryBarTransform()">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar" aria-hidden="true">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
`,
      styles: [".mat-mdc-progress-bar{--mat-progress-bar-animation-multiplier: 1;display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mat-progress-bar-reduced-motion{--mat-progress-bar-animation-multiplier: 2}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mat-progress-bar-track-height, 4px),var(--mat-progress-bar-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mat-progress-bar-track-height, 4px);border-radius:var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{background-image:radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);background-repeat:repeat-x;background-size:calc(calc(var(--mat-progress-bar-track-height, 4px) / 2)*5);background-position:left;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    bufferValue: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    animationEnd: [{
      type: Output
    }],
    mode: [{
      type: Input
    }]
  });
})();
function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
var MatProgressBarModule = class _MatProgressBarModule {
  static \u0275fac = function MatProgressBarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressBarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatProgressBarModule,
    imports: [MatProgressBar],
    exports: [MatProgressBar, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBarModule, [{
    type: NgModule,
    args: [{
      imports: [MatProgressBar],
      exports: [MatProgressBar, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/badge.mjs
var BADGE_CONTENT_CLASS = "mat-badge-content";
var _MatBadgeStyleLoader = class __MatBadgeStyleLoader {
  static \u0275fac = function _MatBadgeStyleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __MatBadgeStyleLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __MatBadgeStyleLoader,
    selectors: [["ng-component"]],
    decls: 0,
    vars: 0,
    template: function _MatBadgeStyleLoader_Template(rf, ctx) {
    },
    styles: [".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color, var(--mat-sys-error));color:var(--mat-badge-text-color, var(--mat-sys-on-error));font-family:var(--mat-badge-text-font, var(--mat-sys-label-small-font));font-weight:var(--mat-badge-text-weight, var(--mat-sys-label-small-weight));border-radius:var(--mat-badge-container-shape, var(--mat-sys-corner-full))}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}@media(forced-colors: active){.mat-badge-content{outline:solid 1px;border-radius:0}}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color, color-mix(in srgb, var(--mat-sys-error) 38%, transparent));color:var(--mat-badge-disabled-state-text-color, var(--mat-sys-on-error))}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, 6px);min-height:var(--mat-badge-small-size-container-size, 6px);line-height:var(--mat-badge-small-size-line-height, 6px);padding:var(--mat-badge-small-size-container-padding, 0);font-size:var(--mat-badge-small-size-text-size, 0);margin:var(--mat-badge-small-size-container-offset, -6px 0)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset, -6px)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, 16px);min-height:var(--mat-badge-container-size, 16px);line-height:var(--mat-badge-line-height, 16px);padding:var(--mat-badge-container-padding, 0 4px);font-size:var(--mat-badge-text-size, var(--mat-sys-label-small-size));margin:var(--mat-badge-container-offset, -12px 0)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset, -12px)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, 16px);min-height:var(--mat-badge-large-size-container-size, 16px);line-height:var(--mat-badge-large-size-line-height, 16px);padding:var(--mat-badge-large-size-container-padding, 0 4px);font-size:var(--mat-badge-large-size-text-size, var(--mat-sys-label-small-size));margin:var(--mat-badge-large-size-container-offset, -12px 0)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset, -12px)}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatBadgeStyleLoader, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color, var(--mat-sys-error));color:var(--mat-badge-text-color, var(--mat-sys-on-error));font-family:var(--mat-badge-text-font, var(--mat-sys-label-small-font));font-weight:var(--mat-badge-text-weight, var(--mat-sys-label-small-weight));border-radius:var(--mat-badge-container-shape, var(--mat-sys-corner-full))}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}@media(forced-colors: active){.mat-badge-content{outline:solid 1px;border-radius:0}}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color, color-mix(in srgb, var(--mat-sys-error) 38%, transparent));color:var(--mat-badge-disabled-state-text-color, var(--mat-sys-on-error))}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, 6px);min-height:var(--mat-badge-small-size-container-size, 6px);line-height:var(--mat-badge-small-size-line-height, 6px);padding:var(--mat-badge-small-size-container-padding, 0);font-size:var(--mat-badge-small-size-text-size, 0);margin:var(--mat-badge-small-size-container-offset, -6px 0)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset, -6px)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, 16px);min-height:var(--mat-badge-container-size, 16px);line-height:var(--mat-badge-line-height, 16px);padding:var(--mat-badge-container-padding, 0 4px);font-size:var(--mat-badge-text-size, var(--mat-sys-label-small-size));margin:var(--mat-badge-container-offset, -12px 0)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset, -12px)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, 16px);min-height:var(--mat-badge-large-size-container-size, 16px);line-height:var(--mat-badge-large-size-line-height, 16px);padding:var(--mat-badge-large-size-container-padding, 0 4px);font-size:var(--mat-badge-large-size-text-size, var(--mat-sys-label-small-size));margin:var(--mat-badge-large-size-container-offset, -12px 0)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset, -12px)}\n"]
    }]
  }], null, null);
})();
var MatBadge = class _MatBadge {
  _ngZone = inject(NgZone);
  _elementRef = inject(ElementRef);
  _ariaDescriber = inject(AriaDescriber);
  _renderer = inject(Renderer2);
  _animationsDisabled = _animationsDisabled();
  _idGenerator = inject(_IdGenerator);
  /**
   * Theme color of the badge. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/badge/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  get color() {
    return this._color;
  }
  set color(value) {
    this._setColor(value);
    this._color = value;
  }
  _color = "primary";
  /** Whether the badge should overlap its contents or not */
  overlap = true;
  /** Whether the badge is disabled. */
  disabled;
  /**
   * Position the badge should reside.
   * Accepts any combination of 'above'|'below' and 'before'|'after'
   */
  position = "above after";
  /** The content for the badge */
  get content() {
    return this._content;
  }
  set content(newContent) {
    this._updateRenderedContent(newContent);
  }
  _content;
  /** Message used to describe the decorated element via aria-describedby */
  get description() {
    return this._description;
  }
  set description(newDescription) {
    this._updateDescription(newDescription);
  }
  _description;
  /** Size of the badge. Can be 'small', 'medium', or 'large'. */
  size = "medium";
  /** Whether the badge is hidden. */
  hidden;
  /** Visible badge element. */
  _badgeElement;
  /** Inline badge description. Used when the badge is applied to non-interactive host elements. */
  _inlineBadgeDescription;
  /** Whether the OnInit lifecycle hook has run yet */
  _isInitialized = false;
  /** InteractivityChecker to determine if the badge host is focusable. */
  _interactivityChecker = inject(InteractivityChecker);
  _document = inject(DOCUMENT);
  constructor() {
    const styleLoader = inject(_CdkPrivateStyleLoader);
    styleLoader.load(_MatBadgeStyleLoader);
    styleLoader.load(_VisuallyHiddenLoader);
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const nativeElement = this._elementRef.nativeElement;
      if (nativeElement.nodeType !== nativeElement.ELEMENT_NODE) {
        throw Error("matBadge must be attached to an element node.");
      }
      const tagName = inject(HOST_TAG_NAME);
      if (tagName.toLowerCase() === "mat-icon" && nativeElement.getAttribute("aria-hidden") === "true") {
        console.warn(`Detected a matBadge on an "aria-hidden" "<mat-icon>". Consider setting aria-hidden="false" in order to surface the information assistive technology.
${nativeElement.outerHTML}`);
      }
    }
  }
  /** Whether the badge is above the host or not */
  isAbove() {
    return this.position.indexOf("below") === -1;
  }
  /** Whether the badge is after the host or not */
  isAfter() {
    return this.position.indexOf("before") === -1;
  }
  /**
   * Gets the element into which the badge's content is being rendered. Undefined if the element
   * hasn't been created (e.g. if the badge doesn't have content).
   */
  getBadgeElement() {
    return this._badgeElement;
  }
  ngOnInit() {
    this._clearExistingBadges();
    if (this.content && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
      this._updateRenderedContent(this.content);
    }
    this._isInitialized = true;
  }
  ngOnDestroy() {
    if (this._renderer.destroyNode) {
      this._renderer.destroyNode(this._badgeElement);
      this._inlineBadgeDescription?.remove();
    }
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
  }
  /** Gets whether the badge's host element is interactive. */
  _isHostInteractive() {
    return this._interactivityChecker.isFocusable(this._elementRef.nativeElement, {
      ignoreVisibility: true
    });
  }
  /** Creates the badge element */
  _createBadgeElement() {
    const badgeElement = this._renderer.createElement("span");
    const activeClass = "mat-badge-active";
    badgeElement.setAttribute("id", this._idGenerator.getId("mat-badge-content-"));
    badgeElement.setAttribute("aria-hidden", "true");
    badgeElement.classList.add(BADGE_CONTENT_CLASS);
    if (this._animationsDisabled) {
      badgeElement.classList.add("_mat-animation-noopable");
    }
    this._elementRef.nativeElement.appendChild(badgeElement);
    if (typeof requestAnimationFrame === "function" && !this._animationsDisabled) {
      this._ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          badgeElement.classList.add(activeClass);
        });
      });
    } else {
      badgeElement.classList.add(activeClass);
    }
    return badgeElement;
  }
  /** Update the text content of the badge element in the DOM, creating the element if necessary. */
  _updateRenderedContent(newContent) {
    const newContentNormalized = `${newContent ?? ""}`.trim();
    if (this._isInitialized && newContentNormalized && !this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    }
    if (this._badgeElement) {
      this._badgeElement.textContent = newContentNormalized;
    }
    this._content = newContentNormalized;
  }
  /** Updates the host element's aria description via AriaDescriber. */
  _updateDescription(newDescription) {
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.description);
    if (!newDescription || this._isHostInteractive()) {
      this._removeInlineDescription();
    }
    this._description = newDescription;
    if (this._isHostInteractive()) {
      this._ariaDescriber.describe(this._elementRef.nativeElement, newDescription);
    } else {
      this._updateInlineDescription();
    }
  }
  _updateInlineDescription() {
    if (!this._inlineBadgeDescription) {
      this._inlineBadgeDescription = this._document.createElement("span");
      this._inlineBadgeDescription.classList.add("cdk-visually-hidden");
    }
    this._inlineBadgeDescription.textContent = this.description;
    this._badgeElement?.appendChild(this._inlineBadgeDescription);
  }
  _removeInlineDescription() {
    this._inlineBadgeDescription?.remove();
    this._inlineBadgeDescription = void 0;
  }
  /** Adds css theme class given the color to the component host */
  _setColor(colorPalette) {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove(`mat-badge-${this._color}`);
    if (colorPalette) {
      classList.add(`mat-badge-${colorPalette}`);
    }
  }
  /** Clears any existing badges that might be left over from server-side rendering. */
  _clearExistingBadges() {
    const badges = this._elementRef.nativeElement.querySelectorAll(`:scope > .${BADGE_CONTENT_CLASS}`);
    for (const badgeElement of Array.from(badges)) {
      if (badgeElement !== this._badgeElement) {
        badgeElement.remove();
      }
    }
  }
  static \u0275fac = function MatBadge_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatBadge)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatBadge,
    selectors: [["", "matBadge", ""]],
    hostAttrs: [1, "mat-badge"],
    hostVars: 20,
    hostBindings: function MatBadge_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-badge-overlap", ctx.overlap)("mat-badge-above", ctx.isAbove())("mat-badge-below", !ctx.isAbove())("mat-badge-before", !ctx.isAfter())("mat-badge-after", ctx.isAfter())("mat-badge-small", ctx.size === "small")("mat-badge-medium", ctx.size === "medium")("mat-badge-large", ctx.size === "large")("mat-badge-hidden", ctx.hidden || !ctx.content)("mat-badge-disabled", ctx.disabled);
      }
    },
    inputs: {
      color: [0, "matBadgeColor", "color"],
      overlap: [2, "matBadgeOverlap", "overlap", booleanAttribute],
      disabled: [2, "matBadgeDisabled", "disabled", booleanAttribute],
      position: [0, "matBadgePosition", "position"],
      content: [0, "matBadge", "content"],
      description: [0, "matBadgeDescription", "description"],
      size: [0, "matBadgeSize", "size"],
      hidden: [2, "matBadgeHidden", "hidden", booleanAttribute]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatBadge, [{
    type: Directive,
    args: [{
      selector: "[matBadge]",
      host: {
        "class": "mat-badge",
        "[class.mat-badge-overlap]": "overlap",
        "[class.mat-badge-above]": "isAbove()",
        "[class.mat-badge-below]": "!isAbove()",
        "[class.mat-badge-before]": "!isAfter()",
        "[class.mat-badge-after]": "isAfter()",
        "[class.mat-badge-small]": 'size === "small"',
        "[class.mat-badge-medium]": 'size === "medium"',
        "[class.mat-badge-large]": 'size === "large"',
        "[class.mat-badge-hidden]": "hidden || !content",
        "[class.mat-badge-disabled]": "disabled"
      }
    }]
  }], () => [], {
    color: [{
      type: Input,
      args: ["matBadgeColor"]
    }],
    overlap: [{
      type: Input,
      args: [{
        alias: "matBadgeOverlap",
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "matBadgeDisabled",
        transform: booleanAttribute
      }]
    }],
    position: [{
      type: Input,
      args: ["matBadgePosition"]
    }],
    content: [{
      type: Input,
      args: ["matBadge"]
    }],
    description: [{
      type: Input,
      args: ["matBadgeDescription"]
    }],
    size: [{
      type: Input,
      args: ["matBadgeSize"]
    }],
    hidden: [{
      type: Input,
      args: [{
        alias: "matBadgeHidden",
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatBadgeModule = class _MatBadgeModule {
  static \u0275fac = function MatBadgeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatBadgeModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatBadgeModule,
    imports: [A11yModule, MatCommonModule, MatBadge, _MatBadgeStyleLoader],
    exports: [MatBadge, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [A11yModule, MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatBadgeModule, [{
    type: NgModule,
    args: [{
      // Note: we _shouldn't_ have to import `_MatBadgeStyleLoader`,
      // but it seems to be necessary for tests.
      imports: [A11yModule, MatCommonModule, MatBadge, _MatBadgeStyleLoader],
      exports: [MatBadge, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/components/admin/pbs-stations/pbs-stations.component.ts
function PbsStationsComponent_section_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 14)(1, "mat-card", 15)(2, "div", 16)(3, "mat-icon");
    \u0275\u0275text(4, "directions_bike");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 17)(6, "span", 18);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 19);
    \u0275\u0275text(9, "Total Bikes Available");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "mat-card", 15)(11, "div", 20)(12, "mat-icon");
    \u0275\u0275text(13, "inventory_2");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 17)(15, "span", 18);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 19);
    \u0275\u0275text(18, "Total Fleet");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "mat-card", 15)(20, "div", 21)(21, "mat-icon");
    \u0275\u0275text(22, "location_on");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 17)(24, "span", 18);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 19);
    \u0275\u0275text(27, "Active Stations");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "mat-card", 15)(29, "div", 22)(30, "mat-icon");
    \u0275\u0275text(31, "pedal_bike");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 17)(33, "span", 18);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 19);
    \u0275\u0275text(36, "Bikes On Trip");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "mat-card", 15)(38, "div", 23)(39, "mat-icon");
    \u0275\u0275text(40, "trending_up");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 17)(42, "span", 18);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 19);
    \u0275\u0275text(45, "Utilization Rate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "mat-card", 15)(47, "div", 24)(48, "mat-icon");
    \u0275\u0275text(49, "location_city");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 17)(51, "span", 18);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "span", 19);
    \u0275\u0275text(54, "Total Stations");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.getTotalAvailable());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.getTotalFleet());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.getActiveStationsCount());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.getTotalOnTrip());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("", ctx_r0.getUtilizationRate(), "%");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.filteredStations.length);
  }
}
function PbsStationsComponent_section_28_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function PbsStationsComponent_section_28_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      ctx_r0.searchQuery = "";
      return \u0275\u0275resetView(ctx_r0.applyFilters());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "close");
    \u0275\u0275elementEnd()();
  }
}
function PbsStationsComponent_section_28_mat_option_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r4 = ctx.$implicit;
    \u0275\u0275property("value", option_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r4, " ");
  }
}
function PbsStationsComponent_section_28_mat_option_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r5 = ctx.$implicit;
    \u0275\u0275property("value", status_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", status_r5.label, " ");
  }
}
function PbsStationsComponent_section_28_mat_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r6 = ctx.$implicit;
    \u0275\u0275property("value", option_r6.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r6.label, " ");
  }
}
function PbsStationsComponent_section_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 25)(1, "div", 26)(2, "mat-form-field", 27)(3, "mat-label");
    \u0275\u0275text(4, "Search station");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function PbsStationsComponent_section_28_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.searchQuery, $event) || (ctx_r0.searchQuery = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function PbsStationsComponent_section_28_Template_input_input_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyFilters());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, PbsStationsComponent_section_28_button_6_Template, 3, 0, "button", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-form-field", 30)(8, "mat-label");
    \u0275\u0275text(9, "Min bikes available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-select", 31);
    \u0275\u0275twoWayListener("ngModelChange", function PbsStationsComponent_section_28_Template_mat_select_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.minBikesFilter, $event) || (ctx_r0.minBikesFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function PbsStationsComponent_section_28_Template_mat_select_selectionChange_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyFilters());
    });
    \u0275\u0275template(11, PbsStationsComponent_section_28_mat_option_11_Template, 2, 2, "mat-option", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "mat-form-field", 30)(13, "mat-label");
    \u0275\u0275text(14, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-select", 31);
    \u0275\u0275twoWayListener("ngModelChange", function PbsStationsComponent_section_28_Template_mat_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.statusFilter, $event) || (ctx_r0.statusFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function PbsStationsComponent_section_28_Template_mat_select_selectionChange_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyFilters());
    });
    \u0275\u0275elementStart(16, "mat-option", 33);
    \u0275\u0275text(17, "All statuses");
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, PbsStationsComponent_section_28_mat_option_18_Template, 2, 2, "mat-option", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-form-field", 30)(20, "mat-label");
    \u0275\u0275text(21, "Sort by");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-select", 31);
    \u0275\u0275twoWayListener("ngModelChange", function PbsStationsComponent_section_28_Template_mat_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.sortField, $event) || (ctx_r0.sortField = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function PbsStationsComponent_section_28_Template_mat_select_selectionChange_22_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.applyFilters());
    });
    \u0275\u0275template(23, PbsStationsComponent_section_28_mat_option_23_Template, 2, 2, "mat-option", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "button", 34);
    \u0275\u0275listener("click", function PbsStationsComponent_section_28_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.toggleSortDir());
    });
    \u0275\u0275elementStart(25, "mat-icon");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 35)(28, "mat-icon");
    \u0275\u0275text(29, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 36)(33, "button", 37);
    \u0275\u0275listener("click", function PbsStationsComponent_section_28_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewMode = "table");
    });
    \u0275\u0275elementStart(34, "mat-icon");
    \u0275\u0275text(35, "table_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(36, " Table ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 37);
    \u0275\u0275listener("click", function PbsStationsComponent_section_28_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.viewMode = "grid");
    });
    \u0275\u0275elementStart(38, "mat-icon");
    \u0275\u0275text(39, "grid_view");
    \u0275\u0275elementEnd();
    \u0275\u0275text(40, " Cards ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 38);
    \u0275\u0275listener("click", function PbsStationsComponent_section_28_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearFilters());
    });
    \u0275\u0275elementStart(42, "mat-icon");
    \u0275\u0275text(43, "filter_alt_off");
    \u0275\u0275elementEnd();
    \u0275\u0275text(44, " Clear filters ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.searchQuery);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.searchQuery);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.minBikesFilter);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.minBikesOptions);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.statusFilter);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.statusOptions);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.sortField);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.sortOptions);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.sortDir === "asc" ? "arrow_upward" : "arrow_downward");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r0.filteredStations.length, " results");
    \u0275\u0275advance(2);
    \u0275\u0275property("color", ctx_r0.viewMode === "table" ? "primary" : void 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("color", ctx_r0.viewMode === "grid" ? "primary" : void 0);
  }
}
function PbsStationsComponent_section_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 41)(1, "mat-card", 42)(2, "mat-icon");
    \u0275\u0275text(3, "lock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "Not authenticated");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Please login to view bike station analytics and refresh the dashboard.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 43);
    \u0275\u0275listener("click", function PbsStationsComponent_section_29_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadData());
    });
    \u0275\u0275text(9, "Login");
    \u0275\u0275elementEnd()()();
  }
}
function PbsStationsComponent_section_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 41)(1, "mat-card", 44)(2, "mat-icon");
    \u0275\u0275text(3, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "Unable to load stations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 43);
    \u0275\u0275listener("click", function PbsStationsComponent_section_30_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.refreshData());
    });
    \u0275\u0275text(9, "Retry");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage || "Something went wrong while fetching station data.");
  }
}
function PbsStationsComponent_section_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 41)(1, "mat-card", 45)(2, "mat-icon");
    \u0275\u0275text(3, "hourglass_empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2");
    \u0275\u0275text(5, "No stations match your filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Try updating the search, status filter, or minimum bikes available.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 43);
    \u0275\u0275listener("click", function PbsStationsComponent_section_31_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearFilters());
    });
    \u0275\u0275text(9, "Reset filters");
    \u0275\u0275elementEnd()()();
  }
}
function PbsStationsComponent_section_32_div_2_th_3_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDir === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function PbsStationsComponent_section_32_div_2_th_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 71);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_div_2_th_3_Template_th_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.setSort("stationName"));
    });
    \u0275\u0275elementStart(1, "div", 72)(2, "span");
    \u0275\u0275text(3, "Station");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PbsStationsComponent_section_32_div_2_th_3_mat_icon_4_Template, 2, 1, "mat-icon", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.sortField === "stationName");
  }
}
function PbsStationsComponent_section_32_div_2_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 74)(1, "div", 75)(2, "span", 76);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 77);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const station_r12 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(station_r12.stationName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", station_r12.stationNumber);
  }
}
function PbsStationsComponent_section_32_div_2_th_6_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDir === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function PbsStationsComponent_section_32_div_2_th_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 71);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_div_2_th_6_Template_th_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.setSort("bikesAvailable"));
    });
    \u0275\u0275elementStart(1, "div", 72)(2, "span");
    \u0275\u0275text(3, "Available");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PbsStationsComponent_section_32_div_2_th_6_mat_icon_4_Template, 2, 1, "mat-icon", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.sortField === "bikesAvailable");
  }
}
function PbsStationsComponent_section_32_div_2_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 74)(1, "div", 78)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "mat-progress-bar", 79);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const station_r14 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(station_r14.bikesAvailable);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.getAvailabilityValue(station_r14))("color", ctx_r0.getAvailabilityColor(station_r14));
  }
}
function PbsStationsComponent_section_32_div_2_th_9_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDir === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function PbsStationsComponent_section_32_div_2_th_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 71);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_div_2_th_9_Template_th_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.setSort("bikesTotal"));
    });
    \u0275\u0275elementStart(1, "div", 72)(2, "span");
    \u0275\u0275text(3, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PbsStationsComponent_section_32_div_2_th_9_mat_icon_4_Template, 2, 1, "mat-icon", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.sortField === "bikesTotal");
  }
}
function PbsStationsComponent_section_32_div_2_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const station_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(station_r16.bikesTotal);
  }
}
function PbsStationsComponent_section_32_div_2_th_12_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDir === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function PbsStationsComponent_section_32_div_2_th_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 71);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_div_2_th_12_Template_th_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.setSort("reportOnTripBikes"));
    });
    \u0275\u0275elementStart(1, "div", 72)(2, "span");
    \u0275\u0275text(3, "On Trip");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PbsStationsComponent_section_32_div_2_th_12_mat_icon_4_Template, 2, 1, "mat-icon", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.sortField === "reportOnTripBikes");
  }
}
function PbsStationsComponent_section_32_div_2_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const station_r18 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(station_r18.reportOnTripBikes);
  }
}
function PbsStationsComponent_section_32_div_2_th_15_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDir === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function PbsStationsComponent_section_32_div_2_th_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 71);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_div_2_th_15_Template_th_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.setSort("availabilityPercentage"));
    });
    \u0275\u0275elementStart(1, "div", 72)(2, "span");
    \u0275\u0275text(3, "Utilization %");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PbsStationsComponent_section_32_div_2_th_15_mat_icon_4_Template, 2, 1, "mat-icon", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r0.sortField === "availabilityPercentage");
  }
}
function PbsStationsComponent_section_32_div_2_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 74)(1, "div", 78)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "mat-progress-bar", 80);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const station_r20 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", station_r20.availabilityPercentage, "%");
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.getAvailabilityValue(station_r20))("color", ctx_r0.getAvailabilityColor(station_r20));
  }
}
function PbsStationsComponent_section_32_div_2_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 81)(1, "span");
    \u0275\u0275text(2, "Coordinates");
    \u0275\u0275elementEnd()();
  }
}
function PbsStationsComponent_section_32_div_2_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const station_r21 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatCoordinates(station_r21), " ");
  }
}
function PbsStationsComponent_section_32_div_2_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 81)(1, "span");
    \u0275\u0275text(2, "Status");
    \u0275\u0275elementEnd()();
  }
}
function PbsStationsComponent_section_32_div_2_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 74)(1, "span", 82);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const station_r22 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", station_r22.statusColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", station_r22.statusLabel, " ");
  }
}
function PbsStationsComponent_section_32_div_2_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 81)(1, "span");
    \u0275\u0275text(2, "Actions");
    \u0275\u0275elementEnd()();
  }
}
function PbsStationsComponent_section_32_div_2_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 74)(1, "button", 83)(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 84)(5, "mat-icon");
    \u0275\u0275text(6, "place");
    \u0275\u0275elementEnd()()();
  }
}
function PbsStationsComponent_section_32_div_2_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 85);
  }
}
function PbsStationsComponent_section_32_div_2_tr_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 86);
  }
}
function PbsStationsComponent_section_32_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "table", 57);
    \u0275\u0275elementContainerStart(2, 58);
    \u0275\u0275template(3, PbsStationsComponent_section_32_div_2_th_3_Template, 5, 1, "th", 59)(4, PbsStationsComponent_section_32_div_2_td_4_Template, 6, 2, "td", 60);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 61);
    \u0275\u0275template(6, PbsStationsComponent_section_32_div_2_th_6_Template, 5, 1, "th", 59)(7, PbsStationsComponent_section_32_div_2_td_7_Template, 5, 3, "td", 60);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 62);
    \u0275\u0275template(9, PbsStationsComponent_section_32_div_2_th_9_Template, 5, 1, "th", 59)(10, PbsStationsComponent_section_32_div_2_td_10_Template, 2, 1, "td", 60);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 63);
    \u0275\u0275template(12, PbsStationsComponent_section_32_div_2_th_12_Template, 5, 1, "th", 59)(13, PbsStationsComponent_section_32_div_2_td_13_Template, 2, 1, "td", 60);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 64);
    \u0275\u0275template(15, PbsStationsComponent_section_32_div_2_th_15_Template, 5, 1, "th", 59)(16, PbsStationsComponent_section_32_div_2_td_16_Template, 5, 3, "td", 60);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 65);
    \u0275\u0275template(18, PbsStationsComponent_section_32_div_2_th_18_Template, 3, 0, "th", 66)(19, PbsStationsComponent_section_32_div_2_td_19_Template, 2, 1, "td", 60);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 67);
    \u0275\u0275template(21, PbsStationsComponent_section_32_div_2_th_21_Template, 3, 0, "th", 66)(22, PbsStationsComponent_section_32_div_2_td_22_Template, 3, 3, "td", 60);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(23, 68);
    \u0275\u0275template(24, PbsStationsComponent_section_32_div_2_th_24_Template, 3, 0, "th", 66)(25, PbsStationsComponent_section_32_div_2_td_25_Template, 7, 0, "td", 60);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(26, PbsStationsComponent_section_32_div_2_tr_26_Template, 1, 0, "tr", 69)(27, PbsStationsComponent_section_32_div_2_tr_27_Template, 1, 0, "tr", 70);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r0.pagedStations);
    \u0275\u0275advance(25);
    \u0275\u0275property("matHeaderRowDef", ctx_r0.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r0.displayedColumns);
  }
}
function PbsStationsComponent_section_32_div_3_mat_card_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 89)(1, "div", 90)(2, "div")(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 91);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 82);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 92)(10, "div", 93)(11, "span", 94);
    \u0275\u0275text(12, "Available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 93)(16, "span", 94);
    \u0275\u0275text(17, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 93)(21, "span", 94);
    \u0275\u0275text(22, "On Trip");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "strong");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 95)(26, "span");
    \u0275\u0275text(27, "Utilization");
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "mat-progress-bar", 96);
    \u0275\u0275elementStart(29, "span", 97);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const station_r23 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(station_r23.stationName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", station_r23.stationNumber);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", station_r23.statusColor);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", station_r23.statusLabel, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(station_r23.bikesAvailable);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(station_r23.bikesTotal);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(station_r23.reportOnTripBikes);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r0.getAvailabilityValue(station_r23))("color", ctx_r0.getAvailabilityColor(station_r23));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", station_r23.availabilityPercentage, "%");
  }
}
function PbsStationsComponent_section_32_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87);
    \u0275\u0275template(1, PbsStationsComponent_section_32_div_3_mat_card_1_Template, 31, 11, "mat-card", 88);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.pagedStations);
  }
}
function PbsStationsComponent_section_32_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "button", 98);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_ng_container_12_Template_button_click_1_listener() {
      const page_r25 = \u0275\u0275restoreView(_r24).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.goToPage(page_r25));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const page_r25 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("color", page_r25 === ctx_r0.currentPage ? "primary" : void 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r25, " ");
  }
}
function PbsStationsComponent_section_32_mat_option_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r26 = ctx.$implicit;
    \u0275\u0275property("value", option_r26);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r26, " ");
  }
}
function PbsStationsComponent_section_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 46)(1, "div", 47);
    \u0275\u0275template(2, PbsStationsComponent_section_32_div_2_Template, 28, 3, "div", 48)(3, PbsStationsComponent_section_32_div_3_Template, 2, 1, "div", 49);
    \u0275\u0275elementStart(4, "div", 50)(5, "div", 51)(6, "button", 52);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goToPage(1));
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "first_page");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 52);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goToPage(ctx_r0.currentPage - 1));
    });
    \u0275\u0275elementStart(10, "mat-icon");
    \u0275\u0275text(11, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, PbsStationsComponent_section_32_ng_container_12_Template, 3, 2, "ng-container", 53);
    \u0275\u0275elementStart(13, "button", 52);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goToPage(ctx_r0.currentPage + 1));
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "chevron_right");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 52);
    \u0275\u0275listener("click", function PbsStationsComponent_section_32_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.goToPage(ctx_r0.totalPages));
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18, "last_page");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 54)(20, "span");
    \u0275\u0275text(21, "Rows per page");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-form-field", 55)(23, "mat-select", 31);
    \u0275\u0275twoWayListener("ngModelChange", function PbsStationsComponent_section_32_Template_mat_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.pageSize, $event) || (ctx_r0.pageSize = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function PbsStationsComponent_section_32_Template_mat_select_selectionChange_23_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPageSizeChange());
    });
    \u0275\u0275template(24, PbsStationsComponent_section_32_mat_option_24_Template, 2, 2, "mat-option", 32);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.viewMode === "table");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.viewMode === "grid");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.currentPage === 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r0.getPageNumbers());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.currentPage === ctx_r0.totalPages);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.currentPage === ctx_r0.totalPages);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.pageSize);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.pageSizeOptions);
  }
}
var PbsStationsComponent = class _PbsStationsComponent {
  charteredBikeService;
  allStations = [];
  filteredStations = [];
  pagedStations = [];
  companyName = "Chartered Bike";
  primaryColor = "#00844A";
  isLoading = false;
  hasError = false;
  isAuthenticated = false;
  errorMessage = null;
  lastUpdated = null;
  viewMode = "table";
  statusFilter = "";
  sortField = "stationName";
  sortDir = "asc";
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  searchQuery = "";
  minBikesFilter = 0;
  displayedColumns = [
    "stationName",
    "available",
    "total",
    "onTrip",
    "utilization",
    "coordinates",
    "status",
    "actions"
  ];
  statusOptions = [
    { label: "Available", value: "Available" },
    { label: "Moderate", value: "Moderate" },
    { label: "Low Stock", value: "Low Stock" },
    { label: "Empty", value: "Empty" }
  ];
  sortOptions = [
    { label: "Station Name", value: "stationName" },
    { label: "Available", value: "bikesAvailable" },
    { label: "Total", value: "bikesTotal" },
    { label: "On Trip", value: "reportOnTripBikes" },
    { label: "Utilization", value: "availabilityPercentage" },
    { label: "Status", value: "statusLabel" }
  ];
  pageSizeOptions = [10, 20, 50];
  minBikesOptions = [0, 1, 2, 5, 10];
  destroy$ = new Subject();
  constructor(charteredBikeService) {
    this.charteredBikeService = charteredBikeService;
  }
  ngOnInit() {
    this.subscribeToServiceStates();
    this.loadData();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  subscribeToServiceStates() {
    this.charteredBikeService.loading$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.isLoading = state;
    });
    this.charteredBikeService.error$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      this.errorMessage = error;
      this.hasError = !!error;
    });
    this.charteredBikeService.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }
  loadData() {
    if (!this.isAuthenticated) {
      this.authenticate();
      return;
    }
    this.fetchStations();
  }
  authenticate() {
    this.isLoading = true;
    this.charteredBikeService.login().pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.fetchStations(),
      error: () => {
        this.isLoading = false;
      }
    });
  }
  fetchStations() {
    this.charteredBikeService.getStations().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        const company = response.data?.[0];
        if (company) {
          this.companyName = company.companyName || this.companyName;
          this.primaryColor = company.primaryColor || this.primaryColor;
          this.allStations = (company.mapStationDTOs || []).map((station) => this.enrichStation(station));
          this.applyFilters();
          this.lastUpdated = /* @__PURE__ */ new Date();
        } else {
          this.allStations = [];
          this.applyFilters();
        }
      },
      error: () => {
        this.allStations = [];
        this.applyFilters();
      }
    });
  }
  enrichStation(station) {
    const total = station.bikesTotal || 0;
    const available = station.bikesAvailable || 0;
    const availabilityPercentage = total > 0 ? Math.round(available / total * 100) : 0;
    let statusColor = "#4CAF50";
    let statusLabel = "Available";
    if (availabilityPercentage === 0) {
      statusColor = "#F44336";
      statusLabel = "Empty";
    } else if (availabilityPercentage < 25) {
      statusColor = "#FF9800";
      statusLabel = "Low Stock";
    } else if (availabilityPercentage < 75) {
      statusColor = "#FFC107";
      statusLabel = "Moderate";
    }
    return __spreadProps(__spreadValues({}, station), {
      availabilityPercentage,
      statusColor,
      statusLabel
    });
  }
  applyFilters() {
    const normalizedQuery = this.searchQuery.trim().toLowerCase();
    this.filteredStations = this.allStations.filter((station) => {
      const matchesSearch = !normalizedQuery || station.stationName.toLowerCase().includes(normalizedQuery) || station.stationNumber.toString().includes(normalizedQuery);
      const matchesMinBikes = station.bikesAvailable >= this.minBikesFilter;
      const matchesStatus = !this.statusFilter || station.statusLabel === this.statusFilter;
      return matchesSearch && matchesMinBikes && matchesStatus;
    }).sort((a, b) => this.compareStations(a, b));
    this.updatePagination();
  }
  setSort(field) {
    if (this.sortField === field) {
      this.toggleSortDir();
      return;
    }
    this.sortField = field;
    this.sortDir = "asc";
    this.applyFilters();
  }
  toggleSortDir() {
    this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    this.applyFilters();
  }
  clearFilters() {
    this.searchQuery = "";
    this.minBikesFilter = 0;
    this.statusFilter = "";
    this.sortField = "stationName";
    this.sortDir = "asc";
    this.currentPage = 1;
    this.viewMode = "table";
    this.applyFilters();
  }
  goToPage(page) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }
  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }
  getPageNumbers() {
    const pages = [];
    const from = Math.max(1, this.currentPage - 2);
    const to = Math.min(this.totalPages, from + 4);
    for (let i = from; i <= to; i += 1) {
      pages.push(i);
    }
    return pages;
  }
  getTotalOnTrip() {
    return this.filteredStations.reduce((sum, station) => sum + (station.reportOnTripBikes || 0), 0);
  }
  getUtilizationRate() {
    const totalBikes = this.filteredStations.reduce((sum, station) => sum + (station.bikesTotal || 0), 0);
    const availableBikes = this.filteredStations.reduce((sum, station) => sum + (station.bikesAvailable || 0), 0);
    return totalBikes ? Math.round(availableBikes / totalBikes * 100) : 0;
  }
  getTotalAvailable() {
    return this.filteredStations.reduce((sum, station) => sum + (station.bikesAvailable || 0), 0);
  }
  getTotalFleet() {
    return this.filteredStations.reduce((sum, station) => sum + (station.bikesTotal || 0), 0);
  }
  getActiveStationsCount() {
    return this.filteredStations.filter((station) => station.active).length;
  }
  getAvailabilityValue(station) {
    return station.availabilityPercentage ?? 0;
  }
  getAvailabilityColor(station) {
    const percent = station.availabilityPercentage ?? 0;
    if (percent === 0) {
      return "warn";
    }
    if (percent < 25) {
      return "warn";
    }
    if (percent < 75) {
      return "accent";
    }
    return "primary";
  }
  refreshData() {
    this.charteredBikeService.clearError();
    this.loadData();
  }
  logout() {
    this.charteredBikeService.logout();
    this.allStations = [];
    this.filteredStations = [];
    this.pagedStations = [];
    this.companyName = "Chartered Bike";
    this.lastUpdated = null;
    this.isAuthenticated = false;
  }
  formatCoordinates(station) {
    return `${station.latitude}, ${station.longitude}`;
  }
  compareStations(a, b) {
    const field = this.sortField;
    const valueA = a[field] ?? "";
    const valueB = b[field] ?? "";
    if (typeof valueA === "number" && typeof valueB === "number") {
      return this.sortDir === "asc" ? valueA - valueB : valueB - valueA;
    }
    const textA = String(valueA).toLowerCase();
    const textB = String(valueB).toLowerCase();
    return this.sortDir === "asc" ? textA.localeCompare(textB) : textB.localeCompare(textA);
  }
  updatePagination() {
    this.totalPages = Math.max(1, Math.ceil(this.filteredStations.length / this.pageSize));
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedStations = this.filteredStations.slice(startIndex, startIndex + this.pageSize);
  }
  static \u0275fac = function PbsStationsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PbsStationsComponent)(\u0275\u0275directiveInject(CharteredBikeService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PbsStationsComponent, selectors: [["app-pbs-stations"]], decls: 33, vars: 13, consts: [[1, "pbs-dashboard"], ["color", "primary", 1, "topbar"], [1, "brand"], [1, "logo-shell"], [1, "company-name"], [1, "subtitle"], [1, "topbar-actions"], [1, "update-chip"], ["mat-stroked-button", "", "color", "accent", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["class", "kpi-row", 4, "ngIf"], ["class", "filter-bar", 4, "ngIf"], ["class", "state-panel", 4, "ngIf"], ["class", "content-area", 4, "ngIf"], [1, "kpi-row"], [1, "kpi-card"], [1, "kpi-icon", "primary"], [1, "kpi-copy"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-icon", "secondary"], [1, "kpi-icon", "success"], [1, "kpi-icon", "warning"], [1, "kpi-icon", "info"], [1, "kpi-icon", "neutral"], [1, "filter-bar"], [1, "filter-row"], ["appearance", "fill", 1, "filter-field", "search-field"], ["matInput", "", "placeholder", "Name or number", 3, "ngModelChange", "input", "ngModel"], ["matSuffix", "", "mat-icon-button", "", "aria-label", "Clear search", 3, "click", 4, "ngIf"], ["appearance", "fill", 1, "filter-field"], [3, "ngModelChange", "selectionChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["value", ""], ["mat-icon-button", "", "matTooltip", "Toggle sort direction", 1, "sort-direction", 3, "click"], [1, "results-badge"], [1, "view-switcher"], ["mat-stroked-button", "", 3, "click", "color"], ["mat-button", "", "color", "warn", 3, "click"], ["matSuffix", "", "mat-icon-button", "", "aria-label", "Clear search", 3, "click"], [3, "value"], [1, "state-panel"], [1, "state-card", "warning-card"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "state-card", "error-card"], [1, "state-card", "empty-card"], [1, "content-area"], [1, "data-panel"], ["class", "table-wrapper", 4, "ngIf"], ["class", "card-grid", 4, "ngIf"], [1, "pagination-bar"], [1, "pagination-controls"], ["mat-icon-button", "", 3, "click", "disabled"], [4, "ngFor", "ngForOf"], [1, "page-size-control"], ["appearance", "fill", 1, "page-size-field"], [1, "table-wrapper"], ["mat-table", "", 1, "mat-elevation-z1", 3, "dataSource"], ["matColumnDef", "stationName"], ["mat-header-cell", "", "class", "sortable", 3, "click", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "available"], ["matColumnDef", "total"], ["matColumnDef", "onTrip"], ["matColumnDef", "utilization"], ["matColumnDef", "coordinates"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", 1, "sortable", 3, "click"], [1, "sortable-inner"], [4, "ngIf"], ["mat-cell", ""], [1, "station-cell"], [1, "station-title"], [1, "station-subtitle"], [1, "metric-cell"], [1, "mini-bar", 3, "value", "color"], ["mode", "determinate", 1, "mini-bar", 3, "value", "color"], ["mat-header-cell", ""], [1, "status-chip"], ["mat-icon-button", "", "matTooltip", "View station"], ["mat-icon-button", "", "matTooltip", "Navigate"], ["mat-header-row", ""], ["mat-row", ""], [1, "card-grid"], ["class", "station-card", 4, "ngFor", "ngForOf"], [1, "station-card"], [1, "card-top"], [1, "station-number"], [1, "card-metrics"], [1, "metric-block"], [1, "metric-label"], [1, "progress-group"], [3, "value", "color"], [1, "progress-label"], ["mat-button", "", 3, "click", "color"]], template: function PbsStationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-toolbar", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon");
      \u0275\u0275text(5, "directions_bike");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "div", 4);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 5);
      \u0275\u0275text(10, "Bike Station Operations");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 6)(12, "div", 7)(13, "mat-icon");
      \u0275\u0275text(14, "schedule");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " Last updated: ");
      \u0275\u0275elementStart(16, "span");
      \u0275\u0275text(17);
      \u0275\u0275pipe(18, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "button", 8);
      \u0275\u0275listener("click", function PbsStationsComponent_Template_button_click_19_listener() {
        return ctx.refreshData();
      });
      \u0275\u0275elementStart(20, "mat-icon");
      \u0275\u0275text(21, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(22, " Refresh ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "button", 9);
      \u0275\u0275listener("click", function PbsStationsComponent_Template_button_click_23_listener() {
        return ctx.logout();
      });
      \u0275\u0275elementStart(24, "mat-icon");
      \u0275\u0275text(25, "logout");
      \u0275\u0275elementEnd();
      \u0275\u0275text(26, " Logout ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(27, PbsStationsComponent_section_27_Template, 55, 6, "section", 10)(28, PbsStationsComponent_section_28_Template, 45, 12, "section", 11)(29, PbsStationsComponent_section_29_Template, 10, 0, "section", 12)(30, PbsStationsComponent_section_30_Template, 10, 1, "section", 12)(31, PbsStationsComponent_section_31_Template, 10, 0, "section", 12)(32, PbsStationsComponent_section_32_Template, 25, 9, "section", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275styleProp("background-color", ctx.primaryColor);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.companyName);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.lastUpdated ? \u0275\u0275pipeBind2(18, 10, ctx.lastUpdated, "short") : "N/A");
      \u0275\u0275advance(10);
      \u0275\u0275property("ngIf", ctx.isAuthenticated && !ctx.hasError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isAuthenticated && !ctx.hasError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isAuthenticated);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.hasError && ctx.isAuthenticated);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && ctx.isAuthenticated && !ctx.hasError && !ctx.filteredStations.length);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isAuthenticated && !ctx.hasError && ctx.filteredStations.length);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatToolbarModule,
    MatToolbar,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatCardModule,
    MatCard,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatProgressBarModule,
    MatProgressBar,
    MatBadgeModule,
    MatTooltipModule,
    MatTooltip,
    MatDividerModule,
    DatePipe
  ], styles: ['@import "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;700&display=swap";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: "DM Sans", sans-serif;\n  color: #1f2937;\n  background: #f4f6fb;\n  min-height: 100vh;\n}\n.pbs-dashboard[_ngcontent-%COMP%] {\n  --surface: #ffffff;\n  --surface-alt: #f8fafc;\n  --primary: #0f6cff;\n  --text: #111827;\n  --muted: #6b7280;\n  --success: #10b981;\n  --warning: #f59e0b;\n  --danger: #ef4444;\n  --border: rgba(15, 23, 42, 0.08);\n  padding: 1rem;\n}\n.topbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.9rem 1.2rem;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(15, 108, 255, 0.92),\n      rgba(56, 189, 248, 0.92));\n  color: white;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.logo-shell[_ngcontent-%COMP%] {\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 1rem;\n  display: grid;\n  place-items: center;\n  color: white;\n  box-shadow: 0 12px 30px rgba(15, 108, 255, 0.2);\n}\n.company-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.1rem;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.85);\n  font-size: 0.9rem;\n}\n.topbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.update-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.6rem 0.9rem;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.12);\n  color: white;\n  font-size: 0.95rem;\n}\n.kpi-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  gap: 1rem;\n  margin: 1.4rem 0;\n}\n.kpi-card[_ngcontent-%COMP%] {\n  border-radius: 1rem;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);\n  background: var(--surface);\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n.kpi-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);\n}\n.kpi-icon[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 1rem;\n  display: grid;\n  place-items: center;\n  color: white;\n  font-size: 1.4rem;\n  flex-shrink: 0;\n}\n.kpi-icon.primary[_ngcontent-%COMP%] {\n  background: var(--primary);\n}\n.kpi-icon.secondary[_ngcontent-%COMP%] {\n  background: #0ea5e9;\n}\n.kpi-icon.success[_ngcontent-%COMP%] {\n  background: var(--success);\n}\n.kpi-icon.warning[_ngcontent-%COMP%] {\n  background: var(--warning);\n}\n.kpi-icon.info[_ngcontent-%COMP%] {\n  background: #7c3aed;\n}\n.kpi-icon.neutral[_ngcontent-%COMP%] {\n  background: #64748b;\n}\n.kpi-copy[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.25rem;\n  min-width: 0;\n}\n.kpi-value[_ngcontent-%COMP%] {\n  font-size: 1.7rem;\n  font-family: "DM Mono", monospace;\n  color: var(--text);\n  line-height: 1;\n}\n.kpi-label[_ngcontent-%COMP%] {\n  color: var(--muted);\n  font-size: 0.85rem;\n}\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  padding: 1.2rem;\n  border-radius: 1.2rem;\n  background: var(--surface);\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);\n  background-color: white !important;\n}\n.filter-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.8fr repeat(4, 1fr) auto auto;\n  gap: 1rem;\n  align-items: center;\n}\n.filter-field[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: white !important;\n}\n.search-field[_ngcontent-%COMP%] {\n  min-width: 0;\n}\nmat-option[_ngcontent-%COMP%] {\n  background-color: white !important;\n}\n.results-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  color: var(--text);\n  font-weight: 600;\n  padding: 0.65rem 0.9rem;\n  background: var(--surface-alt);\n  border: 1px solid var(--border);\n  border-radius: 999px;\n  white-space: nowrap;\n}\n.view-switcher[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.state-panel[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  padding: 2rem 0;\n}\n.state-card[_ngcontent-%COMP%] {\n  width: min(560px, 100%);\n  text-align: center;\n  padding: 2rem;\n  border-radius: 1.25rem;\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n  background: var(--surface);\n}\n.warning-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(249, 115, 22, 0.16);\n}\n.error-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(239, 68, 68, 0.16);\n}\n.empty-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(79, 70, 229, 0.16);\n}\n.content-area[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border-radius: 1rem;\n  background: var(--surface);\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);\n}\ntable.mat-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 860px;\n  border-collapse: collapse;\n  table-layout: fixed;\n}\n.mat-header-row[_ngcontent-%COMP%], \n.mat-row[_ngcontent-%COMP%] {\n  display: table-row !important;\n  height: 48px !important;\n}\nth.mat-header-cell[_ngcontent-%COMP%], \ntd.mat-cell[_ngcontent-%COMP%] {\n  display: table-cell !important;\n  box-sizing: border-box;\n  padding: 12px 14px !important;\n  border-bottom: 1px solid rgba(15, 23, 42, 0.07) !important;\n  vertical-align: middle;\n}\nth.mat-header-cell[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\ntr.mat-row[_ngcontent-%COMP%]:hover {\n  background: #f5f8ff;\n}\n.mat-column-stationName[_ngcontent-%COMP%] {\n  width: 22%;\n}\n.mat-column-available[_ngcontent-%COMP%] {\n  width: 12%;\n  text-align: center;\n}\n.mat-column-total[_ngcontent-%COMP%] {\n  width: 7%;\n  text-align: center;\n}\n.mat-column-onTrip[_ngcontent-%COMP%] {\n  width: 7%;\n  text-align: center;\n}\n.mat-column-utilization[_ngcontent-%COMP%] {\n  width: 14%;\n  text-align: center;\n}\n.mat-column-coordinates[_ngcontent-%COMP%] {\n  width: 20%;\n}\n.mat-column-status[_ngcontent-%COMP%] {\n  width: 11%;\n  text-align: center;\n}\n.mat-column-actions[_ngcontent-%COMP%] {\n  width: 7%;\n  text-align: center;\n}\n.sortable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.sortable-inner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n  white-space: nowrap;\n  overflow: hidden;\n  width: 100%;\n}\n.sortable-inner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.sortable-inner[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  line-height: 14px;\n}\n.metric-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: center;\n  width: 100%;\n}\n.metric-cell[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: "DM Mono", monospace;\n  font-size: 0.95rem;\n}\n.metric-cell[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%] {\n  width: 100% !important;\n  max-width: 100% !important;\n  min-width: 0 !important;\n  display: block !important;\n}\n.station-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.station-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.93rem;\n}\n.station-subtitle[_ngcontent-%COMP%] {\n  color: var(--muted);\n  font-size: 0.82rem;\n}\n.status-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.card-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n  padding: 1rem;\n}\n.station-card[_ngcontent-%COMP%] {\n  border-radius: 1.25rem;\n  padding: 1.3rem;\n  background: var(--surface);\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n.station-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n}\n.card-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n}\n.card-top[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.station-number[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--muted);\n  font-size: 0.88rem;\n  margin-top: 0.3rem;\n}\n.card-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n.metric-block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.metric-block[_ngcontent-%COMP%]   .metric-label[_ngcontent-%COMP%] {\n  color: var(--muted);\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.metric-block[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-family: "DM Mono", monospace;\n  color: var(--text);\n  font-size: 1.15rem;\n}\n.progress-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n.progress-label[_ngcontent-%COMP%] {\n  font-family: "DM Mono", monospace;\n  font-size: 0.85rem;\n  color: var(--text);\n}\n.pagination-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-top: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: var(--surface);\n  border-top: 1px solid var(--border);\n  flex-wrap: wrap;\n}\n.pagination-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.pagination-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-width: 2.2rem;\n}\n.page-size-control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.page-size-field[_ngcontent-%COMP%] {\n  width: 6.5rem;\n}\n@media (max-width: 1200px) {\n  .kpi-row[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n@media (max-width: 900px) {\n  .kpi-row[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .filter-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .card-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 768px) {\n  .pbs-dashboard[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .topbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .kpi-row[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .filter-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .card-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .pagination-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n/*# sourceMappingURL=pbs-stations.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PbsStationsComponent, [{
    type: Component,
    args: [{ selector: "app-pbs-stations", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatTableModule,
      MatProgressBarModule,
      MatBadgeModule,
      MatTooltipModule,
      MatDividerModule
    ], template: `<div class="pbs-dashboard">\r
  <mat-toolbar class="topbar" color="primary">\r
    <div class="brand">\r
      <div class="logo-shell" [style.background-color]="primaryColor">\r
        <mat-icon>directions_bike</mat-icon>\r
      </div>\r
      <div>\r
        <div class="company-name">{{ companyName }}</div>\r
        <div class="subtitle">Bike Station Operations</div>\r
      </div>\r
    </div>\r
\r
    <div class="topbar-actions">\r
      <div class="update-chip">\r
        <mat-icon>schedule</mat-icon>\r
        Last updated:\r
        <span>{{ lastUpdated ? (lastUpdated | date: 'short') : 'N/A' }}</span>\r
      </div>\r
      <button mat-stroked-button color="accent" (click)="refreshData()">\r
        <mat-icon>refresh</mat-icon>\r
        Refresh\r
      </button>\r
      <button mat-flat-button color="warn" (click)="logout()">\r
        <mat-icon>logout</mat-icon>\r
        Logout\r
      </button>\r
    </div>\r
  </mat-toolbar>\r
\r
  <section class="kpi-row" *ngIf="isAuthenticated && !hasError">\r
    <mat-card class="kpi-card">\r
      <div class="kpi-icon primary">\r
        <mat-icon>directions_bike</mat-icon>\r
      </div>\r
      <div class="kpi-copy">\r
        <span class="kpi-value">{{ getTotalAvailable() }}</span>\r
        <span class="kpi-label">Total Bikes Available</span>\r
      </div>\r
    </mat-card>\r
\r
    <mat-card class="kpi-card">\r
      <div class="kpi-icon secondary">\r
        <mat-icon>inventory_2</mat-icon>\r
      </div>\r
      <div class="kpi-copy">\r
        <span class="kpi-value">{{ getTotalFleet() }}</span>\r
        <span class="kpi-label">Total Fleet</span>\r
      </div>\r
    </mat-card>\r
\r
    <mat-card class="kpi-card">\r
      <div class="kpi-icon success">\r
        <mat-icon>location_on</mat-icon>\r
      </div>\r
      <div class="kpi-copy">\r
        <span class="kpi-value">{{ getActiveStationsCount() }}</span>\r
        <span class="kpi-label">Active Stations</span>\r
      </div>\r
    </mat-card>\r
\r
    <mat-card class="kpi-card">\r
      <div class="kpi-icon warning">\r
        <mat-icon>pedal_bike</mat-icon>\r
      </div>\r
      <div class="kpi-copy">\r
        <span class="kpi-value">{{ getTotalOnTrip() }}</span>\r
        <span class="kpi-label">Bikes On Trip</span>\r
      </div>\r
    </mat-card>\r
\r
    <mat-card class="kpi-card">\r
      <div class="kpi-icon info">\r
        <mat-icon>trending_up</mat-icon>\r
      </div>\r
      <div class="kpi-copy">\r
        <span class="kpi-value">{{ getUtilizationRate() }}%</span>\r
        <span class="kpi-label">Utilization Rate</span>\r
      </div>\r
    </mat-card>\r
\r
    <mat-card class="kpi-card">\r
      <div class="kpi-icon neutral">\r
        <mat-icon>location_city</mat-icon>\r
      </div>\r
      <div class="kpi-copy">\r
        <span class="kpi-value">{{ filteredStations.length }}</span>\r
        <span class="kpi-label">Total Stations</span>\r
      </div>\r
    </mat-card>\r
  </section>\r
\r
  <section class="filter-bar" *ngIf="isAuthenticated && !hasError">\r
    <div class="filter-row">\r
      <mat-form-field appearance="fill" class="filter-field search-field">\r
        <mat-label>Search station</mat-label>\r
        <input\r
          matInput\r
          placeholder="Name or number"\r
          [(ngModel)]="searchQuery"\r
          (input)="applyFilters()"\r
        />\r
        <button matSuffix mat-icon-button aria-label="Clear search" *ngIf="searchQuery" (click)="searchQuery=''; applyFilters()">\r
          <mat-icon>close</mat-icon>\r
        </button>\r
      </mat-form-field>\r
\r
      <mat-form-field appearance="fill" class="filter-field">\r
        <mat-label>Min bikes available</mat-label>\r
        <mat-select [(ngModel)]="minBikesFilter" (selectionChange)="applyFilters()">\r
          <mat-option *ngFor="let option of minBikesOptions" [value]="option">\r
            {{ option }}\r
          </mat-option>\r
        </mat-select>\r
      </mat-form-field>\r
\r
      <mat-form-field appearance="fill" class="filter-field">\r
        <mat-label>Status</mat-label>\r
        <mat-select [(ngModel)]="statusFilter" (selectionChange)="applyFilters()">\r
          <mat-option value="">All statuses</mat-option>\r
          <mat-option *ngFor="let status of statusOptions" [value]="status.value">\r
            {{ status.label }}\r
          </mat-option>\r
        </mat-select>\r
      </mat-form-field>\r
\r
      <mat-form-field appearance="fill" class="filter-field">\r
        <mat-label>Sort by</mat-label>\r
        <mat-select [(ngModel)]="sortField" (selectionChange)="applyFilters()">\r
          <mat-option *ngFor="let option of sortOptions" [value]="option.value">\r
            {{ option.label }}\r
          </mat-option>\r
        </mat-select>\r
      </mat-form-field>\r
\r
      <button mat-icon-button class="sort-direction" (click)="toggleSortDir()" matTooltip="Toggle sort direction">\r
        <mat-icon>{{ sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward' }}</mat-icon>\r
      </button>\r
\r
      <div class="results-badge">\r
        <mat-icon>badge</mat-icon>\r
        <span>{{ filteredStations.length }} results</span>\r
      </div>\r
    </div>\r
\r
    <div class="view-switcher">\r
      <button\r
        mat-stroked-button\r
        [color]="viewMode === 'table' ? 'primary' : undefined"\r
        (click)="viewMode = 'table'"\r
      >\r
        <mat-icon>table_chart</mat-icon>\r
        Table\r
      </button>\r
      <button\r
        mat-stroked-button\r
        [color]="viewMode === 'grid' ? 'primary' : undefined"\r
        (click)="viewMode = 'grid'"\r
      >\r
        <mat-icon>grid_view</mat-icon>\r
        Cards\r
      </button>\r
      <button mat-button color="warn" (click)="clearFilters()">\r
        <mat-icon>filter_alt_off</mat-icon>\r
        Clear filters\r
      </button>\r
    </div>\r
  </section>\r
\r
  <section class="state-panel" *ngIf="!isAuthenticated">\r
    <mat-card class="state-card warning-card">\r
      <mat-icon>lock</mat-icon>\r
      <h2>Not authenticated</h2>\r
      <p>Please login to view bike station analytics and refresh the dashboard.</p>\r
      <button mat-flat-button color="primary" (click)="loadData()">Login</button>\r
    </mat-card>\r
  </section>\r
\r
  <section class="state-panel" *ngIf="hasError && isAuthenticated">\r
    <mat-card class="state-card error-card">\r
      <mat-icon>error_outline</mat-icon>\r
      <h2>Unable to load stations</h2>\r
      <p>{{ errorMessage || 'Something went wrong while fetching station data.' }}</p>\r
      <button mat-flat-button color="primary" (click)="refreshData()">Retry</button>\r
    </mat-card>\r
  </section>\r
\r
  <section class="state-panel" *ngIf="!isLoading && isAuthenticated && !hasError && !filteredStations.length">\r
    <mat-card class="state-card empty-card">\r
      <mat-icon>hourglass_empty</mat-icon>\r
      <h2>No stations match your filters</h2>\r
      <p>Try updating the search, status filter, or minimum bikes available.</p>\r
      <button mat-flat-button color="primary" (click)="clearFilters()">Reset filters</button>\r
    </mat-card>\r
  </section>\r
\r
  <section class="content-area" *ngIf="isAuthenticated && !hasError && filteredStations.length">\r
    <div class="data-panel">\r
      <div class="table-wrapper" *ngIf="viewMode === 'table'">\r
        <table mat-table [dataSource]="pagedStations" class="mat-elevation-z1">\r
\r
          <!-- Station -->\r
          <ng-container matColumnDef="stationName">\r
            <th mat-header-cell *matHeaderCellDef (click)="setSort('stationName')" class="sortable">\r
              <div class="sortable-inner">\r
                <span>Station</span>\r
                <mat-icon *ngIf="sortField === 'stationName'">\r
                  {{ sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward' }}\r
                </mat-icon>\r
              </div>\r
            </th>\r
            <td mat-cell *matCellDef="let station">\r
              <div class="station-cell">\r
                <span class="station-title">{{ station.stationName }}</span>\r
                <span class="station-subtitle">#{{ station.stationNumber }}</span>\r
              </div>\r
            </td>\r
          </ng-container>\r
\r
          <!-- Available -->\r
          <ng-container matColumnDef="available">\r
            <th mat-header-cell *matHeaderCellDef (click)="setSort('bikesAvailable')" class="sortable">\r
              <div class="sortable-inner">\r
                <span>Available</span>\r
                <mat-icon *ngIf="sortField === 'bikesAvailable'">\r
                  {{ sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward' }}\r
                </mat-icon>\r
              </div>\r
            </th>\r
            <td mat-cell *matCellDef="let station">\r
              <div class="metric-cell">\r
                <strong>{{ station.bikesAvailable }}</strong>\r
                <mat-progress-bar\r
                  class="mini-bar"\r
                  [value]="getAvailabilityValue(station)"\r
                  [color]="getAvailabilityColor(station)">\r
                </mat-progress-bar>\r
              </div>\r
            </td>\r
          </ng-container>\r
\r
          <!-- Total -->\r
          <ng-container matColumnDef="total">\r
            <th mat-header-cell *matHeaderCellDef (click)="setSort('bikesTotal')" class="sortable">\r
              <div class="sortable-inner">\r
                <span>Total</span>\r
                <mat-icon *ngIf="sortField === 'bikesTotal'">\r
                  {{ sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward' }}\r
                </mat-icon>\r
              </div>\r
            </th>\r
            <td mat-cell *matCellDef="let station">{{ station.bikesTotal }}</td>\r
          </ng-container>\r
\r
          <!-- On Trip -->\r
          <ng-container matColumnDef="onTrip">\r
            <th mat-header-cell *matHeaderCellDef (click)="setSort('reportOnTripBikes')" class="sortable">\r
              <div class="sortable-inner">\r
                <span>On Trip</span>\r
                <mat-icon *ngIf="sortField === 'reportOnTripBikes'">\r
                  {{ sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward' }}\r
                </mat-icon>\r
              </div>\r
            </th>\r
            <td mat-cell *matCellDef="let station">{{ station.reportOnTripBikes }}</td>\r
          </ng-container>\r
\r
          <!-- Utilization -->\r
          <ng-container matColumnDef="utilization">\r
            <th mat-header-cell *matHeaderCellDef (click)="setSort('availabilityPercentage')" class="sortable">\r
              <div class="sortable-inner">\r
                <span>Utilization %</span>\r
                <mat-icon *ngIf="sortField === 'availabilityPercentage'">\r
                  {{ sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward' }}\r
                </mat-icon>\r
              </div>\r
            </th>\r
            <td mat-cell *matCellDef="let station">\r
              <div class="metric-cell">\r
                <strong>{{ station.availabilityPercentage }}%</strong>\r
                <mat-progress-bar\r
                  class="mini-bar"\r
                  mode="determinate"\r
                  [value]="getAvailabilityValue(station)"\r
                  [color]="getAvailabilityColor(station)">\r
                </mat-progress-bar>\r
              </div>\r
            </td>\r
          </ng-container>\r
\r
          <!-- Coordinates -->\r
          <ng-container matColumnDef="coordinates">\r
            <th mat-header-cell *matHeaderCellDef>\r
              <span>Coordinates</span>\r
            </th>\r
            <td mat-cell *matCellDef="let station">\r
              {{ formatCoordinates(station) }}\r
            </td>\r
          </ng-container>\r
\r
          <!-- Status -->\r
          <ng-container matColumnDef="status">\r
            <th mat-header-cell *matHeaderCellDef>\r
              <span>Status</span>\r
            </th>\r
            <td mat-cell *matCellDef="let station">\r
              <span class="status-chip" [style.background]="station.statusColor">\r
                {{ station.statusLabel }}\r
              </span>\r
            </td>\r
          </ng-container>\r
\r
          <!-- Actions -->\r
          <ng-container matColumnDef="actions">\r
            <th mat-header-cell *matHeaderCellDef>\r
              <span>Actions</span>\r
            </th>\r
            <td mat-cell *matCellDef="let station">\r
              <button mat-icon-button matTooltip="View station">\r
                <mat-icon>visibility</mat-icon>\r
              </button>\r
              <button mat-icon-button matTooltip="Navigate">\r
                <mat-icon>place</mat-icon>\r
              </button>\r
            </td>\r
          </ng-container>\r
\r
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\r
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>\r
        </table>\r
      </div>\r
\r
      <div class="card-grid" *ngIf="viewMode === 'grid'">\r
        <mat-card class="station-card" *ngFor="let station of pagedStations">\r
          <div class="card-top">\r
            <div>\r
              <h3>{{ station.stationName }}</h3>\r
              <span class="station-number">#{{ station.stationNumber }}</span>\r
            </div>\r
            <span class="status-chip" [style.background]="station.statusColor">\r
              {{ station.statusLabel }}\r
            </span>\r
          </div>\r
\r
          <div class="card-metrics">\r
            <div class="metric-block">\r
              <span class="metric-label">Available</span>\r
              <strong>{{ station.bikesAvailable }}</strong>\r
            </div>\r
            <div class="metric-block">\r
              <span class="metric-label">Total</span>\r
              <strong>{{ station.bikesTotal }}</strong>\r
            </div>\r
            <div class="metric-block">\r
              <span class="metric-label">On Trip</span>\r
              <strong>{{ station.reportOnTripBikes }}</strong>\r
            </div>\r
          </div>\r
\r
          <div class="progress-group">\r
            <span>Utilization</span>\r
            <mat-progress-bar\r
              [value]="getAvailabilityValue(station)"\r
              [color]="getAvailabilityColor(station)"\r
            ></mat-progress-bar>\r
            <span class="progress-label">{{ station.availabilityPercentage }}%</span>\r
          </div>\r
        </mat-card>\r
      </div>\r
\r
      <div class="pagination-bar">\r
        <div class="pagination-controls">\r
          <button mat-icon-button (click)="goToPage(1)" [disabled]="currentPage === 1">\r
            <mat-icon>first_page</mat-icon>\r
          </button>\r
          <button mat-icon-button (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 1">\r
            <mat-icon>chevron_left</mat-icon>\r
          </button>\r
\r
          <ng-container *ngFor="let page of getPageNumbers()">\r
            <button\r
              mat-button\r
              [color]="page === currentPage ? 'primary' : undefined"\r
              (click)="goToPage(page)"\r
            >\r
              {{ page }}\r
            </button>\r
          </ng-container>\r
\r
          <button mat-icon-button (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages">\r
            <mat-icon>chevron_right</mat-icon>\r
          </button>\r
          <button mat-icon-button (click)="goToPage(totalPages)" [disabled]="currentPage === totalPages">\r
            <mat-icon>last_page</mat-icon>\r
          </button>\r
        </div>\r
\r
        <div class="page-size-control">\r
          <span>Rows per page</span>\r
          <mat-form-field appearance="fill" class="page-size-field">\r
            <mat-select [(ngModel)]="pageSize" (selectionChange)="onPageSizeChange()">\r
              <mat-option *ngFor="let option of pageSizeOptions" [value]="option">\r
                {{ option }}\r
              </mat-option>\r
            </mat-select>\r
          </mat-form-field>\r
        </div>\r
      </div>\r
    </div>\r
  </section>\r
</div>`, styles: ['@import "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;700&display=swap";\n\n/* src/app/components/admin/pbs-stations/pbs-stations.component.scss */\n:host {\n  display: block;\n  font-family: "DM Sans", sans-serif;\n  color: #1f2937;\n  background: #f4f6fb;\n  min-height: 100vh;\n}\n.pbs-dashboard {\n  --surface: #ffffff;\n  --surface-alt: #f8fafc;\n  --primary: #0f6cff;\n  --text: #111827;\n  --muted: #6b7280;\n  --success: #10b981;\n  --warning: #f59e0b;\n  --danger: #ef4444;\n  --border: rgba(15, 23, 42, 0.08);\n  padding: 1rem;\n}\n.topbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.9rem 1.2rem;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(15, 108, 255, 0.92),\n      rgba(56, 189, 248, 0.92));\n  color: white;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.brand {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.logo-shell {\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 1rem;\n  display: grid;\n  place-items: center;\n  color: white;\n  box-shadow: 0 12px 30px rgba(15, 108, 255, 0.2);\n}\n.company-name {\n  font-weight: 700;\n  font-size: 1.1rem;\n}\n.subtitle {\n  color: rgba(255, 255, 255, 0.85);\n  font-size: 0.9rem;\n}\n.topbar-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.update-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.6rem 0.9rem;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.12);\n  color: white;\n  font-size: 0.95rem;\n}\n.kpi-row {\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  gap: 1rem;\n  margin: 1.4rem 0;\n}\n.kpi-card {\n  border-radius: 1rem;\n  padding: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);\n  background: var(--surface);\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n.kpi-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);\n}\n.kpi-icon {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 1rem;\n  display: grid;\n  place-items: center;\n  color: white;\n  font-size: 1.4rem;\n  flex-shrink: 0;\n}\n.kpi-icon.primary {\n  background: var(--primary);\n}\n.kpi-icon.secondary {\n  background: #0ea5e9;\n}\n.kpi-icon.success {\n  background: var(--success);\n}\n.kpi-icon.warning {\n  background: var(--warning);\n}\n.kpi-icon.info {\n  background: #7c3aed;\n}\n.kpi-icon.neutral {\n  background: #64748b;\n}\n.kpi-copy {\n  display: grid;\n  gap: 0.25rem;\n  min-width: 0;\n}\n.kpi-value {\n  font-size: 1.7rem;\n  font-family: "DM Mono", monospace;\n  color: var(--text);\n  line-height: 1;\n}\n.kpi-label {\n  color: var(--muted);\n  font-size: 0.85rem;\n}\n.filter-bar {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  padding: 1.2rem;\n  border-radius: 1.2rem;\n  background: var(--surface);\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);\n  background-color: white !important;\n}\n.filter-row {\n  display: grid;\n  grid-template-columns: 1.8fr repeat(4, 1fr) auto auto;\n  gap: 1rem;\n  align-items: center;\n}\n.filter-field {\n  width: 100%;\n  background-color: white !important;\n}\n.search-field {\n  min-width: 0;\n}\nmat-option {\n  background-color: white !important;\n}\n.results-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  color: var(--text);\n  font-weight: 600;\n  padding: 0.65rem 0.9rem;\n  background: var(--surface-alt);\n  border: 1px solid var(--border);\n  border-radius: 999px;\n  white-space: nowrap;\n}\n.view-switcher {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.state-panel {\n  display: grid;\n  justify-items: center;\n  padding: 2rem 0;\n}\n.state-card {\n  width: min(560px, 100%);\n  text-align: center;\n  padding: 2rem;\n  border-radius: 1.25rem;\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n  background: var(--surface);\n}\n.warning-card {\n  border: 1px solid rgba(249, 115, 22, 0.16);\n}\n.error-card {\n  border: 1px solid rgba(239, 68, 68, 0.16);\n}\n.empty-card {\n  border: 1px solid rgba(79, 70, 229, 0.16);\n}\n.content-area {\n  display: grid;\n  gap: 1.5rem;\n}\n.table-wrapper {\n  overflow-x: auto;\n  border-radius: 1rem;\n  background: var(--surface);\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);\n}\ntable.mat-table {\n  width: 100%;\n  min-width: 860px;\n  border-collapse: collapse;\n  table-layout: fixed;\n}\n.mat-header-row,\n.mat-row {\n  display: table-row !important;\n  height: 48px !important;\n}\nth.mat-header-cell,\ntd.mat-cell {\n  display: table-cell !important;\n  box-sizing: border-box;\n  padding: 12px 14px !important;\n  border-bottom: 1px solid rgba(15, 23, 42, 0.07) !important;\n  vertical-align: middle;\n}\nth.mat-header-cell {\n  background: #f8fafc;\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  color: var(--muted);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\ntr.mat-row:hover {\n  background: #f5f8ff;\n}\n.mat-column-stationName {\n  width: 22%;\n}\n.mat-column-available {\n  width: 12%;\n  text-align: center;\n}\n.mat-column-total {\n  width: 7%;\n  text-align: center;\n}\n.mat-column-onTrip {\n  width: 7%;\n  text-align: center;\n}\n.mat-column-utilization {\n  width: 14%;\n  text-align: center;\n}\n.mat-column-coordinates {\n  width: 20%;\n}\n.mat-column-status {\n  width: 11%;\n  text-align: center;\n}\n.mat-column-actions {\n  width: 7%;\n  text-align: center;\n}\n.sortable {\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.sortable-inner {\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n  white-space: nowrap;\n  overflow: hidden;\n  width: 100%;\n}\n.sortable-inner span {\n  display: inline;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.sortable-inner mat-icon {\n  flex-shrink: 0;\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  line-height: 14px;\n}\n.metric-cell {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: center;\n  width: 100%;\n}\n.metric-cell strong {\n  font-family: "DM Mono", monospace;\n  font-size: 0.95rem;\n}\n.metric-cell mat-progress-bar {\n  width: 100% !important;\n  max-width: 100% !important;\n  min-width: 0 !important;\n  display: block !important;\n}\n.station-cell {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.station-title {\n  font-weight: 700;\n  font-size: 0.93rem;\n}\n.station-subtitle {\n  color: var(--muted);\n  font-size: 0.82rem;\n}\n.status-chip {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n  padding: 1rem;\n}\n.station-card {\n  border-radius: 1.25rem;\n  padding: 1.3rem;\n  background: var(--surface);\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n.station-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n}\n.card-top {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n}\n.card-top h3 {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 700;\n}\n.station-number {\n  display: block;\n  color: var(--muted);\n  font-size: 0.88rem;\n  margin-top: 0.3rem;\n}\n.card-metrics {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n.metric-block {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.metric-block .metric-label {\n  color: var(--muted);\n  font-size: 0.78rem;\n  text-transform: uppercase;\n  letter-spacing: 0.4px;\n}\n.metric-block strong {\n  font-family: "DM Mono", monospace;\n  color: var(--text);\n  font-size: 1.15rem;\n}\n.progress-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n.progress-label {\n  font-family: "DM Mono", monospace;\n  font-size: 0.85rem;\n  color: var(--text);\n}\n.pagination-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-top: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: var(--surface);\n  border-top: 1px solid var(--border);\n  flex-wrap: wrap;\n}\n.pagination-controls {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.pagination-controls button {\n  min-width: 2.2rem;\n}\n.page-size-control {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.page-size-field {\n  width: 6.5rem;\n}\n@media (max-width: 1200px) {\n  .kpi-row {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n@media (max-width: 900px) {\n  .kpi-row {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .filter-row {\n    grid-template-columns: 1fr 1fr;\n  }\n  .card-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (max-width: 768px) {\n  .pbs-dashboard {\n    padding: 0.75rem;\n  }\n  .topbar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .kpi-row {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .filter-row {\n    grid-template-columns: 1fr;\n  }\n  .card-grid {\n    grid-template-columns: 1fr;\n  }\n  .pagination-bar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n/*# sourceMappingURL=pbs-stations.component.css.map */\n'] }]
  }], () => [{ type: CharteredBikeService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PbsStationsComponent, { className: "PbsStationsComponent", filePath: "src/app/components/admin/pbs-stations/pbs-stations.component.ts", lineNumber: 48 });
})();
export {
  PbsStationsComponent
};
//# sourceMappingURL=chunk-VJOEHOGC.js.map
