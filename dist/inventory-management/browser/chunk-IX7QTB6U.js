import {
  E,
  autoTable,
  utils,
  writeFileSync
} from "./chunk-XEM42QDI.js";
import {
  ApiService
} from "./chunk-EFW3VKAX.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-6S3IFQ7P.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-PDO42MVQ.js";
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
  MatTableModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-WFLLRASB.js";
import "./chunk-LORH3QDJ.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-25OIJ6Q5.js";
import {
  CdkScrollableModule,
  DomPortalOutlet,
  OverlayConfig,
  OverlayModule,
  ScrollDispatcher,
  TemplatePortal,
  ViewportRuler,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy
} from "./chunk-VD67GU43.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-AK2ZYAID.js";
import {
  DOWN_ARROW,
  Directionality,
  ENTER,
  ESCAPE,
  FocusKeyManager,
  FocusMonitor,
  LEFT_ARROW,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIconButton,
  MatRipple,
  MatRippleModule,
  Platform,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _StructuralStylesLoader,
  _animationsDisabled,
  _getEventTarget,
  _getShadowRoot,
  coerceBooleanProperty,
  hasModifierKey,
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader
} from "./chunk-AJHCE7D6.js";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-AAXJDYQS.js";
import "./chunk-BIRBC32G.js";
import "./chunk-4AUWEQTR.js";
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  DecimalPipe,
  Directive,
  ElementRef,
  EventEmitter,
  HttpClient,
  HttpClientModule,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  NgZone,
  Output,
  QueryList,
  Renderer2,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  filter,
  inject,
  merge,
  of,
  setClassMetadata,
  signal,
  skipWhile,
  startWith,
  switchMap,
  take,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinvalidFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵviewQuery
} from "./chunk-WPHUMBF2.js";
import "./chunk-ETVPICVQ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-YP43Q66R.js";

// node_modules/@angular/material/fesm2022/toolbar.mjs
var _c0 = ["*", [["mat-toolbar-row"]]];
var _c1 = ["*", "mat-toolbar-row"];
var MatToolbarRow = class _MatToolbarRow {
  static \u0275fac = function MatToolbarRow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbarRow)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatToolbarRow,
    selectors: [["mat-toolbar-row"]],
    hostAttrs: [1, "mat-toolbar-row"],
    exportAs: ["matToolbarRow"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarRow, [{
    type: Directive,
    args: [{
      selector: "mat-toolbar-row",
      exportAs: "matToolbarRow",
      host: {
        "class": "mat-toolbar-row"
      }
    }]
  }], null, null);
})();
var MatToolbar = class _MatToolbar {
  _elementRef = inject(ElementRef);
  _platform = inject(Platform);
  _document = inject(DOCUMENT);
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the toolbar. This API is supported in M2 themes only, it has
   * no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/toolbar/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color;
  /** Reference to all toolbar row elements that have been projected. */
  _toolbarRows;
  constructor() {
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === "undefined" || ngDevMode)) {
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes).filter((node) => !(node.classList && node.classList.contains("mat-toolbar-row"))).filter((node) => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8)).some((node) => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
  static \u0275fac = function MatToolbar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatToolbar,
    selectors: [["mat-toolbar"]],
    contentQueries: function MatToolbar_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatToolbarRow, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._toolbarRows = _t);
      }
    },
    hostAttrs: [1, "mat-toolbar"],
    hostVars: 6,
    hostBindings: function MatToolbar_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
        \u0275\u0275classProp("mat-toolbar-multiple-rows", ctx._toolbarRows.length > 0)("mat-toolbar-single-row", ctx._toolbarRows.length === 0);
      }
    },
    inputs: {
      color: "color"
    },
    exportAs: ["matToolbar"],
    ngContentSelectors: _c1,
    decls: 2,
    vars: 0,
    template: function MatToolbar_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c0);
        \u0275\u0275projection(0);
        \u0275\u0275projection(1, 1);
      }
    },
    styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-sys-surface));color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));margin:0}@media(forced-colors: active){.mat-toolbar{outline:solid 1px}}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));--mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height, 56px)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height, 56px)}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbar, [{
    type: Component,
    args: [{
      selector: "mat-toolbar",
      exportAs: "matToolbar",
      host: {
        "class": "mat-toolbar",
        "[class]": 'color ? "mat-" + color : ""',
        "[class.mat-toolbar-multiple-rows]": "_toolbarRows.length > 0",
        "[class.mat-toolbar-single-row]": "_toolbarRows.length === 0"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: '<ng-content></ng-content>\n<ng-content select="mat-toolbar-row"></ng-content>\n',
      styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-sys-surface));color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));margin:0}@media(forced-colors: active){.mat-toolbar{outline:solid 1px}}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));--mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height, 56px)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height, 56px)}}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    _toolbarRows: [{
      type: ContentChildren,
      args: [MatToolbarRow, {
        descendants: true
      }]
    }]
  });
})();
function throwToolbarMixedModesError() {
  throw Error("MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.");
}
var MatToolbarModule = class _MatToolbarModule {
  static \u0275fac = function MatToolbarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatToolbarModule,
    imports: [MatCommonModule, MatToolbar, MatToolbarRow],
    exports: [MatToolbar, MatToolbarRow, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatToolbar, MatToolbarRow],
      exports: [MatToolbar, MatToolbarRow, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/divider.mjs
var MatDivider = class _MatDivider {
  /** Whether the divider is vertically aligned. */
  get vertical() {
    return this._vertical;
  }
  set vertical(value) {
    this._vertical = coerceBooleanProperty(value);
  }
  _vertical = false;
  /** Whether the divider is an inset divider. */
  get inset() {
    return this._inset;
  }
  set inset(value) {
    this._inset = coerceBooleanProperty(value);
  }
  _inset = false;
  static \u0275fac = function MatDivider_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDivider)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatDivider,
    selectors: [["mat-divider"]],
    hostAttrs: ["role", "separator", 1, "mat-divider"],
    hostVars: 7,
    hostBindings: function MatDivider_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-orientation", ctx.vertical ? "vertical" : "horizontal");
        \u0275\u0275classProp("mat-divider-vertical", ctx.vertical)("mat-divider-horizontal", !ctx.vertical)("mat-divider-inset", ctx.inset);
      }
    },
    inputs: {
      vertical: "vertical",
      inset: "inset"
    },
    decls: 0,
    vars: 0,
    template: function MatDivider_Template(rf, ctx) {
    },
    styles: [".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color, var(--mat-sys-outline-variant));border-top-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color, var(--mat-sys-outline-variant));border-right-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDivider, [{
    type: Component,
    args: [{
      selector: "mat-divider",
      host: {
        "role": "separator",
        "[attr.aria-orientation]": 'vertical ? "vertical" : "horizontal"',
        "[class.mat-divider-vertical]": "vertical",
        "[class.mat-divider-horizontal]": "!vertical",
        "[class.mat-divider-inset]": "inset",
        "class": "mat-divider"
      },
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color, var(--mat-sys-outline-variant));border-top-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color, var(--mat-sys-outline-variant));border-right-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}\n"]
    }]
  }], null, {
    vertical: [{
      type: Input
    }],
    inset: [{
      type: Input
    }]
  });
})();
var MatDividerModule = class _MatDividerModule {
  static \u0275fac = function MatDividerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDividerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatDividerModule,
    imports: [MatCommonModule, MatDivider],
    exports: [MatDivider, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDividerModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatDivider],
      exports: [MatDivider, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/menu.mjs
var _c02 = ["mat-menu-item", ""];
var _c12 = [[["mat-icon"], ["", "matMenuItemIcon", ""]], "*"];
var _c2 = ["mat-icon, [matMenuItemIcon]", "*"];
function MatMenuItem_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 2);
    \u0275\u0275element(1, "polygon", 3);
    \u0275\u0275elementEnd();
  }
}
var _c3 = ["*"];
function MatMenu_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0);
    \u0275\u0275domListener("click", function MatMenu_ng_template_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closed.emit("click"));
    })("animationstart", function MatMenu_ng_template_0_Template_div_animationstart_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1._onAnimationStart($event.animationName));
    })("animationend", function MatMenu_ng_template_0_Template_div_animationend_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1._onAnimationDone($event.animationName));
    })("animationcancel", function MatMenu_ng_template_0_Template_div_animationcancel_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1._onAnimationDone($event.animationName));
    });
    \u0275\u0275domElementStart(1, "div", 1);
    \u0275\u0275projection(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1._classList);
    \u0275\u0275classProp("mat-menu-panel-animations-disabled", ctx_r1._animationsDisabled)("mat-menu-panel-exit-animation", ctx_r1._panelAnimationState === "void")("mat-menu-panel-animating", ctx_r1._isAnimating());
    \u0275\u0275domProperty("id", ctx_r1.panelId);
    \u0275\u0275attribute("aria-label", ctx_r1.ariaLabel || null)("aria-labelledby", ctx_r1.ariaLabelledby || null)("aria-describedby", ctx_r1.ariaDescribedby || null);
  }
}
var MAT_MENU_PANEL = new InjectionToken("MAT_MENU_PANEL");
var MatMenuItem = class _MatMenuItem {
  _elementRef = inject(ElementRef);
  _document = inject(DOCUMENT);
  _focusMonitor = inject(FocusMonitor);
  _parentMenu = inject(MAT_MENU_PANEL, {
    optional: true
  });
  _changeDetectorRef = inject(ChangeDetectorRef);
  /** ARIA role for the menu item. */
  role = "menuitem";
  /** Whether the menu item is disabled. */
  disabled = false;
  /** Whether ripples are disabled on the menu item. */
  disableRipple = false;
  /** Stream that emits when the menu item is hovered. */
  _hovered = new Subject();
  /** Stream that emits when the menu item is focused. */
  _focused = new Subject();
  /** Whether the menu item is highlighted. */
  _highlighted = false;
  /** Whether the menu item acts as a trigger for a sub-menu. */
  _triggersSubmenu = false;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    this._parentMenu?.addItem?.(this);
  }
  /** Focuses the menu item. */
  focus(origin, options) {
    if (this._focusMonitor && origin) {
      this._focusMonitor.focusVia(this._getHostElement(), origin, options);
    } else {
      this._getHostElement().focus(options);
    }
    this._focused.next(this);
  }
  ngAfterViewInit() {
    if (this._focusMonitor) {
      this._focusMonitor.monitor(this._elementRef, false);
    }
  }
  ngOnDestroy() {
    if (this._focusMonitor) {
      this._focusMonitor.stopMonitoring(this._elementRef);
    }
    if (this._parentMenu && this._parentMenu.removeItem) {
      this._parentMenu.removeItem(this);
    }
    this._hovered.complete();
    this._focused.complete();
  }
  /** Used to set the `tabindex`. */
  _getTabIndex() {
    return this.disabled ? "-1" : "0";
  }
  /** Returns the host DOM element. */
  _getHostElement() {
    return this._elementRef.nativeElement;
  }
  /** Prevents the default element actions if it is disabled. */
  _checkDisabled(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /** Emits to the hover stream. */
  _handleMouseEnter() {
    this._hovered.next(this);
  }
  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel() {
    const clone = this._elementRef.nativeElement.cloneNode(true);
    const icons = clone.querySelectorAll("mat-icon, .material-icons");
    for (let i = 0; i < icons.length; i++) {
      icons[i].remove();
    }
    return clone.textContent?.trim() || "";
  }
  _setHighlighted(isHighlighted) {
    this._highlighted = isHighlighted;
    this._changeDetectorRef.markForCheck();
  }
  _setTriggersSubmenu(triggersSubmenu) {
    this._triggersSubmenu = triggersSubmenu;
    this._changeDetectorRef.markForCheck();
  }
  _hasFocus() {
    return this._document && this._document.activeElement === this._getHostElement();
  }
  static \u0275fac = function MatMenuItem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMenuItem)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatMenuItem,
    selectors: [["", "mat-menu-item", ""]],
    hostAttrs: [1, "mat-mdc-menu-item", "mat-focus-indicator"],
    hostVars: 8,
    hostBindings: function MatMenuItem_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function MatMenuItem_click_HostBindingHandler($event) {
          return ctx._checkDisabled($event);
        })("mouseenter", function MatMenuItem_mouseenter_HostBindingHandler() {
          return ctx._handleMouseEnter();
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("role", ctx.role)("tabindex", ctx._getTabIndex())("aria-disabled", ctx.disabled)("disabled", ctx.disabled || null);
        \u0275\u0275classProp("mat-mdc-menu-item-highlighted", ctx._highlighted)("mat-mdc-menu-item-submenu-trigger", ctx._triggersSubmenu);
      }
    },
    inputs: {
      role: "role",
      disabled: [2, "disabled", "disabled", booleanAttribute],
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute]
    },
    exportAs: ["matMenuItem"],
    attrs: _c02,
    ngContentSelectors: _c2,
    decls: 5,
    vars: 3,
    consts: [[1, "mat-mdc-menu-item-text"], ["matRipple", "", 1, "mat-mdc-menu-ripple", 3, "matRippleDisabled", "matRippleTrigger"], ["viewBox", "0 0 5 10", "focusable", "false", "aria-hidden", "true", 1, "mat-mdc-menu-submenu-icon"], ["points", "0,0 5,5 0,10"]],
    template: function MatMenuItem_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c12);
        \u0275\u0275projection(0);
        \u0275\u0275elementStart(1, "span", 0);
        \u0275\u0275projection(2, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275element(3, "div", 1);
        \u0275\u0275conditionalCreate(4, MatMenuItem_Conditional_4_Template, 2, 0, ":svg:svg", 2);
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("matRippleDisabled", ctx.disableRipple || ctx.disabled)("matRippleTrigger", ctx._getHostElement());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx._triggersSubmenu ? 4 : -1);
      }
    },
    dependencies: [MatRipple],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMenuItem, [{
    type: Component,
    args: [{
      selector: "[mat-menu-item]",
      exportAs: "matMenuItem",
      host: {
        "[attr.role]": "role",
        "class": "mat-mdc-menu-item mat-focus-indicator",
        "[class.mat-mdc-menu-item-highlighted]": "_highlighted",
        "[class.mat-mdc-menu-item-submenu-trigger]": "_triggersSubmenu",
        "[attr.tabindex]": "_getTabIndex()",
        "[attr.aria-disabled]": "disabled",
        "[attr.disabled]": "disabled || null",
        "(click)": "_checkDisabled($event)",
        "(mouseenter)": "_handleMouseEnter()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [MatRipple],
      template: '<ng-content select="mat-icon, [matMenuItemIcon]"></ng-content>\n<span class="mat-mdc-menu-item-text"><ng-content></ng-content></span>\n<div class="mat-mdc-menu-ripple" matRipple\n     [matRippleDisabled]="disableRipple || disabled"\n     [matRippleTrigger]="_getHostElement()">\n</div>\n\n@if (_triggersSubmenu) {\n     <svg\n       class="mat-mdc-menu-submenu-icon"\n       viewBox="0 0 5 10"\n       focusable="false"\n       aria-hidden="true"><polygon points="0,0 5,5 0,10"/></svg>\n}\n'
    }]
  }], () => [], {
    role: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
function throwMatMenuInvalidPositionX() {
  throw Error(`xPosition value must be either 'before' or after'.
      Example: <mat-menu xPosition="before" #menu="matMenu"></mat-menu>`);
}
function throwMatMenuInvalidPositionY() {
  throw Error(`yPosition value must be either 'above' or below'.
      Example: <mat-menu yPosition="above" #menu="matMenu"></mat-menu>`);
}
function throwMatMenuRecursiveError() {
  throw Error(`matMenuTriggerFor: menu cannot contain its own trigger. Assign a menu that is not a parent of the trigger or move the trigger outside of the menu.`);
}
var MAT_MENU_CONTENT = new InjectionToken("MatMenuContent");
var MatMenuContent = class _MatMenuContent {
  _template = inject(TemplateRef);
  _appRef = inject(ApplicationRef);
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _document = inject(DOCUMENT);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _portal;
  _outlet;
  /** Emits when the menu content has been attached. */
  _attached = new Subject();
  constructor() {
  }
  /**
   * Attaches the content with a particular context.
   * @docs-private
   */
  attach(context = {}) {
    if (!this._portal) {
      this._portal = new TemplatePortal(this._template, this._viewContainerRef);
    }
    this.detach();
    if (!this._outlet) {
      this._outlet = new DomPortalOutlet(this._document.createElement("div"), this._appRef, this._injector);
    }
    const element = this._template.elementRef.nativeElement;
    element.parentNode.insertBefore(this._outlet.outletElement, element);
    this._changeDetectorRef.markForCheck();
    this._portal.attach(this._outlet, context);
    this._attached.next();
  }
  /**
   * Detaches the content.
   * @docs-private
   */
  detach() {
    if (this._portal?.isAttached) {
      this._portal.detach();
    }
  }
  ngOnDestroy() {
    this.detach();
    this._outlet?.dispose();
  }
  static \u0275fac = function MatMenuContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMenuContent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatMenuContent,
    selectors: [["ng-template", "matMenuContent", ""]],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_MENU_CONTENT,
      useExisting: _MatMenuContent
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMenuContent, [{
    type: Directive,
    args: [{
      selector: "ng-template[matMenuContent]",
      providers: [{
        provide: MAT_MENU_CONTENT,
        useExisting: MatMenuContent
      }]
    }]
  }], () => [], null);
})();
var MAT_MENU_DEFAULT_OPTIONS = new InjectionToken("mat-menu-default-options", {
  providedIn: "root",
  factory: MAT_MENU_DEFAULT_OPTIONS_FACTORY
});
function MAT_MENU_DEFAULT_OPTIONS_FACTORY() {
  return {
    overlapTrigger: false,
    xPosition: "after",
    yPosition: "below",
    backdropClass: "cdk-overlay-transparent-backdrop"
  };
}
var ENTER_ANIMATION = "_mat-menu-enter";
var EXIT_ANIMATION = "_mat-menu-exit";
var MatMenu = class _MatMenu {
  _elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _injector = inject(Injector);
  _keyManager;
  _xPosition;
  _yPosition;
  _firstItemFocusRef;
  _exitFallbackTimeout;
  /** Whether animations are currently disabled. */
  _animationsDisabled = _animationsDisabled();
  /** All items inside the menu. Includes items nested inside another menu. */
  _allItems;
  /** Only the direct descendant menu items. */
  _directDescendantItems = new QueryList();
  /** Classes to be applied to the menu panel. */
  _classList = {};
  /** Current state of the panel animation. */
  _panelAnimationState = "void";
  /** Emits whenever an animation on the menu completes. */
  _animationDone = new Subject();
  /** Whether the menu is animating. */
  _isAnimating = signal(false, ...ngDevMode ? [{
    debugName: "_isAnimating"
  }] : []);
  /** Parent menu of the current menu panel. */
  parentMenu;
  /** Layout direction of the menu. */
  direction;
  /** Class or list of classes to be added to the overlay panel. */
  overlayPanelClass;
  /** Class to be added to the backdrop element. */
  backdropClass;
  /** aria-label for the menu panel. */
  ariaLabel;
  /** aria-labelledby for the menu panel. */
  ariaLabelledby;
  /** aria-describedby for the menu panel. */
  ariaDescribedby;
  /** Position of the menu in the X axis. */
  get xPosition() {
    return this._xPosition;
  }
  set xPosition(value) {
    if (value !== "before" && value !== "after" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throwMatMenuInvalidPositionX();
    }
    this._xPosition = value;
    this.setPositionClasses();
  }
  /** Position of the menu in the Y axis. */
  get yPosition() {
    return this._yPosition;
  }
  set yPosition(value) {
    if (value !== "above" && value !== "below" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throwMatMenuInvalidPositionY();
    }
    this._yPosition = value;
    this.setPositionClasses();
  }
  /** @docs-private */
  templateRef;
  /**
   * List of the items inside of a menu.
   * @deprecated
   * @breaking-change 8.0.0
   */
  items;
  /**
   * Menu content that will be rendered lazily.
   * @docs-private
   */
  lazyContent;
  /** Whether the menu should overlap its trigger. */
  overlapTrigger;
  /** Whether the menu has a backdrop. */
  hasBackdrop;
  /**
   * This method takes classes set on the host mat-menu element and applies them on the
   * menu template that displays in the overlay container.  Otherwise, it's difficult
   * to style the containing menu from outside the component.
   * @param classes list of class names
   */
  set panelClass(classes) {
    const previousPanelClass = this._previousPanelClass;
    const newClassList = __spreadValues({}, this._classList);
    if (previousPanelClass && previousPanelClass.length) {
      previousPanelClass.split(" ").forEach((className) => {
        newClassList[className] = false;
      });
    }
    this._previousPanelClass = classes;
    if (classes && classes.length) {
      classes.split(" ").forEach((className) => {
        newClassList[className] = true;
      });
      this._elementRef.nativeElement.className = "";
    }
    this._classList = newClassList;
  }
  _previousPanelClass;
  /**
   * This method takes classes set on the host mat-menu element and applies them on the
   * menu template that displays in the overlay container.  Otherwise, it's difficult
   * to style the containing menu from outside the component.
   * @deprecated Use `panelClass` instead.
   * @breaking-change 8.0.0
   */
  get classList() {
    return this.panelClass;
  }
  set classList(classes) {
    this.panelClass = classes;
  }
  /** Event emitted when the menu is closed. */
  closed = new EventEmitter();
  /**
   * Event emitted when the menu is closed.
   * @deprecated Switch to `closed` instead
   * @breaking-change 8.0.0
   */
  close = this.closed;
  panelId = inject(_IdGenerator).getId("mat-menu-panel-");
  constructor() {
    const defaultOptions = inject(MAT_MENU_DEFAULT_OPTIONS);
    this.overlayPanelClass = defaultOptions.overlayPanelClass || "";
    this._xPosition = defaultOptions.xPosition;
    this._yPosition = defaultOptions.yPosition;
    this.backdropClass = defaultOptions.backdropClass;
    this.overlapTrigger = defaultOptions.overlapTrigger;
    this.hasBackdrop = defaultOptions.hasBackdrop;
  }
  ngOnInit() {
    this.setPositionClasses();
  }
  ngAfterContentInit() {
    this._updateDirectDescendants();
    this._keyManager = new FocusKeyManager(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd();
    this._keyManager.tabOut.subscribe(() => this.closed.emit("tab"));
    this._directDescendantItems.changes.pipe(startWith(this._directDescendantItems), switchMap((items) => merge(...items.map((item) => item._focused)))).subscribe((focusedItem) => this._keyManager.updateActiveItem(focusedItem));
    this._directDescendantItems.changes.subscribe((itemsList) => {
      const manager = this._keyManager;
      if (this._panelAnimationState === "enter" && manager.activeItem?._hasFocus()) {
        const items = itemsList.toArray();
        const index = Math.max(0, Math.min(items.length - 1, manager.activeItemIndex || 0));
        if (items[index] && !items[index].disabled) {
          manager.setActiveItem(index);
        } else {
          manager.setNextItemActive();
        }
      }
    });
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._directDescendantItems.destroy();
    this.closed.complete();
    this._firstItemFocusRef?.destroy();
    clearTimeout(this._exitFallbackTimeout);
  }
  /** Stream that emits whenever the hovered menu item changes. */
  _hovered() {
    const itemChanges = this._directDescendantItems.changes;
    return itemChanges.pipe(startWith(this._directDescendantItems), switchMap((items) => merge(...items.map((item) => item._hovered))));
  }
  /*
   * Registers a menu item with the menu.
   * @docs-private
   * @deprecated No longer being used. To be removed.
   * @breaking-change 9.0.0
   */
  addItem(_item) {
  }
  /**
   * Removes an item from the menu.
   * @docs-private
   * @deprecated No longer being used. To be removed.
   * @breaking-change 9.0.0
   */
  removeItem(_item) {
  }
  /** Handle a keyboard event from the menu, delegating to the appropriate action. */
  _handleKeydown(event) {
    const keyCode = event.keyCode;
    const manager = this._keyManager;
    switch (keyCode) {
      case ESCAPE:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this.closed.emit("keydown");
        }
        break;
      case LEFT_ARROW:
        if (this.parentMenu && this.direction === "ltr") {
          this.closed.emit("keydown");
        }
        break;
      case RIGHT_ARROW:
        if (this.parentMenu && this.direction === "rtl") {
          this.closed.emit("keydown");
        }
        break;
      default:
        if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
          manager.setFocusOrigin("keyboard");
        }
        manager.onKeydown(event);
        return;
    }
  }
  /**
   * Focus the first item in the menu.
   * @param origin Action from which the focus originated. Used to set the correct styling.
   */
  focusFirstItem(origin = "program") {
    this._firstItemFocusRef?.destroy();
    this._firstItemFocusRef = afterNextRender(() => {
      const menuPanel = this._resolvePanel();
      if (!menuPanel || !menuPanel.contains(document.activeElement)) {
        const manager = this._keyManager;
        manager.setFocusOrigin(origin).setFirstItemActive();
        if (!manager.activeItem && menuPanel) {
          menuPanel.focus();
        }
      }
    }, {
      injector: this._injector
    });
  }
  /**
   * Resets the active item in the menu. This is used when the menu is opened, allowing
   * the user to start from the first option when pressing the down arrow.
   */
  resetActiveItem() {
    this._keyManager.setActiveItem(-1);
  }
  /**
   * @deprecated No longer used and will be removed.
   * @breaking-change 21.0.0
   */
  setElevation(_depth) {
  }
  /**
   * Adds classes to the menu panel based on its position. Can be used by
   * consumers to add specific styling based on the position.
   * @param posX Position of the menu along the x axis.
   * @param posY Position of the menu along the y axis.
   * @docs-private
   */
  setPositionClasses(posX = this.xPosition, posY = this.yPosition) {
    this._classList = __spreadProps(__spreadValues({}, this._classList), {
      ["mat-menu-before"]: posX === "before",
      ["mat-menu-after"]: posX === "after",
      ["mat-menu-above"]: posY === "above",
      ["mat-menu-below"]: posY === "below"
    });
    this._changeDetectorRef.markForCheck();
  }
  /** Callback that is invoked when the panel animation completes. */
  _onAnimationDone(state) {
    const isExit = state === EXIT_ANIMATION;
    if (isExit || state === ENTER_ANIMATION) {
      if (isExit) {
        clearTimeout(this._exitFallbackTimeout);
        this._exitFallbackTimeout = void 0;
      }
      this._animationDone.next(isExit ? "void" : "enter");
      this._isAnimating.set(false);
    }
  }
  _onAnimationStart(state) {
    if (state === ENTER_ANIMATION || state === EXIT_ANIMATION) {
      this._isAnimating.set(true);
    }
  }
  _setIsOpen(isOpen) {
    this._panelAnimationState = isOpen ? "enter" : "void";
    if (isOpen) {
      if (this._keyManager.activeItemIndex === 0) {
        const menuPanel = this._resolvePanel();
        if (menuPanel) {
          menuPanel.scrollTop = 0;
        }
      }
    } else if (!this._animationsDisabled) {
      this._exitFallbackTimeout = setTimeout(() => this._onAnimationDone(EXIT_ANIMATION), 200);
    }
    if (this._animationsDisabled) {
      setTimeout(() => {
        this._onAnimationDone(isOpen ? ENTER_ANIMATION : EXIT_ANIMATION);
      });
    }
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Sets up a stream that will keep track of any newly-added menu items and will update the list
   * of direct descendants. We collect the descendants this way, because `_allItems` can include
   * items that are part of child menus, and using a custom way of registering items is unreliable
   * when it comes to maintaining the item order.
   */
  _updateDirectDescendants() {
    this._allItems.changes.pipe(startWith(this._allItems)).subscribe((items) => {
      this._directDescendantItems.reset(items.filter((item) => item._parentMenu === this));
      this._directDescendantItems.notifyOnChanges();
    });
  }
  /** Gets the menu panel DOM node. */
  _resolvePanel() {
    let menuPanel = null;
    if (this._directDescendantItems.length) {
      menuPanel = this._directDescendantItems.first._getHostElement().closest('[role="menu"]');
    }
    return menuPanel;
  }
  static \u0275fac = function MatMenu_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMenu)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatMenu,
    selectors: [["mat-menu"]],
    contentQueries: function MatMenu_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MAT_MENU_CONTENT, 5);
        \u0275\u0275contentQuery(dirIndex, MatMenuItem, 5);
        \u0275\u0275contentQuery(dirIndex, MatMenuItem, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.lazyContent = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._allItems = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.items = _t);
      }
    },
    viewQuery: function MatMenu_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(TemplateRef, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templateRef = _t.first);
      }
    },
    hostVars: 3,
    hostBindings: function MatMenu_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-label", null)("aria-labelledby", null)("aria-describedby", null);
      }
    },
    inputs: {
      backdropClass: "backdropClass",
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"],
      xPosition: "xPosition",
      yPosition: "yPosition",
      overlapTrigger: [2, "overlapTrigger", "overlapTrigger", booleanAttribute],
      hasBackdrop: [2, "hasBackdrop", "hasBackdrop", (value) => value == null ? null : booleanAttribute(value)],
      panelClass: [0, "class", "panelClass"],
      classList: "classList"
    },
    outputs: {
      closed: "closed",
      close: "close"
    },
    exportAs: ["matMenu"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_MENU_PANEL,
      useExisting: _MatMenu
    }])],
    ngContentSelectors: _c3,
    decls: 1,
    vars: 0,
    consts: [["tabindex", "-1", "role", "menu", 1, "mat-mdc-menu-panel", 3, "click", "animationstart", "animationend", "animationcancel", "id"], [1, "mat-mdc-menu-content"]],
    template: function MatMenu_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domTemplate(0, MatMenu_ng_template_0_Template, 3, 12, "ng-template");
      }
    },
    styles: ['mat-menu{display:none}.mat-mdc-menu-content{margin:0;padding:8px 0;outline:0}.mat-mdc-menu-content,.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;flex:1;white-space:normal;font-family:var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));line-height:var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));font-size:var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));font-weight:var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight))}@keyframes _mat-menu-enter{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:none}}@keyframes _mat-menu-exit{from{opacity:1}to{opacity:0}}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;box-sizing:border-box;outline:0;animation:_mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);border-radius:var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));background-color:var(--mat-menu-container-color, var(--mat-sys-surface-container));box-shadow:var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));will-change:transform,opacity}.mat-mdc-menu-panel.mat-menu-panel-exit-animation{animation:_mat-menu-exit 100ms 25ms linear forwards}.mat-mdc-menu-panel.mat-menu-panel-animations-disabled{animation:none}.mat-mdc-menu-panel.mat-menu-panel-animating{pointer-events:none}.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty){display:none}@media(forced-colors: active){.mat-mdc-menu-panel{outline:solid 1px}}.mat-mdc-menu-panel .mat-divider{color:var(--mat-menu-divider-color, var(--mat-sys-surface-variant));margin-bottom:var(--mat-menu-divider-bottom-spacing, 8px);margin-top:var(--mat-menu-divider-top-spacing, 8px)}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none;margin:0;min-height:48px;padding-left:var(--mat-menu-item-leading-spacing, 12px);padding-right:var(--mat-menu-item-trailing-spacing, 12px);-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-menu-item::-moz-focus-inner{border:0}[dir=rtl] .mat-mdc-menu-item{padding-left:var(--mat-menu-item-trailing-spacing, 12px);padding-right:var(--mat-menu-item-leading-spacing, 12px)}.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-leading-spacing, 12px);padding-right:var(--mat-menu-item-with-icon-trailing-spacing, 12px)}[dir=rtl] .mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-trailing-spacing, 12px);padding-right:var(--mat-menu-item-with-icon-leading-spacing, 12px)}.mat-mdc-menu-item,.mat-mdc-menu-item:visited,.mat-mdc-menu-item:link{color:var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-menu-item .mat-icon-no-color,.mat-mdc-menu-item .mat-mdc-menu-submenu-icon{color:var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-menu-item[disabled]{cursor:default;opacity:.38}.mat-mdc-menu-item[disabled]::after{display:block;position:absolute;content:"";top:0;left:0;bottom:0;right:0}.mat-mdc-menu-item:focus{outline:0}.mat-mdc-menu-item .mat-icon{flex-shrink:0;margin-right:var(--mat-menu-item-spacing, 12px);height:var(--mat-menu-item-icon-size, 24px);width:var(--mat-menu-item-icon-size, 24px)}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:var(--mat-menu-item-spacing, 12px)}.mat-mdc-menu-item:not([disabled]):hover{background-color:var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}.mat-mdc-menu-item:not([disabled]).cdk-program-focused,.mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused,.mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted{background-color:var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}@media(forced-colors: active){.mat-mdc-menu-item{margin-top:1px}}.mat-mdc-menu-submenu-icon{width:var(--mat-menu-item-icon-size, 24px);height:10px;fill:currentColor;padding-left:var(--mat-menu-item-spacing, 12px)}[dir=rtl] .mat-mdc-menu-submenu-icon{padding-right:var(--mat-menu-item-spacing, 12px);padding-left:0}[dir=rtl] .mat-mdc-menu-submenu-icon polygon{transform:scaleX(-1);transform-origin:center}@media(forced-colors: active){.mat-mdc-menu-submenu-icon{fill:CanvasText}}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMenu, [{
    type: Component,
    args: [{
      selector: "mat-menu",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      exportAs: "matMenu",
      host: {
        "[attr.aria-label]": "null",
        "[attr.aria-labelledby]": "null",
        "[attr.aria-describedby]": "null"
      },
      providers: [{
        provide: MAT_MENU_PANEL,
        useExisting: MatMenu
      }],
      template: `<ng-template>
  <div
    class="mat-mdc-menu-panel"
    [id]="panelId"
    [class]="_classList"
    [class.mat-menu-panel-animations-disabled]="_animationsDisabled"
    [class.mat-menu-panel-exit-animation]="_panelAnimationState === 'void'"
    [class.mat-menu-panel-animating]="_isAnimating()"
    (click)="closed.emit('click')"
    tabindex="-1"
    role="menu"
    (animationstart)="_onAnimationStart($event.animationName)"
    (animationend)="_onAnimationDone($event.animationName)"
    (animationcancel)="_onAnimationDone($event.animationName)"
    [attr.aria-label]="ariaLabel || null"
    [attr.aria-labelledby]="ariaLabelledby || null"
    [attr.aria-describedby]="ariaDescribedby || null">
    <div class="mat-mdc-menu-content">
      <ng-content></ng-content>
    </div>
  </div>
</ng-template>
`,
      styles: ['mat-menu{display:none}.mat-mdc-menu-content{margin:0;padding:8px 0;outline:0}.mat-mdc-menu-content,.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;flex:1;white-space:normal;font-family:var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));line-height:var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));font-size:var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));font-weight:var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight))}@keyframes _mat-menu-enter{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:none}}@keyframes _mat-menu-exit{from{opacity:1}to{opacity:0}}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;box-sizing:border-box;outline:0;animation:_mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);border-radius:var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));background-color:var(--mat-menu-container-color, var(--mat-sys-surface-container));box-shadow:var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));will-change:transform,opacity}.mat-mdc-menu-panel.mat-menu-panel-exit-animation{animation:_mat-menu-exit 100ms 25ms linear forwards}.mat-mdc-menu-panel.mat-menu-panel-animations-disabled{animation:none}.mat-mdc-menu-panel.mat-menu-panel-animating{pointer-events:none}.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty){display:none}@media(forced-colors: active){.mat-mdc-menu-panel{outline:solid 1px}}.mat-mdc-menu-panel .mat-divider{color:var(--mat-menu-divider-color, var(--mat-sys-surface-variant));margin-bottom:var(--mat-menu-divider-bottom-spacing, 8px);margin-top:var(--mat-menu-divider-top-spacing, 8px)}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none;margin:0;min-height:48px;padding-left:var(--mat-menu-item-leading-spacing, 12px);padding-right:var(--mat-menu-item-trailing-spacing, 12px);-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-menu-item::-moz-focus-inner{border:0}[dir=rtl] .mat-mdc-menu-item{padding-left:var(--mat-menu-item-trailing-spacing, 12px);padding-right:var(--mat-menu-item-leading-spacing, 12px)}.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-leading-spacing, 12px);padding-right:var(--mat-menu-item-with-icon-trailing-spacing, 12px)}[dir=rtl] .mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-trailing-spacing, 12px);padding-right:var(--mat-menu-item-with-icon-leading-spacing, 12px)}.mat-mdc-menu-item,.mat-mdc-menu-item:visited,.mat-mdc-menu-item:link{color:var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-menu-item .mat-icon-no-color,.mat-mdc-menu-item .mat-mdc-menu-submenu-icon{color:var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-menu-item[disabled]{cursor:default;opacity:.38}.mat-mdc-menu-item[disabled]::after{display:block;position:absolute;content:"";top:0;left:0;bottom:0;right:0}.mat-mdc-menu-item:focus{outline:0}.mat-mdc-menu-item .mat-icon{flex-shrink:0;margin-right:var(--mat-menu-item-spacing, 12px);height:var(--mat-menu-item-icon-size, 24px);width:var(--mat-menu-item-icon-size, 24px)}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:var(--mat-menu-item-spacing, 12px)}.mat-mdc-menu-item:not([disabled]):hover{background-color:var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}.mat-mdc-menu-item:not([disabled]).cdk-program-focused,.mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused,.mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted{background-color:var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}@media(forced-colors: active){.mat-mdc-menu-item{margin-top:1px}}.mat-mdc-menu-submenu-icon{width:var(--mat-menu-item-icon-size, 24px);height:10px;fill:currentColor;padding-left:var(--mat-menu-item-spacing, 12px)}[dir=rtl] .mat-mdc-menu-submenu-icon{padding-right:var(--mat-menu-item-spacing, 12px);padding-left:0}[dir=rtl] .mat-mdc-menu-submenu-icon polygon{transform:scaleX(-1);transform-origin:center}@media(forced-colors: active){.mat-mdc-menu-submenu-icon{fill:CanvasText}}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}\n']
    }]
  }], () => [], {
    _allItems: [{
      type: ContentChildren,
      args: [MatMenuItem, {
        descendants: true
      }]
    }],
    backdropClass: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedby: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    xPosition: [{
      type: Input
    }],
    yPosition: [{
      type: Input
    }],
    templateRef: [{
      type: ViewChild,
      args: [TemplateRef]
    }],
    items: [{
      type: ContentChildren,
      args: [MatMenuItem, {
        descendants: false
      }]
    }],
    lazyContent: [{
      type: ContentChild,
      args: [MAT_MENU_CONTENT]
    }],
    overlapTrigger: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hasBackdrop: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? null : booleanAttribute(value)
      }]
    }],
    panelClass: [{
      type: Input,
      args: ["class"]
    }],
    classList: [{
      type: Input
    }],
    closed: [{
      type: Output
    }],
    close: [{
      type: Output
    }]
  });
})();
var MAT_MENU_SCROLL_STRATEGY = new InjectionToken("mat-menu-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector);
  }
});
function MAT_MENU_SCROLL_STRATEGY_FACTORY(_overlay) {
  const injector = inject(Injector);
  return () => createRepositionScrollStrategy(injector);
}
var MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MAT_MENU_SCROLL_STRATEGY,
  deps: [],
  useFactory: MAT_MENU_SCROLL_STRATEGY_FACTORY
};
var PANELS_TO_TRIGGERS = /* @__PURE__ */ new WeakMap();
var MatMenuTriggerBase = class _MatMenuTriggerBase {
  _canHaveBackdrop;
  _element = inject(ElementRef);
  _viewContainerRef = inject(ViewContainerRef);
  _menuItemInstance = inject(MatMenuItem, {
    optional: true,
    self: true
  });
  _dir = inject(Directionality, {
    optional: true
  });
  _focusMonitor = inject(FocusMonitor);
  _ngZone = inject(NgZone);
  _injector = inject(Injector);
  _scrollStrategy = inject(MAT_MENU_SCROLL_STRATEGY);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _animationsDisabled = _animationsDisabled();
  _portal;
  _overlayRef = null;
  _menuOpen = false;
  _closingActionsSubscription = Subscription.EMPTY;
  _menuCloseSubscription = Subscription.EMPTY;
  _pendingRemoval;
  /**
   * We're specifically looking for a `MatMenu` here since the generic `MatMenuPanel`
   * interface lacks some functionality around nested menus and animations.
   */
  _parentMaterialMenu;
  /**
   * Cached value of the padding of the parent menu panel.
   * Used to offset sub-menus to compensate for the padding.
   */
  _parentInnerPadding;
  // Tracking input type is necessary so it's possible to only auto-focus
  // the first item of the list when the menu is opened via the keyboard
  _openedBy = void 0;
  /** Menu currently assigned to the trigger. */
  get _menu() {
    return this._menuInternal;
  }
  set _menu(menu) {
    if (menu === this._menuInternal) {
      return;
    }
    this._menuInternal = menu;
    this._menuCloseSubscription.unsubscribe();
    if (menu) {
      if (menu === this._parentMaterialMenu && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throwMatMenuRecursiveError();
      }
      this._menuCloseSubscription = menu.close.subscribe((reason) => {
        this._destroyMenu(reason);
        if ((reason === "click" || reason === "tab") && this._parentMaterialMenu) {
          this._parentMaterialMenu.closed.emit(reason);
        }
      });
    }
    this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu());
  }
  _menuInternal;
  constructor(_canHaveBackdrop) {
    this._canHaveBackdrop = _canHaveBackdrop;
    const parentMenu = inject(MAT_MENU_PANEL, {
      optional: true
    });
    this._parentMaterialMenu = parentMenu instanceof MatMenu ? parentMenu : void 0;
  }
  ngOnDestroy() {
    if (this._menu && this._ownsMenu(this._menu)) {
      PANELS_TO_TRIGGERS.delete(this._menu);
    }
    this._pendingRemoval?.unsubscribe();
    this._menuCloseSubscription.unsubscribe();
    this._closingActionsSubscription.unsubscribe();
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }
  /** Whether the menu is open. */
  get menuOpen() {
    return this._menuOpen;
  }
  /** The text direction of the containing app. */
  get dir() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Whether the menu triggers a sub-menu or a top-level one. */
  _triggersSubmenu() {
    return !!(this._menuItemInstance && this._parentMaterialMenu && this._menu);
  }
  _closeMenu() {
    this._menu?.close.emit();
  }
  /** Internal method to open menu providing option to auto focus on first item. */
  _openMenu(autoFocus) {
    const menu = this._menu;
    if (this._menuOpen || !menu) {
      return;
    }
    this._pendingRemoval?.unsubscribe();
    const previousTrigger = PANELS_TO_TRIGGERS.get(menu);
    PANELS_TO_TRIGGERS.set(menu, this);
    if (previousTrigger && previousTrigger !== this) {
      previousTrigger._closeMenu();
    }
    const overlayRef = this._createOverlay(menu);
    const overlayConfig = overlayRef.getConfig();
    const positionStrategy = overlayConfig.positionStrategy;
    this._setPosition(menu, positionStrategy);
    if (this._canHaveBackdrop) {
      overlayConfig.hasBackdrop = menu.hasBackdrop == null ? !this._triggersSubmenu() : menu.hasBackdrop;
    } else {
      overlayConfig.hasBackdrop = false;
    }
    if (!overlayRef.hasAttached()) {
      overlayRef.attach(this._getPortal(menu));
      menu.lazyContent?.attach(this.menuData);
    }
    this._closingActionsSubscription = this._menuClosingActions().subscribe(() => this._closeMenu());
    menu.parentMenu = this._triggersSubmenu() ? this._parentMaterialMenu : void 0;
    menu.direction = this.dir;
    if (autoFocus) {
      menu.focusFirstItem(this._openedBy || "program");
    }
    this._setIsMenuOpen(true);
    if (menu instanceof MatMenu) {
      menu._setIsOpen(true);
      menu._directDescendantItems.changes.pipe(takeUntil(menu.close)).subscribe(() => {
        positionStrategy.withLockedPosition(false).reapplyLastPosition();
        positionStrategy.withLockedPosition(true);
      });
    }
  }
  /**
   * Focuses the menu trigger.
   * @param origin Source of the menu trigger's focus.
   */
  focus(origin, options) {
    if (this._focusMonitor && origin) {
      this._focusMonitor.focusVia(this._element, origin, options);
    } else {
      this._element.nativeElement.focus(options);
    }
  }
  /** Closes the menu and does the necessary cleanup. */
  _destroyMenu(reason) {
    const overlayRef = this._overlayRef;
    const menu = this._menu;
    if (!overlayRef || !this.menuOpen) {
      return;
    }
    this._closingActionsSubscription.unsubscribe();
    this._pendingRemoval?.unsubscribe();
    if (menu instanceof MatMenu && this._ownsMenu(menu)) {
      this._pendingRemoval = menu._animationDone.pipe(take(1)).subscribe(() => {
        overlayRef.detach();
        if (!PANELS_TO_TRIGGERS.has(menu)) {
          menu.lazyContent?.detach();
        }
      });
      menu._setIsOpen(false);
    } else {
      overlayRef.detach();
      menu?.lazyContent?.detach();
    }
    if (menu && this._ownsMenu(menu)) {
      PANELS_TO_TRIGGERS.delete(menu);
    }
    if (this.restoreFocus && (reason === "keydown" || !this._openedBy || !this._triggersSubmenu())) {
      this.focus(this._openedBy);
    }
    this._openedBy = void 0;
    this._setIsMenuOpen(false);
  }
  // set state rather than toggle to support triggers sharing a menu
  _setIsMenuOpen(isOpen) {
    if (isOpen !== this._menuOpen) {
      this._menuOpen = isOpen;
      this._menuOpen ? this.menuOpened.emit() : this.menuClosed.emit();
      if (this._triggersSubmenu()) {
        this._menuItemInstance._setHighlighted(isOpen);
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  /**
   * This method creates the overlay from the provided menu's template and saves its
   * OverlayRef so that it can be attached to the DOM when openMenu is called.
   */
  _createOverlay(menu) {
    if (!this._overlayRef) {
      const config = this._getOverlayConfig(menu);
      this._subscribeToPositions(menu, config.positionStrategy);
      this._overlayRef = createOverlayRef(this._injector, config);
      this._overlayRef.keydownEvents().subscribe((event) => {
        if (this._menu instanceof MatMenu) {
          this._menu._handleKeydown(event);
        }
      });
    }
    return this._overlayRef;
  }
  /**
   * This method builds the configuration object needed to create the overlay, the OverlayState.
   * @returns OverlayConfig
   */
  _getOverlayConfig(menu) {
    return new OverlayConfig({
      positionStrategy: createFlexibleConnectedPositionStrategy(this._injector, this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),
      backdropClass: menu.backdropClass || "cdk-overlay-transparent-backdrop",
      panelClass: menu.overlayPanelClass,
      scrollStrategy: this._scrollStrategy(),
      direction: this._dir || "ltr",
      disableAnimations: this._animationsDisabled
    });
  }
  /**
   * Listens to changes in the position of the overlay and sets the correct classes
   * on the menu based on the new position. This ensures the animation origin is always
   * correct, even if a fallback position is used for the overlay.
   */
  _subscribeToPositions(menu, position) {
    if (menu.setPositionClasses) {
      position.positionChanges.subscribe((change) => {
        this._ngZone.run(() => {
          const posX = change.connectionPair.overlayX === "start" ? "after" : "before";
          const posY = change.connectionPair.overlayY === "top" ? "below" : "above";
          menu.setPositionClasses(posX, posY);
        });
      });
    }
  }
  /**
   * Sets the appropriate positions on a position strategy
   * so the overlay connects with the trigger correctly.
   * @param positionStrategy Strategy whose position to update.
   */
  _setPosition(menu, positionStrategy) {
    let [originX, originFallbackX] = menu.xPosition === "before" ? ["end", "start"] : ["start", "end"];
    let [overlayY, overlayFallbackY] = menu.yPosition === "above" ? ["bottom", "top"] : ["top", "bottom"];
    let [originY, originFallbackY] = [overlayY, overlayFallbackY];
    let [overlayX, overlayFallbackX] = [originX, originFallbackX];
    let offsetY = 0;
    if (this._triggersSubmenu()) {
      overlayFallbackX = originX = menu.xPosition === "before" ? "start" : "end";
      originFallbackX = overlayX = originX === "end" ? "start" : "end";
      if (this._parentMaterialMenu) {
        if (this._parentInnerPadding == null) {
          const firstItem = this._parentMaterialMenu.items.first;
          this._parentInnerPadding = firstItem ? firstItem._getHostElement().offsetTop : 0;
        }
        offsetY = overlayY === "bottom" ? this._parentInnerPadding : -this._parentInnerPadding;
      }
    } else if (!menu.overlapTrigger) {
      originY = overlayY === "top" ? "bottom" : "top";
      originFallbackY = overlayFallbackY === "top" ? "bottom" : "top";
    }
    positionStrategy.withPositions([{
      originX,
      originY,
      overlayX,
      overlayY,
      offsetY
    }, {
      originX: originFallbackX,
      originY,
      overlayX: overlayFallbackX,
      overlayY,
      offsetY
    }, {
      originX,
      originY: originFallbackY,
      overlayX,
      overlayY: overlayFallbackY,
      offsetY: -offsetY
    }, {
      originX: originFallbackX,
      originY: originFallbackY,
      overlayX: overlayFallbackX,
      overlayY: overlayFallbackY,
      offsetY: -offsetY
    }]);
  }
  /** Returns a stream that emits whenever an action that should close the menu occurs. */
  _menuClosingActions() {
    const outsideClicks = this._getOutsideClickStream(this._overlayRef);
    const detachments = this._overlayRef.detachments();
    const parentClose = this._parentMaterialMenu ? this._parentMaterialMenu.closed : of();
    const hover = this._parentMaterialMenu ? this._parentMaterialMenu._hovered().pipe(filter((active) => this._menuOpen && active !== this._menuItemInstance)) : of();
    return merge(outsideClicks, parentClose, hover, detachments);
  }
  /** Gets the portal that should be attached to the overlay. */
  _getPortal(menu) {
    if (!this._portal || this._portal.templateRef !== menu.templateRef) {
      this._portal = new TemplatePortal(menu.templateRef, this._viewContainerRef);
    }
    return this._portal;
  }
  /**
   * Determines whether the trigger owns a specific menu panel, at the current point in time.
   * This allows us to distinguish the case where the same panel is passed into multiple triggers
   * and multiple are open at a time.
   */
  _ownsMenu(menu) {
    return PANELS_TO_TRIGGERS.get(menu) === this;
  }
  static \u0275fac = function MatMenuTriggerBase_Factory(__ngFactoryType__) {
    \u0275\u0275invalidFactory();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatMenuTriggerBase
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMenuTriggerBase, [{
    type: Directive
  }], () => [{
    type: void 0
  }], null);
})();
var MatMenuTrigger = class _MatMenuTrigger extends MatMenuTriggerBase {
  _cleanupTouchstart;
  _hoverSubscription = Subscription.EMPTY;
  /**
   * @deprecated
   * @breaking-change 8.0.0
   */
  get _deprecatedMatMenuTriggerFor() {
    return this.menu;
  }
  set _deprecatedMatMenuTriggerFor(v) {
    this.menu = v;
  }
  /** References the menu instance that the trigger is associated with. */
  get menu() {
    return this._menu;
  }
  set menu(menu) {
    this._menu = menu;
  }
  /** Data to be passed along to any lazily-rendered content. */
  menuData;
  /**
   * Whether focus should be restored when the menu is closed.
   * Note that disabling this option can have accessibility implications
   * and it's up to you to manage focus, if you decide to turn it off.
   */
  restoreFocus = true;
  /** Event emitted when the associated menu is opened. */
  menuOpened = new EventEmitter();
  /**
   * Event emitted when the associated menu is opened.
   * @deprecated Switch to `menuOpened` instead
   * @breaking-change 8.0.0
   */
  // tslint:disable-next-line:no-output-on-prefix
  onMenuOpen = this.menuOpened;
  /** Event emitted when the associated menu is closed. */
  menuClosed = new EventEmitter();
  /**
   * Event emitted when the associated menu is closed.
   * @deprecated Switch to `menuClosed` instead
   * @breaking-change 8.0.0
   */
  // tslint:disable-next-line:no-output-on-prefix
  onMenuClose = this.menuClosed;
  constructor() {
    super(true);
    const renderer = inject(Renderer2);
    this._cleanupTouchstart = renderer.listen(this._element.nativeElement, "touchstart", (event) => {
      if (!isFakeTouchstartFromScreenReader(event)) {
        this._openedBy = "touch";
      }
    }, {
      passive: true
    });
  }
  /** Whether the menu triggers a sub-menu or a top-level one. */
  triggersSubmenu() {
    return super._triggersSubmenu();
  }
  /** Toggles the menu between the open and closed states. */
  toggleMenu() {
    return this.menuOpen ? this.closeMenu() : this.openMenu();
  }
  /** Opens the menu. */
  openMenu() {
    this._openMenu(true);
  }
  /** Closes the menu. */
  closeMenu() {
    this._closeMenu();
  }
  /**
   * Updates the position of the menu to ensure that it fits all options within the viewport.
   */
  updatePosition() {
    this._overlayRef?.updatePosition();
  }
  ngAfterContentInit() {
    this._handleHover();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._cleanupTouchstart();
    this._hoverSubscription.unsubscribe();
  }
  _getOverlayOrigin() {
    return this._element;
  }
  _getOutsideClickStream(overlayRef) {
    return overlayRef.backdropClick();
  }
  /** Handles mouse presses on the trigger. */
  _handleMousedown(event) {
    if (!isFakeMousedownFromScreenReader(event)) {
      this._openedBy = event.button === 0 ? "mouse" : void 0;
      if (this.triggersSubmenu()) {
        event.preventDefault();
      }
    }
  }
  /** Handles key presses on the trigger. */
  _handleKeydown(event) {
    const keyCode = event.keyCode;
    if (keyCode === ENTER || keyCode === SPACE) {
      this._openedBy = "keyboard";
    }
    if (this.triggersSubmenu() && (keyCode === RIGHT_ARROW && this.dir === "ltr" || keyCode === LEFT_ARROW && this.dir === "rtl")) {
      this._openedBy = "keyboard";
      this.openMenu();
    }
  }
  /** Handles click events on the trigger. */
  _handleClick(event) {
    if (this.triggersSubmenu()) {
      event.stopPropagation();
      this.openMenu();
    } else {
      this.toggleMenu();
    }
  }
  /** Handles the cases where the user hovers over the trigger. */
  _handleHover() {
    if (this.triggersSubmenu() && this._parentMaterialMenu) {
      this._hoverSubscription = this._parentMaterialMenu._hovered().subscribe((active) => {
        if (active === this._menuItemInstance && !active.disabled && // Ignore hover events if the parent menu is in the process of being closed (see #31956).
        this._parentMaterialMenu?._panelAnimationState !== "void") {
          this._openedBy = "mouse";
          this._openMenu(false);
        }
      });
    }
  }
  static \u0275fac = function MatMenuTrigger_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMenuTrigger)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatMenuTrigger,
    selectors: [["", "mat-menu-trigger-for", ""], ["", "matMenuTriggerFor", ""]],
    hostAttrs: [1, "mat-mdc-menu-trigger"],
    hostVars: 3,
    hostBindings: function MatMenuTrigger_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function MatMenuTrigger_click_HostBindingHandler($event) {
          return ctx._handleClick($event);
        })("mousedown", function MatMenuTrigger_mousedown_HostBindingHandler($event) {
          return ctx._handleMousedown($event);
        })("keydown", function MatMenuTrigger_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("aria-haspopup", ctx.menu ? "menu" : null)("aria-expanded", ctx.menuOpen)("aria-controls", ctx.menuOpen ? ctx.menu == null ? null : ctx.menu.panelId : null);
      }
    },
    inputs: {
      _deprecatedMatMenuTriggerFor: [0, "mat-menu-trigger-for", "_deprecatedMatMenuTriggerFor"],
      menu: [0, "matMenuTriggerFor", "menu"],
      menuData: [0, "matMenuTriggerData", "menuData"],
      restoreFocus: [0, "matMenuTriggerRestoreFocus", "restoreFocus"]
    },
    outputs: {
      menuOpened: "menuOpened",
      onMenuOpen: "onMenuOpen",
      menuClosed: "menuClosed",
      onMenuClose: "onMenuClose"
    },
    exportAs: ["matMenuTrigger"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMenuTrigger, [{
    type: Directive,
    args: [{
      selector: "[mat-menu-trigger-for], [matMenuTriggerFor]",
      host: {
        "class": "mat-mdc-menu-trigger",
        "[attr.aria-haspopup]": 'menu ? "menu" : null',
        "[attr.aria-expanded]": "menuOpen",
        "[attr.aria-controls]": "menuOpen ? menu?.panelId : null",
        "(click)": "_handleClick($event)",
        "(mousedown)": "_handleMousedown($event)",
        "(keydown)": "_handleKeydown($event)"
      },
      exportAs: "matMenuTrigger"
    }]
  }], () => [], {
    _deprecatedMatMenuTriggerFor: [{
      type: Input,
      args: ["mat-menu-trigger-for"]
    }],
    menu: [{
      type: Input,
      args: ["matMenuTriggerFor"]
    }],
    menuData: [{
      type: Input,
      args: ["matMenuTriggerData"]
    }],
    restoreFocus: [{
      type: Input,
      args: ["matMenuTriggerRestoreFocus"]
    }],
    menuOpened: [{
      type: Output
    }],
    onMenuOpen: [{
      type: Output
    }],
    menuClosed: [{
      type: Output
    }],
    onMenuClose: [{
      type: Output
    }]
  });
})();
var MatContextMenuTrigger = class _MatContextMenuTrigger extends MatMenuTriggerBase {
  _point = {
    x: 0,
    y: 0,
    initialX: 0,
    initialY: 0,
    initialScrollX: 0,
    initialScrollY: 0
  };
  _triggerPressedControl = false;
  _rootNode;
  _document = inject(DOCUMENT);
  _viewportRuler = inject(ViewportRuler);
  _scrollDispatcher = inject(ScrollDispatcher);
  _scrollSubscription;
  /** References the menu instance that the trigger is associated with. */
  get menu() {
    return this._menu;
  }
  set menu(menu) {
    this._menu = menu;
  }
  /** Data to be passed along to any lazily-rendered content. */
  menuData;
  /**
   * Whether focus should be restored when the menu is closed.
   * Note that disabling this option can have accessibility implications
   * and it's up to you to manage focus, if you decide to turn it off.
   */
  restoreFocus = true;
  /** Whether the context menu is disabled. */
  disabled = false;
  /** Event emitted when the associated menu is opened. */
  menuOpened = new EventEmitter();
  /** Event emitted when the associated menu is closed. */
  menuClosed = new EventEmitter();
  constructor() {
    super(false);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._scrollSubscription?.unsubscribe();
  }
  /** Handler for `contextmenu` events. */
  _handleContextMenuEvent(event) {
    if (!this.disabled) {
      event.preventDefault();
      if (this.menuOpen) {
        this._initializePoint(event.clientX, event.clientY);
        this._updatePosition();
      } else {
        this._openContextMenu(event);
      }
    }
  }
  _destroyMenu(reason) {
    super._destroyMenu(reason);
    this._scrollSubscription?.unsubscribe();
  }
  _getOverlayOrigin() {
    return this._point;
  }
  _getOutsideClickStream(overlayRef) {
    return overlayRef.outsidePointerEvents().pipe(skipWhile((event, index) => {
      if (event.type === "contextmenu") {
        return this._isWithinMenuOrTrigger(_getEventTarget(event));
      } else if (event.type === "auxclick") {
        if (index === 0) {
          return true;
        }
        this._rootNode ??= _getShadowRoot(this._element.nativeElement) || this._document;
        return this._isWithinMenuOrTrigger(this._rootNode.elementFromPoint(event.clientX, event.clientY));
      }
      return this._triggerPressedControl && index === 0 && event.ctrlKey;
    }));
  }
  /** Checks whether an element is within the trigger or the opened overlay. */
  _isWithinMenuOrTrigger(target) {
    if (!target) {
      return false;
    }
    const element = this._element.nativeElement;
    if (target === element || element.contains(target)) {
      return true;
    }
    const overlay = this._overlayRef?.hostElement;
    return overlay === target || !!overlay?.contains(target);
  }
  /** Opens the context menu. */
  _openContextMenu(event) {
    if (event.button === 2) {
      this._openedBy = "mouse";
    } else {
      this._openedBy = event.button === 0 ? "keyboard" : void 0;
    }
    this._initializePoint(event.clientX, event.clientY);
    this._triggerPressedControl = event.ctrlKey;
    super._openMenu(true);
    this._scrollSubscription?.unsubscribe();
    this._scrollSubscription = this._scrollDispatcher.scrolled(0).subscribe(() => {
      const position = this._viewportRuler.getViewportScrollPosition();
      const point = this._point;
      point.y = point.initialY + (point.initialScrollY - position.top);
      point.x = point.initialX + (point.initialScrollX - position.left);
      this._updatePosition();
    });
  }
  /** Initializes the point representing the origin relative to which the menu will be rendered. */
  _initializePoint(x, y) {
    const scrollPosition = this._viewportRuler.getViewportScrollPosition();
    const point = this._point;
    point.x = point.initialX = x;
    point.y = point.initialY = y;
    point.initialScrollX = scrollPosition.left;
    point.initialScrollY = scrollPosition.top;
  }
  /** Refreshes the position of the overlay. */
  _updatePosition() {
    const overlayRef = this._overlayRef;
    if (overlayRef) {
      const positionStrategy = overlayRef.getConfig().positionStrategy;
      positionStrategy.setOrigin(this._point);
      overlayRef.updatePosition();
    }
  }
  static \u0275fac = function MatContextMenuTrigger_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatContextMenuTrigger)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatContextMenuTrigger,
    selectors: [["", "matContextMenuTriggerFor", ""]],
    hostAttrs: [1, "mat-context-menu-trigger"],
    hostVars: 3,
    hostBindings: function MatContextMenuTrigger_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("contextmenu", function MatContextMenuTrigger_contextmenu_HostBindingHandler($event) {
          return ctx._handleContextMenuEvent($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("aria-controls", ctx.menuOpen ? ctx.menu == null ? null : ctx.menu.panelId : null);
        \u0275\u0275classProp("mat-context-menu-trigger-disabled", ctx.disabled);
      }
    },
    inputs: {
      menu: [0, "matContextMenuTriggerFor", "menu"],
      menuData: [0, "matContextMenuTriggerData", "menuData"],
      restoreFocus: [0, "matContextMenuTriggerRestoreFocus", "restoreFocus"],
      disabled: [2, "matContextMenuTriggerDisabled", "disabled", booleanAttribute]
    },
    outputs: {
      menuOpened: "menuOpened",
      menuClosed: "menuClosed"
    },
    exportAs: ["matContextMenuTrigger"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatContextMenuTrigger, [{
    type: Directive,
    args: [{
      selector: "[matContextMenuTriggerFor]",
      host: {
        "class": "mat-context-menu-trigger",
        "[class.mat-context-menu-trigger-disabled]": "disabled",
        "[attr.aria-controls]": "menuOpen ? menu?.panelId : null",
        "(contextmenu)": "_handleContextMenuEvent($event)"
      },
      exportAs: "matContextMenuTrigger"
    }]
  }], () => [], {
    menu: [{
      type: Input,
      args: [{
        alias: "matContextMenuTriggerFor",
        required: true
      }]
    }],
    menuData: [{
      type: Input,
      args: ["matContextMenuTriggerData"]
    }],
    restoreFocus: [{
      type: Input,
      args: ["matContextMenuTriggerRestoreFocus"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "matContextMenuTriggerDisabled",
        transform: booleanAttribute
      }]
    }],
    menuOpened: [{
      type: Output
    }],
    menuClosed: [{
      type: Output
    }]
  });
})();
var MatMenuModule = class _MatMenuModule {
  static \u0275fac = function MatMenuModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMenuModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatMenuModule,
    imports: [MatRippleModule, MatCommonModule, OverlayModule, MatMenu, MatMenuItem, MatMenuContent, MatMenuTrigger, MatContextMenuTrigger],
    exports: [CdkScrollableModule, MatMenu, MatCommonModule, MatMenuItem, MatMenuContent, MatMenuTrigger, MatContextMenuTrigger]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER],
    imports: [MatRippleModule, MatCommonModule, OverlayModule, CdkScrollableModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMenuModule, [{
    type: NgModule,
    args: [{
      imports: [MatRippleModule, MatCommonModule, OverlayModule, MatMenu, MatMenuItem, MatMenuContent, MatMenuTrigger, MatContextMenuTrigger],
      exports: [CdkScrollableModule, MatMenu, MatCommonModule, MatMenuItem, MatMenuContent, MatMenuTrigger, MatContextMenuTrigger],
      providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();
var matMenuAnimations = {
  // Represents:
  // trigger('transformMenu', [
  //   state(
  //     'void',
  //     style({
  //       opacity: 0,
  //       transform: 'scale(0.8)',
  //     }),
  //   ),
  //   transition(
  //     'void => enter',
  //     animate(
  //       '120ms cubic-bezier(0, 0, 0.2, 1)',
  //       style({
  //         opacity: 1,
  //         transform: 'scale(1)',
  //       }),
  //     ),
  //   ),
  //   transition('* => void', animate('100ms 25ms linear', style({opacity: 0}))),
  // ])
  /**
   * This animation controls the menu panel's entry and exit from the page.
   *
   * When the menu panel is added to the DOM, it scales in and fades in its border.
   *
   * When the menu panel is removed from the DOM, it simply fades out after a brief
   * delay to display the ripple.
   */
  transformMenu: {
    type: 7,
    name: "transformMenu",
    definitions: [{
      type: 0,
      name: "void",
      styles: {
        type: 6,
        styles: {
          opacity: 0,
          transform: "scale(0.8)"
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "void => enter",
      animation: {
        type: 4,
        styles: {
          type: 6,
          styles: {
            opacity: 1,
            transform: "scale(1)"
          },
          offset: null
        },
        timings: "120ms cubic-bezier(0, 0, 0.2, 1)"
      },
      options: null
    }, {
      type: 1,
      expr: "* => void",
      animation: {
        type: 4,
        styles: {
          type: 6,
          styles: {
            opacity: 0
          },
          offset: null
        },
        timings: "100ms 25ms linear"
      },
      options: null
    }],
    options: {}
  },
  // Represents:
  // trigger('fadeInItems', [
  //   // TODO(crisbeto): this is inside the `transformMenu`
  //   // now. Remove next time we do breaking changes.
  //   state('showing', style({opacity: 1})),
  //   transition('void => *', [
  //     style({opacity: 0}),
  //     animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
  //   ]),
  // ])
  /**
   * This animation fades in the background color and content of the menu panel
   * after its containing element is scaled in.
   */
  fadeInItems: {
    type: 7,
    name: "fadeInItems",
    definitions: [{
      type: 0,
      name: "showing",
      styles: {
        type: 6,
        styles: {
          opacity: 1
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "void => *",
      animation: [{
        type: 6,
        styles: {
          opacity: 0
        },
        offset: null
      }, {
        type: 4,
        styles: null,
        timings: "400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)"
      }],
      options: null
    }],
    options: {}
  }
};
var fadeInItems = matMenuAnimations.fadeInItems;
var transformMenu = matMenuAnimations.transformMenu;

// src/app/services/devices.service.ts
var DevicesService = class _DevicesService {
  api;
  http;
  apiUrl = "/api/devices";
  constructor(api, http) {
    this.api = api;
    this.http = http;
  }
  /** ✅ Get all devices */
  getAllDevices() {
    return this.http.get(this.apiUrl);
  }
  deleteDevice(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  /** ✅ Get device by serial number */
  getBySerial(serial) {
    return this.api.get(`/devices/by-serial/${encodeURIComponent(serial)}`);
  }
  /** ✅ Search devices by filters */
  search(location, type, status) {
    const params = { location };
    if (type)
      params["type"] = type;
    if (status)
      params["status"] = status;
    return this.api.get("/api/devices/search", params);
  }
  /** ✅ Update serial number for a device */
  updateSerial(deviceId, newSerial) {
    return this.api.put(`/devices/${deviceId}/update-serial`, { newSerial });
  }
  /** ✅ Download filtered results as Excel / Word / PDF */
  downloadSearchResults(location, type, status, format = "excel") {
    const params = { location, format };
    if (type)
      params["type"] = type;
    if (status)
      params["status"] = status;
    return this.api.get("/devices/search/download", params, {
      responseType: "blob"
      // fix TypeScript error
    });
  }
  static \u0275fac = function DevicesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DevicesService)(\u0275\u0275inject(ApiService), \u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DevicesService, factory: _DevicesService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DevicesService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: ApiService }, { type: HttpClient }], null);
})();

// src/app/components/admin/dashboard/dashboard.component.ts
function DashboardComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "mat-card", 23)(2, "mat-card-content")(3, "div", 24)(4, "mat-icon", 25);
    \u0275\u0275text(5, "devices");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 26)(7, "div", 27);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 28);
    \u0275\u0275text(10, "Total Devices");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(11, "mat-card", 29)(12, "mat-card-content")(13, "div", 24)(14, "mat-icon", 25);
    \u0275\u0275text(15, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 26)(17, "div", 27);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 28);
    \u0275\u0275text(20, "Active");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(21, "mat-card", 30)(22, "mat-card-content")(23, "div", 24)(24, "mat-icon", 25);
    \u0275\u0275text(25, "electric_bolt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 26)(27, "div", 27);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 28);
    \u0275\u0275text(30, "Poles");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(31, "mat-card", 31)(32, "mat-card-content")(33, "div", 24)(34, "mat-icon", 25);
    \u0275\u0275text(35, "security");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 26)(37, "div", 27);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 28);
    \u0275\u0275text(40, "ECB Present");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.devices.length);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.getActiveDevicesCount());
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.getPolesCount());
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.getECBCount());
  }
}
function DashboardComponent_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275element(1, "mat-spinner", 33);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading devices...");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_div_45_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "ID");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 61)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", d_r4.id);
  }
}
function DashboardComponent_div_45_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Serial Number");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 62)(1, "code");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r5.serialNumber || "N/A");
  }
}
function DashboardComponent_div_45_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Device Type");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 63)(1, "mat-chip", 64);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("color", ctx_r1.getDeviceTypeColor(d_r6.deviceType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r6.deviceType || "Unknown", " ");
  }
}
function DashboardComponent_div_45_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Location");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 65)(1, "mat-icon", 66);
    \u0275\u0275text(2, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", d_r7.locationName || "No location", " ");
  }
}
function DashboardComponent_div_45_ng_container_22_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Coordinates");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_ng_container_22_td_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "br");
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Lat: ", \u0275\u0275pipeBind2(3, 2, d_r8.latitude, "1.4-4"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Lng: ", \u0275\u0275pipeBind2(7, 5, d_r8.longitude, "1.4-4"));
  }
}
function DashboardComponent_div_45_ng_container_22_td_2_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1, "No coordinates");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_ng_container_22_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 69);
    \u0275\u0275template(1, DashboardComponent_div_45_ng_container_22_td_2_div_1_Template, 8, 8, "div", 70)(2, DashboardComponent_div_45_ng_container_22_td_2_ng_template_2_Template, 2, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r8 = ctx.$implicit;
    const noCoords_r9 = \u0275\u0275reference(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r8.latitude && d_r8.longitude)("ngIfElse", noCoords_r9);
  }
}
function DashboardComponent_div_45_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 67);
    \u0275\u0275template(1, DashboardComponent_div_45_ng_container_22_th_1_Template, 2, 0, "th", 41)(2, DashboardComponent_div_45_ng_container_22_td_2_Template, 4, 2, "td", 68);
    \u0275\u0275elementContainerEnd();
  }
}
function DashboardComponent_div_45_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 63)(1, "mat-chip", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "status-chip status-" + ((d_r10.status == null ? null : d_r10.status.toLowerCase()) || "unknown"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r10.status || "Unknown", " ");
  }
}
function DashboardComponent_div_45_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Poles");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_td_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 63)(1, "mat-icon", 73);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 74);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", d_r11.poles ? "primary" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r11.poles ? "check_circle" : "cancel", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r11.poles ? "Yes" : "No");
  }
}
function DashboardComponent_div_45_th_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "ECB");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_td_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 63)(1, "mat-icon", 73);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 74);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", d_r12.ecbPresent ? "primary" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r12.ecbPresent ? "check_circle" : "cancel", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r12.ecbPresent ? "Yes" : "No");
  }
}
function DashboardComponent_div_45_ng_container_32_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Approach Road");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_ng_container_32_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r13.approachRoad || "Not specified", " ");
  }
}
function DashboardComponent_div_45_ng_container_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 75);
    \u0275\u0275template(1, DashboardComponent_div_45_ng_container_32_th_1_Template, 2, 0, "th", 41)(2, DashboardComponent_div_45_ng_container_32_td_2_Template, 2, 1, "td", 76);
    \u0275\u0275elementContainerEnd();
  }
}
function DashboardComponent_div_45_th_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 78);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_45_td_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 79)(1, "button", 80);
    \u0275\u0275listener("click", function DashboardComponent_div_45_td_35_Template_button_click_1_listener() {
      const d_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.edit(d_r15.id));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 81);
    \u0275\u0275listener("click", function DashboardComponent_div_45_td_35_Template_button_click_4_listener() {
      const d_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.remove(d_r15.id));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 82);
    \u0275\u0275listener("click", function DashboardComponent_div_45_td_35_Template_button_click_7_listener() {
      const d_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewDetails(d_r15));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "visibility");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_45_tr_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 83);
  }
}
function DashboardComponent_div_45_tr_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 84);
  }
}
function DashboardComponent_div_45_div_38_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 92);
    \u0275\u0275listener("click", function DashboardComponent_div_45_div_38_button_7_Template_button_click_0_listener() {
      const page_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(!page_r18.isEllipsis && ctx_r1.goToPage(page_r18.number));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", page_r18.number === ctx_r1.currentPage)("ellipsis", page_r18.isEllipsis);
    \u0275\u0275property("disabled", page_r18.isEllipsis);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r18.display, " ");
  }
}
function DashboardComponent_div_45_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "div", 86)(2, "div", 87)(3, "button", 88);
    \u0275\u0275listener("click", function DashboardComponent_div_45_div_38_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.previousPage());
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 89);
    \u0275\u0275template(7, DashboardComponent_div_45_div_38_button_7_Template, 2, 6, "button", 90);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 88);
    \u0275\u0275listener("click", function DashboardComponent_div_45_div_38_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.nextPage());
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "chevron_right");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 91);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.currentPage === 1);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.getVisiblePages());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3(" Page ", ctx_r1.currentPage, " of ", ctx_r1.totalPages, " \u2022 ", ctx_r1.devices.length, " total devices ");
  }
}
function DashboardComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35)(2, "div", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 37)(5, "button", 38);
    \u0275\u0275listener("click", function DashboardComponent_div_45_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleCompactView());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "table", 39);
    \u0275\u0275elementContainerStart(10, 40);
    \u0275\u0275template(11, DashboardComponent_div_45_th_11_Template, 2, 0, "th", 41)(12, DashboardComponent_div_45_td_12_Template, 3, 1, "td", 42);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 43);
    \u0275\u0275template(14, DashboardComponent_div_45_th_14_Template, 2, 0, "th", 41)(15, DashboardComponent_div_45_td_15_Template, 3, 1, "td", 44);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 45);
    \u0275\u0275template(17, DashboardComponent_div_45_th_17_Template, 2, 0, "th", 41)(18, DashboardComponent_div_45_td_18_Template, 3, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 47);
    \u0275\u0275template(20, DashboardComponent_div_45_th_20_Template, 2, 0, "th", 41)(21, DashboardComponent_div_45_td_21_Template, 4, 1, "td", 48);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(22, DashboardComponent_div_45_ng_container_22_Template, 3, 0, "ng-container", 49);
    \u0275\u0275elementContainerStart(23, 50);
    \u0275\u0275template(24, DashboardComponent_div_45_th_24_Template, 2, 0, "th", 41)(25, DashboardComponent_div_45_td_25_Template, 3, 2, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(26, 51);
    \u0275\u0275template(27, DashboardComponent_div_45_th_27_Template, 2, 0, "th", 41)(28, DashboardComponent_div_45_td_28_Template, 5, 3, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(29, 52);
    \u0275\u0275template(30, DashboardComponent_div_45_th_30_Template, 2, 0, "th", 41)(31, DashboardComponent_div_45_td_31_Template, 5, 3, "td", 46);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(32, DashboardComponent_div_45_ng_container_32_Template, 3, 0, "ng-container", 53);
    \u0275\u0275elementContainerStart(33, 54);
    \u0275\u0275template(34, DashboardComponent_div_45_th_34_Template, 2, 0, "th", 55)(35, DashboardComponent_div_45_td_35_Template, 10, 0, "td", 56);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(36, DashboardComponent_div_45_tr_36_Template, 1, 0, "tr", 57)(37, DashboardComponent_div_45_tr_37_Template, 1, 0, "tr", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275template(38, DashboardComponent_div_45_div_38_Template, 13, 6, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3(" Showing ", ctx_r1.getStartIndex() + 1, "-", ctx_r1.getEndIndex(), " of ", ctx_r1.devices.length, " devices ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.compactView ? "view_stream" : "view_module");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.compactView ? "Detailed" : "Compact", " View ");
    \u0275\u0275advance();
    \u0275\u0275classProp("compact-table", ctx_r1.compactView);
    \u0275\u0275property("dataSource", ctx_r1.pagedDevices);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngIf", !ctx_r1.compactView);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", !ctx_r1.compactView);
    \u0275\u0275advance(4);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.getDisplayedColumns());
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.getDisplayedColumns());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.devices.length > ctx_r1.pageSize);
  }
}
function DashboardComponent_ng_template_46_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 94)(1, "mat-icon", 95);
    \u0275\u0275text(2, "devices_other");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No devices found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Get started by adding your first device or uploading an Excel file.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 96)(8, "button", 97);
    \u0275\u0275listener("click", function DashboardComponent_ng_template_46_div_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.createNew());
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Add First Device ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 98)(13, "mat-icon");
    \u0275\u0275text(14, "upload");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " Upload Excel ");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_ng_template_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DashboardComponent_ng_template_46_div_0_Template, 16, 0, "div", 93);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", !ctx_r1.loading);
  }
}
var DashboardComponent = class _DashboardComponent {
  deviceService;
  router;
  devices = [];
  pagedDevices = [];
  displayedColumns = [
    "id",
    "serialNumber",
    "deviceType",
    "locationName",
    "coordinates",
    "status",
    "poles",
    "ecbPresent",
    "approachRoad",
    "actions"
  ];
  compactView = false;
  loading = false;
  // Pagination properties
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  constructor(deviceService, router) {
    this.deviceService = deviceService;
    this.router = router;
  }
  ngOnInit() {
    this.loadDevices();
  }
  /** Load devices with loading state */
  loadDevices() {
    this.loading = true;
    this.deviceService.getAllDevices().subscribe({
      next: (data) => {
        this.devices = data;
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading devices:", err);
        this.loading = false;
      }
    });
  }
  /** Refresh devices */
  refreshDevices() {
    this.loadDevices();
  }
  /** Toggle compact view */
  toggleCompactView() {
    this.compactView = !this.compactView;
  }
  /** Get displayed columns based on view mode */
  getDisplayedColumns() {
    if (this.compactView) {
      return this.displayedColumns.filter((col) => !["coordinates", "approachRoad"].includes(col));
    }
    return this.displayedColumns;
  }
  /** Update pagination when devices change */
  updatePagination() {
    this.totalPages = Math.ceil(this.devices.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    this.updatePagedDevices();
  }
  /** Update the paged devices array */
  updatePagedDevices() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedDevices = this.devices.slice(startIndex, endIndex);
  }
  /** Navigate to previous page */
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedDevices();
    }
  }
  /** Navigate to next page */
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedDevices();
    }
  }
  /** Go to specific page */
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedDevices();
    }
  }
  /** Get visible pages for pagination */
  getVisiblePages() {
    const pages = [];
    const maxVisiblePages = 5;
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push({ number: i, display: i.toString(), isEllipsis: false });
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push({ number: i, display: i.toString(), isEllipsis: false });
        }
        pages.push({ number: 0, display: "...", isEllipsis: true });
        pages.push({ number: this.totalPages, display: this.totalPages.toString(), isEllipsis: false });
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push({ number: 1, display: "1", isEllipsis: false });
        pages.push({ number: 0, display: "...", isEllipsis: true });
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          pages.push({ number: i, display: i.toString(), isEllipsis: false });
        }
      } else {
        pages.push({ number: 1, display: "1", isEllipsis: false });
        pages.push({ number: 0, display: "...", isEllipsis: true });
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push({ number: i, display: i.toString(), isEllipsis: false });
        }
        pages.push({ number: 0, display: "...", isEllipsis: true });
        pages.push({ number: this.totalPages, display: this.totalPages.toString(), isEllipsis: false });
      }
    }
    return pages;
  }
  /** Get start index of current page */
  getStartIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }
  /** Get end index of current page */
  getEndIndex() {
    return Math.min(this.getStartIndex() + this.pageSize, this.devices.length);
  }
  /** Export to Excel */
  exportToExcel() {
    try {
      const worksheet = utils.json_to_sheet(this.prepareExportData());
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Devices");
      writeFileSync(workbook, `device-inventory-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.xlsx`);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Error exporting to Excel. Please try again.");
    }
  }
  /** Export to PDF */
  exportToPDF() {
    try {
      const doc = new E();
      doc.setFontSize(20);
      doc.setTextColor(40, 53, 147);
      doc.text("Device Inventory Report", 14, 22);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`, 14, 30);
      autoTable(doc, {
        head: [["ID", "Serial", "Type", "Location", "Status", "Poles", "ECB", "Coordinates"]],
        body: this.prepareExportData().map((device) => [
          device.id,
          device.serialNumber,
          device.deviceType,
          device.locationName,
          device.status,
          device.poles ? "Yes" : "No",
          device.ecbPresent ? "Yes" : "No",
          device.latitude && device.longitude ? `${device.latitude}, ${device.longitude}` : "N/A"
        ]),
        startY: 40,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [25, 118, 210] }
      });
      doc.save(`device-inventory-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      alert("Error exporting to PDF. Please try again.");
    }
  }
  /** Prepare data for export */
  prepareExportData() {
    return this.devices.map((device) => ({
      id: device.id,
      serialNumber: device.serialNumber || "N/A",
      deviceType: device.deviceType || "Unknown",
      locationName: device.locationName || "No location",
      status: device.status || "Unknown",
      poles: device.poles ? "Yes" : "No",
      ecbPresent: device.ecbPresent ? "Yes" : "No",
      approachRoad: device.approachRoad || "Not specified",
      latitude: device.latitude || "N/A",
      longitude: device.longitude || "N/A",
      placeholder: device.placeholder ? "Yes" : "No"
    }));
  }
  /** Navigate to create form */
  createNew() {
    this.router.navigate(["/admin/items/new"]);
  }
  /** Navigate to edit */
  edit(id) {
    if (id)
      this.router.navigate(["/admin/items", id, "edit"]);
  }
  /** View device details */
  viewDetails(device) {
    this.router.navigate(["/devices", device.id, "details"]);
  }
  /** Delete device and refresh */
  remove(id) {
    if (!id)
      return;
    if (!confirm("Are you sure you want to delete this device? This action cannot be undone."))
      return;
    this.deviceService.deleteDevice(id).subscribe({
      next: () => {
        this.loadDevices();
      },
      error: (err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete device. Please try again.");
      }
    });
  }
  /** Get device type color */
  getDeviceTypeColor(deviceType) {
    switch (deviceType?.toLowerCase()) {
      case "anpr":
        return "primary";
      case "rlvd":
        return "accent";
      case "ptz":
        return "warn";
      case "fixed":
        return "primary";
      case "analytical":
        return "accent";
      default:
        return "";
    }
  }
  /** Count active devices */
  getActiveDevicesCount() {
    return this.devices.filter((device) => device.status?.toLowerCase() === "active" || device.status?.toLowerCase() === "installed").length;
  }
  /** Count devices with poles */
  getPolesCount() {
    return this.devices.filter((device) => device.poles).length;
  }
  /** Count devices with ECB present */
  getECBCount() {
    return this.devices.filter((device) => device.ecbPresent).length;
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(DevicesService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-admin-dashboard"]], decls: 48, vars: 6, consts: [["exportMenu", "matMenu"], ["noData", ""], ["noCoords", ""], ["class", "summary-cards", 4, "ngIf"], ["color", "primary", 1, "toolbar"], [1, "toolbar-content"], [1, "toolbar-title"], [1, "spacer"], [1, "toolbar-actions"], ["mat-raised-button", "", "color", "accent", 1, "action-btn", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "click"], ["mat-raised-button", "", "color", "accent", "routerLink", "/admin/excel-upload", 1, "action-btn"], ["mat-raised-button", "", "color", "warn", 1, "action-btn", 3, "click"], [1, "dashboard-container"], [1, "main-card"], [1, "card-header"], [1, "header-content"], [1, "header-text"], [1, "header-actions"], ["mat-stroked-button", "", 1, "refresh-btn", 3, "click", "disabled"], ["class", "loading-state", 4, "ngIf"], ["class", "table-container", 4, "ngIf", "ngIfElse"], [1, "summary-cards"], [1, "summary-card", "total-card"], [1, "summary-content"], [1, "summary-icon"], [1, "summary-text"], [1, "summary-number"], [1, "summary-label"], [1, "summary-card", "active-card"], [1, "summary-card", "poles-card"], [1, "summary-card", "ecb-card"], [1, "loading-state"], ["diameter", "40"], [1, "table-container"], [1, "table-header"], [1, "table-info"], [1, "table-actions"], ["mat-stroked-button", "", 1, "view-toggle", 3, "click"], ["mat-table", "", 1, "mat-elevation-z2", "detailed-table", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "id-cell", 4, "matCellDef"], ["matColumnDef", "serialNumber"], ["mat-cell", "", "class", "serial-cell", 4, "matCellDef"], ["matColumnDef", "deviceType"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "locationName"], ["mat-cell", "", "class", "location-cell", 4, "matCellDef"], ["matColumnDef", "coordinates", 4, "ngIf"], ["matColumnDef", "status"], ["matColumnDef", "poles"], ["matColumnDef", "ecbPresent"], ["matColumnDef", "approachRoad", 4, "ngIf"], ["matColumnDef", "actions"], ["mat-header-cell", "", "class", "actions-header", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "action-buttons", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "pagination-container", 4, "ngIf"], ["mat-header-cell", ""], ["mat-cell", "", 1, "id-cell"], ["mat-cell", "", 1, "serial-cell"], ["mat-cell", ""], ["selected", "", 1, "device-type-chip", 3, "color"], ["mat-cell", "", 1, "location-cell"], [1, "location-icon"], ["matColumnDef", "coordinates"], ["mat-cell", "", "class", "coordinates-cell", 4, "matCellDef"], ["mat-cell", "", 1, "coordinates-cell"], [4, "ngIf", "ngIfElse"], [1, "no-data"], [1, "status-chip", 3, "ngClass"], [1, "boolean-icon", 3, "color"], [1, "boolean-text"], ["matColumnDef", "approachRoad"], ["mat-cell", "", "class", "approach-road-cell", 4, "matCellDef"], ["mat-cell", "", 1, "approach-road-cell"], ["mat-header-cell", "", 1, "actions-header"], ["mat-cell", "", 1, "action-buttons"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Edit Device", 1, "action-btn", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Delete Device", 1, "action-btn", 3, "click"], ["mat-icon-button", "", "color", "accent", "matTooltip", "View Details", 1, "action-btn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "pagination-container"], [1, "pagination-controls"], [1, "pagination-wrapper"], ["mat-icon-button", "", 1, "pagination-nav-btn", 3, "click", "disabled"], [1, "pagination-pages"], ["mat-button", "", "class", "pagination-page-btn", 3, "active", "ellipsis", "disabled", "click", 4, "ngFor", "ngForOf"], [1, "pagination-info"], ["mat-button", "", 1, "pagination-page-btn", 3, "click", "disabled"], ["class", "empty-state", 4, "ngIf"], [1, "empty-state"], [1, "empty-icon"], [1, "empty-actions"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-stroked-button", "", "color", "accent", "routerLink", "/admin/excel-upload"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275template(0, DashboardComponent_div_0_Template, 41, 4, "div", 3);
      \u0275\u0275elementStart(1, "mat-toolbar", 4)(2, "div", 5)(3, "span", 6);
      \u0275\u0275text(4, "Admin Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275element(5, "span", 7);
      \u0275\u0275elementStart(6, "div", 8)(7, "button", 9)(8, "mat-icon");
      \u0275\u0275text(9, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " Export ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-menu", null, 0)(13, "button", 10);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.exportToExcel());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "description");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16, " Export to Excel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 10);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_17_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.exportToPDF());
      });
      \u0275\u0275elementStart(18, "mat-icon");
      \u0275\u0275text(19, "picture_as_pdf");
      \u0275\u0275elementEnd();
      \u0275\u0275text(20, " Export to PDF ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "button", 11)(22, "mat-icon");
      \u0275\u0275text(23, "upload_file");
      \u0275\u0275elementEnd();
      \u0275\u0275text(24, " EXCEL ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 12);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_25_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.createNew());
      });
      \u0275\u0275elementStart(26, "mat-icon");
      \u0275\u0275text(27, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275text(28, " New Device ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(29, "div", 13)(30, "mat-card", 14)(31, "mat-card-header", 15)(32, "div", 16)(33, "div", 17)(34, "mat-card-title");
      \u0275\u0275text(35, "Device Inventory Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "mat-card-subtitle");
      \u0275\u0275text(37, "Complete device inventory with detailed information and export capabilities");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 18)(39, "button", 19);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_39_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.refreshDevices());
      });
      \u0275\u0275elementStart(40, "mat-icon");
      \u0275\u0275text(41, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(42, " Refresh ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275element(43, "mat-divider");
      \u0275\u0275template(44, DashboardComponent_div_44_Template, 4, 0, "div", 20)(45, DashboardComponent_div_45_Template, 39, 13, "div", 21)(46, DashboardComponent_ng_template_46_Template, 1, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const exportMenu_r20 = \u0275\u0275reference(12);
      const noData_r21 = \u0275\u0275reference(47);
      \u0275\u0275property("ngIf", ctx.devices.length > 0);
      \u0275\u0275advance(7);
      \u0275\u0275property("matMenuTriggerFor", exportMenu_r20);
      \u0275\u0275advance(32);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.pagedDevices.length > 0)("ngIfElse", noData_r21);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    RouterModule,
    RouterLink,
    HttpClientModule,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatToolbarModule,
    MatToolbar,
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
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatDividerModule,
    MatDivider,
    MatChipsModule,
    MatChip,
    MatTooltipModule,
    MatTooltip,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    DecimalPipe
  ], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  min-height: 100vh;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n}\n.toolbar[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);\n  padding: 12px 24px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.toolbar-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  max-width: none;\n}\n.toolbar-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n.toolbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 32px;\n  align-items: center;\n}\n.action-btn[_ngcontent-%COMP%] {\n  margin-left: 8px;\n  border-radius: 8px;\n  font-weight: 500;\n  background-color: #fffff;\n  align-items: center;\n}\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  width: 100%;\n  max-width: none;\n  margin: 0;\n  box-sizing: border-box;\n}\n.main-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;\n  overflow: hidden;\n  background: white;\n  width: 100%;\n  margin: 0;\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 24px 24px 16px 24px;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 100%;\n}\n.header-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.header-actions[_ngcontent-%COMP%] {\n  margin-left: 16px;\n}\n.refresh-btn[_ngcontent-%COMP%] {\n  border-radius: 8px;\n}\nmat-card-title[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1976d2;\n  margin-bottom: 4px;\n}\nmat-card-subtitle[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 15px;\n  font-weight: 400;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  color: #666;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  font-size: 16px;\n}\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px 16px 24px;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e9ecef;\n}\n.table-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n  font-weight: 500;\n}\n.table-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.view-toggle[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  font-size: 14px;\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  padding: 16px 24px 0 24px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.detailed-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 100%;\n}\n.compact-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 100%;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  table-layout: auto;\n}\nth.mat-header-cell[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      135deg,\n      #1976d2,\n      #1565c0);\n  color: white;\n  text-transform: uppercase;\n  font-size: 13px;\n  padding: 16px 12px;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  white-space: nowrap;\n  border: none;\n  font-weight: bold;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.actions-header[_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: bold;\n}\ntr.mat-row[_ngcontent-%COMP%]:nth-child(even) {\n  background-color: #f8f9fa;\n}\nth.mat-header-cell[_ngcontent-%COMP%], \ntd.mat-cell[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  padding: 14px 12px;\n  font-weight: bold;\n  border-right: 1px solid #e9ecef;\n}\ntd.mat-cell[_ngcontent-%COMP%]:last-child, \nth.mat-header-cell[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n}\ntd.mat-cell[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #333;\n  border-bottom: 1px solid #e9ecef;\n  vertical-align: middle;\n  border-right: 1px solid #e9ecef;\n}\ntr.mat-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  transition: background-color 0.2s ease;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  justify-content: center;\n  min-width: 140px;\n  line-height: 90px;\n}\n.action-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  line-height: 36px;\n  transition: all 0.2s ease;\n}\n.action-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n}\n.id-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1976d2;\n}\n.serial-cell[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: #f1f3f4;\n  padding: 6px 10px;\n  border-radius: 6px;\n  font-family: "Courier New", monospace;\n  font-size: 13px;\n  color: #d32f2f;\n  border: 1px solid #e0e0e0;\n}\n.device-type-chip[_ngcontent-%COMP%] {\n  font-size: 12px;\n  height: 26px;\n  font-weight: 500;\n}\n.location-cell[_ngcontent-%COMP%], \n.approach-road-cell[_ngcontent-%COMP%] {\n  white-space: normal !important;\n  min-width: 200px;\n  font-style: bold;\n}\n.location-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  line-height: 4.2;\n  font-size: 13px;\n}\n.location-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #f44336;\n}\n.coordinates-cell[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.4;\n  min-width: 150px;\n}\n.status-chip[_ngcontent-%COMP%] {\n  font-size: 12px;\n  height: 26px;\n  font-weight: 500;\n  min-width: 80px;\n}\n.status-active[_ngcontent-%COMP%], \n.status-installed[_ngcontent-%COMP%] {\n  background-color: #e8f5e8 !important;\n  color: #2e7d32 !important;\n}\n.status-inactive[_ngcontent-%COMP%] {\n  background-color: #ffebee !important;\n  color: #c62828 !important;\n}\n.status-maintenance[_ngcontent-%COMP%] {\n  background-color: #fff3e0 !important;\n  color: #ef6c00 !important;\n}\n.status-unknown[_ngcontent-%COMP%] {\n  background-color: #f5f5f5 !important;\n  color: #666 !important;\n}\n.boolean-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  margin-right: 6px;\n}\n.boolean-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n}\n.approach-road-cell[_ngcontent-%COMP%] {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.no-data[_ngcontent-%COMP%] {\n  color: #999;\n  font-style: italic;\n  font-size: 12px;\n}\n.summary-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.summary-card[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  transition: transform 0.2s ease;\n}\n.summary-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.summary-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.summary-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.summary-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.summary-number[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  line-height: 1;\n}\n.summary-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #f0f0f0;\n}\n.total-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #2196F3,\n      #1976D2);\n  color: white;\n}\n.active-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4CAF50,\n      #388E3C);\n  color: white;\n}\n.poles-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #FF9800,\n      #F57C00);\n  color: white;\n}\n.ecb-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #9C27B0,\n      #7B1FA2);\n  color: white;\n}\n.pagination-container[_ngcontent-%COMP%] {\n  padding: 20px 24px;\n  background: #f8f9fa;\n  border-top: 1px solid #e9ecef;\n}\n.pagination-controls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.pagination-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.pagination-nav-btn[_ngcontent-%COMP%] {\n  border: 1px solid #dee2e6;\n  background: white;\n  border-radius: 6px;\n  width: 40px;\n  height: 40px;\n  transition: all 0.2s ease;\n}\n.pagination-nav-btn[_ngcontent-%COMP%]:not([disabled]):hover {\n  background: #1976d2;\n  color: white;\n  border-color: #1976d2;\n}\n.pagination-nav-btn[disabled][_ngcontent-%COMP%] {\n  color: #adb5bd;\n  background: #f8f9fa;\n}\n.pagination-pages[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.pagination-page-btn[_ngcontent-%COMP%] {\n  min-width: 40px;\n  height: 40px;\n  border: 1px solid #dee2e6;\n  background: white;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #495057;\n  transition: all 0.2s ease;\n}\n.pagination-page-btn[_ngcontent-%COMP%]:not([disabled]):hover {\n  background: #e9ecef;\n  border-color: #1976d2;\n}\n.pagination-page-btn.active[_ngcontent-%COMP%] {\n  background: #1976d2;\n  color: white;\n  border-color: #1976d2;\n}\n.pagination-page-btn.ellipsis[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  cursor: default;\n}\n.pagination-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n  font-weight: 500;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 20px;\n  color: #666;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  color: #bdbdbd;\n  margin-bottom: 24px;\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  color: #555;\n  font-size: 24px;\n  font-weight: 600;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 32px 0;\n  font-size: 16px;\n  max-width: 400px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.empty-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n}\n@media (max-width: 1400px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .toolbar-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n    align-items: stretch;\n  }\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    margin-left: 0;\n    align-self: flex-end;\n  }\n  .pagination-controls[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .empty-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n  }\n  .detailed-table[_ngcontent-%COMP%], \n   .compact-table[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .table-container[_ngcontent-%COMP%] {\n    padding: 12px 16px 0 16px;\n  }\n  th.mat-header-cell[_ngcontent-%COMP%], \n   td.mat-cell[_ngcontent-%COMP%] {\n    padding: 10px 8px;\n    font-size: 12px;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    min-width: 120px;\n    line-height: 50px;\n  }\n}\n@media (max-width: 480px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 8px;\n  }\n  .table-container[_ngcontent-%COMP%] {\n    padding: 8px 12px 0 12px;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 2px;\n  }\n  .action-btn[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-admin-dashboard", imports: [
      CommonModule,
      RouterModule,
      HttpClientModule,
      MatButtonModule,
      MatIconModule,
      MatToolbarModule,
      MatTableModule,
      MatCardModule,
      MatDividerModule,
      MatChipsModule,
      MatTooltipModule,
      MatMenuModule,
      MatProgressSpinnerModule
    ], template: `
    <!-- Summary Cards -->
    <div class="summary-cards" *ngIf="devices.length > 0">
      <mat-card class="summary-card total-card">
        <mat-card-content>
          <div class="summary-content">
            <mat-icon class="summary-icon">devices</mat-icon>
            <div class="summary-text">
              <div class="summary-number">{{ devices.length }}</div>
              <div class="summary-label">Total Devices</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="summary-card active-card">
        <mat-card-content>
          <div class="summary-content">
            <mat-icon class="summary-icon">check_circle</mat-icon>
            <div class="summary-text">
              <div class="summary-number">{{ getActiveDevicesCount() }}</div>
              <div class="summary-label">Active</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="summary-card poles-card">
        <mat-card-content>
          <div class="summary-content">
            <mat-icon class="summary-icon">electric_bolt</mat-icon>
            <div class="summary-text">
              <div class="summary-number">{{ getPolesCount() }}</div>
              <div class="summary-label">Poles</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="summary-card ecb-card">
        <mat-card-content>
          <div class="summary-content">
            <mat-icon class="summary-icon">security</mat-icon>
            <div class="summary-text">
              <div class="summary-number">{{ getECBCount() }}</div>
              <div class="summary-label">ECB Present</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Toolbar -->
    <mat-toolbar color="primary" class="toolbar">
      <div class="toolbar-content">
        <span class="toolbar-title">Admin Dashboard</span>
        <span class="spacer"></span>
        <div class="toolbar-actions">
          <!-- Export Menu -->
          <button mat-raised-button color="accent" [matMenuTriggerFor]="exportMenu" class="action-btn">
            <mat-icon>download</mat-icon>
            Export
          </button>
          <mat-menu #exportMenu="matMenu">
            <button mat-menu-item (click)="exportToExcel()">
              <mat-icon>description</mat-icon>
              Export to Excel
            </button>
            <button mat-menu-item (click)="exportToPDF()">
              <mat-icon>picture_as_pdf</mat-icon>
              Export to PDF
            </button>
          </mat-menu>

          <button mat-raised-button color="accent" routerLink="/admin/excel-upload" class="action-btn">
            <mat-icon>upload_file</mat-icon>
            EXCEL
          </button>
          <button mat-raised-button color="warn" (click)="createNew()" class="action-btn">
            <mat-icon>add_circle</mat-icon>
            New Device
          </button>
        </div>
      </div>
    </mat-toolbar>

    <!-- Main Content -->
    <div class="dashboard-container">
      <mat-card class="main-card">
        <mat-card-header class="card-header">
          <div class="header-content">
            <div class="header-text">
              <mat-card-title>Device Inventory Management</mat-card-title>
              <mat-card-subtitle>Complete device inventory with detailed information and export capabilities</mat-card-subtitle>
            </div>
            <div class="header-actions">
              <button mat-stroked-button (click)="refreshDevices()" [disabled]="loading" class="refresh-btn">
                <mat-icon>refresh</mat-icon>
                Refresh
              </button>
            </div>
          </div>
        </mat-card-header>

        <mat-divider></mat-divider>

        <!-- Loading State -->
        <div *ngIf="loading" class="loading-state">
          <mat-spinner diameter="40"></mat-spinner>
          <p>Loading devices...</p>
        </div>

        <!-- Data Table -->
        <div class="table-container" *ngIf="!loading && pagedDevices.length > 0; else noData">
          <div class="table-header">
            <div class="table-info">
              Showing {{ getStartIndex() + 1 }}-{{ getEndIndex() }} of {{ devices.length }} devices
            </div>
            <div class="table-actions">
              <button mat-stroked-button (click)="toggleCompactView()" class="view-toggle">
                <mat-icon>{{ compactView ? 'view_stream' : 'view_module' }}</mat-icon>
                {{ compactView ? 'Detailed' : 'Compact' }} View
              </button>
            </div>
          </div>

          <table mat-table [dataSource]="pagedDevices" class="mat-elevation-z2 detailed-table" [class.compact-table]="compactView">

            <!-- ID -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let d" class="id-cell">
                <strong>#{{ d.id }}</strong>
              </td>
            </ng-container>

            <!-- Serial Number -->
            <ng-container matColumnDef="serialNumber">
              <th mat-header-cell *matHeaderCellDef>Serial Number</th>
              <td mat-cell *matCellDef="let d" class="serial-cell">
                <code>{{ d.serialNumber || 'N/A' }}</code>
              </td>
            </ng-container>

            <!-- Device Type -->
            <ng-container matColumnDef="deviceType">
              <th mat-header-cell *matHeaderCellDef>Device Type</th>
              <td mat-cell *matCellDef="let d">
                <mat-chip [color]="getDeviceTypeColor(d.deviceType)" selected class="device-type-chip">
                  {{ d.deviceType || 'Unknown' }}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Location -->
            <ng-container matColumnDef="locationName">
              <th mat-header-cell *matHeaderCellDef>Location</th>
              <td mat-cell *matCellDef="let d" class="location-cell">
                <mat-icon class="location-icon">location_on</mat-icon>
                {{ d.locationName || 'No location' }}
              </td>
            </ng-container>

            <!-- Coordinates -->
            <ng-container matColumnDef="coordinates" *ngIf="!compactView">
              <th mat-header-cell *matHeaderCellDef>Coordinates</th>
              <td mat-cell *matCellDef="let d" class="coordinates-cell">
                <div *ngIf="d.latitude && d.longitude; else noCoords">
                  <small>Lat: {{ d.latitude | number:'1.4-4' }}</small><br>
                  <small>Lng: {{ d.longitude | number:'1.4-4' }}</small>
                </div>
                <ng-template #noCoords>
                  <span class="no-data">No coordinates</span>
                </ng-template>
              </td>
            </ng-container>

            <!-- Status -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let d">
                <mat-chip
                  [ngClass]="'status-chip status-' + (d.status?.toLowerCase() || 'unknown')"
                  class="status-chip">
                  {{ d.status || 'Unknown' }}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Poles -->
            <ng-container matColumnDef="poles">
              <th mat-header-cell *matHeaderCellDef>Poles</th>
              <td mat-cell *matCellDef="let d">
                <mat-icon
                  [color]="d.poles ? 'primary' : 'warn'"
                  class="boolean-icon">
                  {{ d.poles ? 'check_circle' : 'cancel' }}
                </mat-icon>
                <span class="boolean-text">{{ d.poles ? 'Yes' : 'No' }}</span>
              </td>
            </ng-container>

            <!-- ECB Present -->
            <ng-container matColumnDef="ecbPresent">
              <th mat-header-cell *matHeaderCellDef>ECB</th>
              <td mat-cell *matCellDef="let d">
                <mat-icon
                  [color]="d.ecbPresent ? 'primary' : 'warn'"
                  class="boolean-icon">
                  {{ d.ecbPresent ? 'check_circle' : 'cancel' }}
                </mat-icon>
                <span class="boolean-text">{{ d.ecbPresent ? 'Yes' : 'No' }}</span>
              </td>
            </ng-container>

            <!-- Approach Road -->
            <ng-container matColumnDef="approachRoad" *ngIf="!compactView">
              <th mat-header-cell *matHeaderCellDef>Approach Road</th>
              <td mat-cell *matCellDef="let d" class="approach-road-cell">
                {{ d.approachRoad || 'Not specified' }}
              </td>
            </ng-container>

            <!-- Actions -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="actions-header">Actions</th>
              <td mat-cell *matCellDef="let d" class="action-buttons">
                <button
                  mat-icon-button
                  color="primary"
                  (click)="edit(d.id)"
                  matTooltip="Edit Device"
                  class="action-btn">
                  <mat-icon>edit</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="warn"
                  (click)="remove(d.id)"
                  matTooltip="Delete Device"
                  class="action-btn">
                  <mat-icon>delete</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="accent"
                  (click)="viewDetails(d)"
                  matTooltip="View Details"
                  class="action-btn">
                  <mat-icon>visibility</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="getDisplayedColumns()"></tr>
            <tr mat-row *matRowDef="let row; columns: getDisplayedColumns()"></tr>
          </table>

          <!-- Pagination -->
          <div class="pagination-container" *ngIf="devices.length > pageSize">
            <div class="pagination-controls">
              <div class="pagination-wrapper">
                <button
                  mat-icon-button
                  [disabled]="currentPage === 1"
                  (click)="previousPage()"
                  class="pagination-nav-btn">
                  <mat-icon>chevron_left</mat-icon>
                </button>

                <div class="pagination-pages">
                  <button
                    *ngFor="let page of getVisiblePages()"
                    mat-button
                    [class.active]="page.number === currentPage"
                    [class.ellipsis]="page.isEllipsis"
                    (click)="!page.isEllipsis && goToPage(page.number)"
                    class="pagination-page-btn"
                    [disabled]="page.isEllipsis">
                    {{ page.display }}
                  </button>
                </div>

                <button
                  mat-icon-button
                  [disabled]="currentPage === totalPages"
                  (click)="nextPage()"
                  class="pagination-nav-btn">
                  <mat-icon>chevron_right</mat-icon>
                </button>
              </div>

              <div class="pagination-info">
                Page {{ currentPage }} of {{ totalPages }} \u2022 {{ devices.length }} total devices
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <ng-template #noData>
          <div class="empty-state" *ngIf="!loading">
            <mat-icon class="empty-icon">devices_other</mat-icon>
            <h3>No devices found</h3>
            <p>Get started by adding your first device or uploading an Excel file.</p>
            <div class="empty-actions">
              <button mat-raised-button color="primary" (click)="createNew()">
                <mat-icon>add</mat-icon>
                Add First Device
              </button>
              <button mat-stroked-button color="accent" routerLink="/admin/excel-upload">
                <mat-icon>upload</mat-icon>
                Upload Excel
              </button>
            </div>
          </div>
        </ng-template>
      </mat-card>
    </div>
  `, styles: ['/* angular:styles/component:scss;93adf61d27227763ff45127413e935361298ca752626982e4cb4bdd2b1aa37e8;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/admin/dashboard/dashboard.component.ts */\n:host {\n  display: block;\n  background:\n    linear-gradient(\n      135deg,\n      #f5f7fa 0%,\n      #c3cfe2 100%);\n  min-height: 100vh;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n}\n.toolbar {\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);\n  padding: 12px 24px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.toolbar-content {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  max-width: none;\n}\n.toolbar-title {\n  font-size: 20px;\n  font-weight: 600;\n}\n.spacer {\n  flex: 1 1 auto;\n}\n.toolbar-actions {\n  display: flex;\n  gap: 32px;\n  align-items: center;\n}\n.action-btn {\n  margin-left: 8px;\n  border-radius: 8px;\n  font-weight: 500;\n  background-color: #fffff;\n  align-items: center;\n}\n.dashboard-container {\n  padding: 24px;\n  width: 100%;\n  max-width: none;\n  margin: 0;\n  box-sizing: border-box;\n}\n.main-card {\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;\n  overflow: hidden;\n  background: white;\n  width: 100%;\n  margin: 0;\n}\n.card-header {\n  padding: 24px 24px 16px 24px;\n}\n.header-content {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 100%;\n}\n.header-text {\n  flex: 1;\n}\n.header-actions {\n  margin-left: 16px;\n}\n.refresh-btn {\n  border-radius: 8px;\n}\nmat-card-title {\n  font-size: 28px;\n  font-weight: 700;\n  color: #1976d2;\n  margin-bottom: 4px;\n}\nmat-card-subtitle {\n  color: #666;\n  font-size: 15px;\n  font-weight: 400;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px 20px;\n  color: #666;\n}\n.loading-state p {\n  margin-top: 16px;\n  font-size: 16px;\n}\n.table-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px 24px 16px 24px;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e9ecef;\n}\n.table-info {\n  font-size: 14px;\n  color: #666;\n  font-weight: 500;\n}\n.table-actions {\n  display: flex;\n  gap: 12px;\n}\n.view-toggle {\n  border-radius: 8px;\n  font-size: 14px;\n}\n.table-container {\n  overflow-x: auto;\n  padding: 16px 24px 0 24px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.detailed-table {\n  width: 100%;\n  min-width: 100%;\n}\n.compact-table {\n  width: 100%;\n  min-width: 100%;\n}\ntable {\n  width: 100%;\n  table-layout: auto;\n}\nth.mat-header-cell {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      135deg,\n      #1976d2,\n      #1565c0);\n  color: white;\n  text-transform: uppercase;\n  font-size: 13px;\n  padding: 16px 12px;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  white-space: nowrap;\n  border: none;\n  font-weight: bold;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.actions-header {\n  text-align: center;\n  font-weight: bold;\n}\ntr.mat-row:nth-child(even) {\n  background-color: #f8f9fa;\n}\nth.mat-header-cell,\ntd.mat-cell {\n  white-space: nowrap;\n  padding: 14px 12px;\n  font-weight: bold;\n  border-right: 1px solid #e9ecef;\n}\ntd.mat-cell:last-child,\nth.mat-header-cell:last-child {\n  border-right: none;\n}\ntd.mat-cell {\n  font-size: 14px;\n  color: #333;\n  border-bottom: 1px solid #e9ecef;\n  vertical-align: middle;\n  border-right: 1px solid #e9ecef;\n}\ntr.mat-row:hover td {\n  background: #e3f2fd;\n  transition: background-color 0.2s ease;\n}\n.action-buttons {\n  display: flex;\n  gap: 4px;\n  justify-content: center;\n  min-width: 140px;\n  line-height: 90px;\n}\n.action-btn {\n  width: 36px;\n  height: 36px;\n  line-height: 36px;\n  transition: all 0.2s ease;\n}\n.action-btn:hover {\n  transform: scale(1.1);\n}\n.id-cell {\n  font-weight: 600;\n  color: #1976d2;\n}\n.serial-cell code {\n  background: #f1f3f4;\n  padding: 6px 10px;\n  border-radius: 6px;\n  font-family: "Courier New", monospace;\n  font-size: 13px;\n  color: #d32f2f;\n  border: 1px solid #e0e0e0;\n}\n.device-type-chip {\n  font-size: 12px;\n  height: 26px;\n  font-weight: 500;\n}\n.location-cell,\n.approach-road-cell {\n  white-space: normal !important;\n  min-width: 200px;\n  font-style: bold;\n}\n.location-cell {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  line-height: 4.2;\n  font-size: 13px;\n}\n.location-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #f44336;\n}\n.coordinates-cell {\n  font-size: 12px;\n  line-height: 1.4;\n  min-width: 150px;\n}\n.status-chip {\n  font-size: 12px;\n  height: 26px;\n  font-weight: 500;\n  min-width: 80px;\n}\n.status-active,\n.status-installed {\n  background-color: #e8f5e8 !important;\n  color: #2e7d32 !important;\n}\n.status-inactive {\n  background-color: #ffebee !important;\n  color: #c62828 !important;\n}\n.status-maintenance {\n  background-color: #fff3e0 !important;\n  color: #ef6c00 !important;\n}\n.status-unknown {\n  background-color: #f5f5f5 !important;\n  color: #666 !important;\n}\n.boolean-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  margin-right: 6px;\n}\n.boolean-text {\n  font-size: 13px;\n  font-weight: 500;\n}\n.approach-road-cell {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.no-data {\n  color: #999;\n  font-style: italic;\n  font-size: 12px;\n}\n.summary-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n  width: 100%;\n  box-sizing: border-box;\n}\n.summary-card {\n  border-radius: 8px;\n  transition: transform 0.2s ease;\n}\n.summary-card:hover {\n  transform: translateY(-2px);\n}\n.summary-content {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.summary-icon {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.summary-text {\n  display: flex;\n  flex-direction: column;\n}\n.summary-number {\n  font-size: 24px;\n  font-weight: bold;\n  line-height: 1;\n}\n.summary-label {\n  font-size: 14px;\n  color: #f0f0f0;\n}\n.total-card {\n  background:\n    linear-gradient(\n      135deg,\n      #2196F3,\n      #1976D2);\n  color: white;\n}\n.active-card {\n  background:\n    linear-gradient(\n      135deg,\n      #4CAF50,\n      #388E3C);\n  color: white;\n}\n.poles-card {\n  background:\n    linear-gradient(\n      135deg,\n      #FF9800,\n      #F57C00);\n  color: white;\n}\n.ecb-card {\n  background:\n    linear-gradient(\n      135deg,\n      #9C27B0,\n      #7B1FA2);\n  color: white;\n}\n.pagination-container {\n  padding: 20px 24px;\n  background: #f8f9fa;\n  border-top: 1px solid #e9ecef;\n}\n.pagination-controls {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.pagination-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.pagination-nav-btn {\n  border: 1px solid #dee2e6;\n  background: white;\n  border-radius: 6px;\n  width: 40px;\n  height: 40px;\n  transition: all 0.2s ease;\n}\n.pagination-nav-btn:not([disabled]):hover {\n  background: #1976d2;\n  color: white;\n  border-color: #1976d2;\n}\n.pagination-nav-btn[disabled] {\n  color: #adb5bd;\n  background: #f8f9fa;\n}\n.pagination-pages {\n  display: flex;\n  gap: 4px;\n}\n.pagination-page-btn {\n  min-width: 40px;\n  height: 40px;\n  border: 1px solid #dee2e6;\n  background: white;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #495057;\n  transition: all 0.2s ease;\n}\n.pagination-page-btn:not([disabled]):hover {\n  background: #e9ecef;\n  border-color: #1976d2;\n}\n.pagination-page-btn.active {\n  background: #1976d2;\n  color: white;\n  border-color: #1976d2;\n}\n.pagination-page-btn.ellipsis {\n  border: none;\n  background: transparent;\n  cursor: default;\n}\n.pagination-info {\n  font-size: 14px;\n  color: #666;\n  font-weight: 500;\n}\n.empty-state {\n  text-align: center;\n  padding: 80px 20px;\n  color: #666;\n}\n.empty-icon {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  color: #bdbdbd;\n  margin-bottom: 24px;\n}\n.empty-state h3 {\n  margin: 0 0 12px 0;\n  color: #555;\n  font-size: 24px;\n  font-weight: 600;\n}\n.empty-state p {\n  margin: 0 0 32px 0;\n  font-size: 16px;\n  max-width: 400px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.empty-actions {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n}\n@media (max-width: 1400px) {\n  .dashboard-container {\n    padding: 16px;\n  }\n  .toolbar-content {\n    flex-direction: column;\n    gap: 12px;\n    align-items: stretch;\n  }\n  .summary-cards {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n  .header-content {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .header-actions {\n    margin-left: 0;\n    align-self: flex-end;\n  }\n  .pagination-controls {\n    flex-direction: column;\n    gap: 16px;\n  }\n  .empty-actions {\n    flex-direction: column;\n    align-items: center;\n  }\n  .detailed-table,\n  .compact-table {\n    min-width: 100%;\n  }\n}\n@media (max-width: 768px) {\n  .dashboard-container {\n    padding: 12px;\n  }\n  .summary-cards {\n    grid-template-columns: 1fr;\n  }\n  .table-container {\n    padding: 12px 16px 0 16px;\n  }\n  th.mat-header-cell,\n  td.mat-cell {\n    padding: 10px 8px;\n    font-size: 12px;\n  }\n  .action-buttons {\n    min-width: 120px;\n    line-height: 50px;\n  }\n}\n@media (max-width: 480px) {\n  .dashboard-container {\n    padding: 8px;\n  }\n  .table-container {\n    padding: 8px 12px 0 12px;\n  }\n  .action-buttons {\n    flex-direction: column;\n    gap: 2px;\n  }\n  .action-btn {\n    width: 32px;\n    height: 32px;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n'] }]
  }], () => [{ type: DevicesService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/components/admin/dashboard/dashboard.component.ts", lineNumber: 969 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-IX7QTB6U.js.map
