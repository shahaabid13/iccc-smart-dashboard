import {
  InventoryService
} from "./chunk-LMI5OJGT.js";
import "./chunk-V7AIRKMU.js";
import "./chunk-N5NV2E2H.js";
import {
  MAT_OPTGROUP,
  MAT_OPTION_PARENT_COMPONENT,
  MatOption,
  MatOptionModule,
  MatOptionSelectionChange,
  MatSelect,
  MatSelectModule,
  _countGroupLabelsBeforeOption,
  _getOptionScrollPosition
} from "./chunk-T6BSVYIB.js";
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
  MatInput,
  MatInputModule
} from "./chunk-DUN6GKUJ.js";
import {
  MatFormFieldModule
} from "./chunk-OMQ3L3ZA.js";
import {
  CdkScrollableModule,
  OverlayConfig,
  OverlayModule,
  TemplatePortal,
  ViewportRuler,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy
} from "./chunk-VD67GU43.js";
import {
  MAT_FORM_FIELD,
  MatCard,
  MatCardContent,
  MatCardModule,
  MatFormField,
  MatLabel
} from "./chunk-AK2ZYAID.js";
import {
  ActiveDescendantKeyManager,
  BreakpointObserver,
  Breakpoints,
  DOWN_ARROW,
  Directionality,
  ENTER,
  ESCAPE,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIconButton,
  Platform,
  TAB,
  UP_ARROW,
  _IdGenerator,
  _animationsDisabled,
  _getEventTarget,
  _getFocusedElementPierceShadowDom,
  addAriaReferencedId,
  coerceArray,
  hasModifierKey,
  removeAriaReferencedId
} from "./chunk-AJHCE7D6.js";
import {
  AuthService
} from "./chunk-QHHSFO4U.js";
import {
  Router
} from "./chunk-AAXJDYQS.js";
import "./chunk-BIRBC32G.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel
} from "./chunk-4AUWEQTR.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChildren,
  DecimalPipe,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgForOf,
  NgIf,
  NgModule,
  NgZone,
  Observable,
  Optional,
  Output,
  Renderer2,
  ReplaySubject,
  SkipSelf,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  defer,
  delay,
  filter,
  forwardRef,
  inject,
  map,
  merge,
  numberAttribute,
  of,
  setClassMetadata,
  startWith,
  switchMap,
  take,
  tap,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵariaProperty,
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
  ɵɵdomProperty,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-WPHUMBF2.js";
import "./chunk-YP43Q66R.js";

// node_modules/@angular/material/fesm2022/autocomplete.mjs
var _c0 = ["panel"];
var _c1 = ["*"];
function MatAutocomplete_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1, 0);
    \u0275\u0275projection(2);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const formFieldId_r1 = ctx.id;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1._classList);
    \u0275\u0275classProp("mat-mdc-autocomplete-visible", ctx_r1.showPanel)("mat-mdc-autocomplete-hidden", !ctx_r1.showPanel)("mat-autocomplete-panel-animations-enabled", !ctx_r1._animationsDisabled)("mat-primary", ctx_r1._color === "primary")("mat-accent", ctx_r1._color === "accent")("mat-warn", ctx_r1._color === "warn");
    \u0275\u0275domProperty("id", ctx_r1.id);
    \u0275\u0275attribute("aria-label", ctx_r1.ariaLabel || null)("aria-labelledby", ctx_r1._getPanelAriaLabelledby(formFieldId_r1));
  }
}
var MatAutocompleteSelectedEvent = class {
  source;
  option;
  constructor(source, option) {
    this.source = source;
    this.option = option;
  }
};
var MAT_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken("mat-autocomplete-default-options", {
  providedIn: "root",
  factory: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY
});
function MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY() {
  return {
    autoActiveFirstOption: false,
    autoSelectActiveOption: false,
    hideSingleSelectionIndicator: false,
    requireSelection: false,
    hasBackdrop: false
  };
}
var MatAutocomplete = class _MatAutocomplete {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _defaults = inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS);
  _animationsDisabled = _animationsDisabled();
  _activeOptionChanges = Subscription.EMPTY;
  /** Manages active item in option list based on key events. */
  _keyManager;
  /** Whether the autocomplete panel should be visible, depending on option length. */
  showPanel = false;
  /** Whether the autocomplete panel is open. */
  get isOpen() {
    return this._isOpen && this.showPanel;
  }
  _isOpen = false;
  /** Latest trigger that opened the autocomplete. */
  _latestOpeningTrigger;
  /** @docs-private Sets the theme color of the panel. */
  _setColor(value) {
    this._color = value;
    this._changeDetectorRef.markForCheck();
  }
  /** @docs-private theme color of the panel */
  _color;
  // The @ViewChild query for TemplateRef here needs to be static because some code paths
  // lead to the overlay being created before change detection has finished for this component.
  // Notably, another component may trigger `focus` on the autocomplete-trigger.
  /** @docs-private */
  template;
  /** Element for the panel containing the autocomplete options. */
  panel;
  /** Reference to all options within the autocomplete. */
  options;
  /** Reference to all option groups within the autocomplete. */
  optionGroups;
  /** Aria label of the autocomplete. */
  ariaLabel;
  /** Input that can be used to specify the `aria-labelledby` attribute. */
  ariaLabelledby;
  /** Function that maps an option's control value to its display value in the trigger. */
  displayWith = null;
  /**
   * Whether the first option should be highlighted when the autocomplete panel is opened.
   * Can be configured globally through the `MAT_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
   */
  autoActiveFirstOption;
  /** Whether the active option should be selected as the user is navigating. */
  autoSelectActiveOption;
  /**
   * Whether the user is required to make a selection when they're interacting with the
   * autocomplete. If the user moves away from the autocomplete without selecting an option from
   * the list, the value will be reset. If the user opens the panel and closes it without
   * interacting or selecting a value, the initial value will be kept.
   */
  requireSelection;
  /**
   * Specify the width of the autocomplete panel.  Can be any CSS sizing value, otherwise it will
   * match the width of its host.
   */
  panelWidth;
  /** Whether ripples are disabled within the autocomplete panel. */
  disableRipple;
  /** Event that is emitted whenever an option from the list is selected. */
  optionSelected = new EventEmitter();
  /** Event that is emitted when the autocomplete panel is opened. */
  opened = new EventEmitter();
  /** Event that is emitted when the autocomplete panel is closed. */
  closed = new EventEmitter();
  /** Emits whenever an option is activated. */
  optionActivated = new EventEmitter();
  /**
   * Takes classes set on the host mat-autocomplete element and applies them to the panel
   * inside the overlay container to allow for easy styling.
   */
  set classList(value) {
    this._classList = value;
    this._elementRef.nativeElement.className = "";
  }
  _classList;
  /** Whether checkmark indicator for single-selection options is hidden. */
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = value;
    this._syncParentProperties();
  }
  _hideSingleSelectionIndicator;
  /** Syncs the parent state with the individual options. */
  _syncParentProperties() {
    if (this.options) {
      for (const option of this.options) {
        option._changeDetectorRef.markForCheck();
      }
    }
  }
  /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
  id = inject(_IdGenerator).getId("mat-autocomplete-");
  /**
   * Tells any descendant `mat-optgroup` to use the inert a11y pattern.
   * @docs-private
   */
  inertGroups;
  constructor() {
    const platform = inject(Platform);
    this.inertGroups = platform?.SAFARI || false;
    this.autoActiveFirstOption = !!this._defaults.autoActiveFirstOption;
    this.autoSelectActiveOption = !!this._defaults.autoSelectActiveOption;
    this.requireSelection = !!this._defaults.requireSelection;
    this._hideSingleSelectionIndicator = this._defaults.hideSingleSelectionIndicator ?? false;
  }
  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager(this.options).withWrap().skipPredicate(this._skipPredicate);
    this._activeOptionChanges = this._keyManager.change.subscribe((index) => {
      if (this.isOpen) {
        this.optionActivated.emit({
          source: this,
          option: this.options.toArray()[index] || null
        });
      }
    });
    this._setVisibility();
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this._activeOptionChanges.unsubscribe();
  }
  /**
   * Sets the panel scrollTop. This allows us to manually scroll to display options
   * above or below the fold, as they are not actually being focused when active.
   */
  _setScrollTop(scrollTop) {
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }
  /** Returns the panel's scrollTop. */
  _getScrollTop() {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }
  /** Panel should hide itself when the option list is empty. */
  _setVisibility() {
    this.showPanel = !!this.options?.length;
    this._changeDetectorRef.markForCheck();
  }
  /** Emits the `select` event. */
  _emitSelectEvent(option) {
    const event = new MatAutocompleteSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }
  /** Gets the aria-labelledby for the autocomplete panel. */
  _getPanelAriaLabelledby(labelId) {
    if (this.ariaLabel) {
      return null;
    }
    const labelExpression = labelId ? labelId + " " : "";
    return this.ariaLabelledby ? labelExpression + this.ariaLabelledby : labelId;
  }
  // `skipPredicate` determines if key manager should avoid putting a given option in the tab
  // order. Allow disabled list items to receive focus via keyboard to align with WAI ARIA
  // recommendation.
  //
  // Normally WAI ARIA's instructions are to exclude disabled items from the tab order, but it
  // makes a few exceptions for compound widgets.
  //
  // From [Developing a Keyboard Interface](
  // https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/):
  //   "For the following composite widget elements, keep them focusable when disabled: Options in a
  //   Listbox..."
  //
  // The user can focus disabled options using the keyboard, but the user cannot click disabled
  // options.
  _skipPredicate() {
    return false;
  }
  static \u0275fac = function MatAutocomplete_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocomplete)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatAutocomplete,
    selectors: [["mat-autocomplete"]],
    contentQueries: function MatAutocomplete_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatOption, 5);
        \u0275\u0275contentQuery(dirIndex, MAT_OPTGROUP, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.options = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.optionGroups = _t);
      }
    },
    viewQuery: function MatAutocomplete_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(TemplateRef, 7);
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panel = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-autocomplete"],
    inputs: {
      ariaLabel: [0, "aria-label", "ariaLabel"],
      ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
      displayWith: "displayWith",
      autoActiveFirstOption: [2, "autoActiveFirstOption", "autoActiveFirstOption", booleanAttribute],
      autoSelectActiveOption: [2, "autoSelectActiveOption", "autoSelectActiveOption", booleanAttribute],
      requireSelection: [2, "requireSelection", "requireSelection", booleanAttribute],
      panelWidth: "panelWidth",
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      classList: [0, "class", "classList"],
      hideSingleSelectionIndicator: [2, "hideSingleSelectionIndicator", "hideSingleSelectionIndicator", booleanAttribute]
    },
    outputs: {
      optionSelected: "optionSelected",
      opened: "opened",
      closed: "closed",
      optionActivated: "optionActivated"
    },
    exportAs: ["matAutocomplete"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_OPTION_PARENT_COMPONENT,
      useExisting: _MatAutocomplete
    }])],
    ngContentSelectors: _c1,
    decls: 1,
    vars: 0,
    consts: [["panel", ""], ["role", "listbox", 1, "mat-mdc-autocomplete-panel", "mdc-menu-surface", "mdc-menu-surface--open", 3, "id"]],
    template: function MatAutocomplete_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domTemplate(0, MatAutocomplete_ng_template_0_Template, 3, 17, "ng-template");
      }
    },
    styles: ["div.mat-mdc-autocomplete-panel{width:100%;max-height:256px;visibility:hidden;transform-origin:center top;overflow:auto;padding:8px 0;box-sizing:border-box;position:relative;border-radius:var(--mat-autocomplete-container-shape, var(--mat-sys-corner-extra-small));box-shadow:var(--mat-autocomplete-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));background-color:var(--mat-autocomplete-background-color, var(--mat-sys-surface-container))}@media(forced-colors: active){div.mat-mdc-autocomplete-panel{outline:solid 1px}}.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) div.mat-mdc-autocomplete-panel{border-top-left-radius:0;border-top-right-radius:0}.mat-mdc-autocomplete-panel-above div.mat-mdc-autocomplete-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:center bottom}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible{visibility:visible}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden{visibility:hidden;pointer-events:none}@keyframes _mat-autocomplete-enter{from{opacity:0;transform:scaleY(0.8)}to{opacity:1;transform:none}}.mat-autocomplete-panel-animations-enabled{animation:_mat-autocomplete-enter 120ms cubic-bezier(0, 0, 0.2, 1)}mat-autocomplete{display:none}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocomplete, [{
    type: Component,
    args: [{
      selector: "mat-autocomplete",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      exportAs: "matAutocomplete",
      host: {
        "class": "mat-mdc-autocomplete"
      },
      providers: [{
        provide: MAT_OPTION_PARENT_COMPONENT,
        useExisting: MatAutocomplete
      }],
      template: `<ng-template let-formFieldId="id">
  <div
    class="mat-mdc-autocomplete-panel mdc-menu-surface mdc-menu-surface--open"
    role="listbox"
    [id]="id"
    [class]="_classList"
    [class.mat-mdc-autocomplete-visible]="showPanel"
    [class.mat-mdc-autocomplete-hidden]="!showPanel"
    [class.mat-autocomplete-panel-animations-enabled]="!_animationsDisabled"
    [class.mat-primary]="_color === 'primary'"
    [class.mat-accent]="_color === 'accent'"
    [class.mat-warn]="_color === 'warn'"
    [attr.aria-label]="ariaLabel || null"
    [attr.aria-labelledby]="_getPanelAriaLabelledby(formFieldId)"
    #panel>
    <ng-content></ng-content>
  </div>
</ng-template>
`,
      styles: ["div.mat-mdc-autocomplete-panel{width:100%;max-height:256px;visibility:hidden;transform-origin:center top;overflow:auto;padding:8px 0;box-sizing:border-box;position:relative;border-radius:var(--mat-autocomplete-container-shape, var(--mat-sys-corner-extra-small));box-shadow:var(--mat-autocomplete-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));background-color:var(--mat-autocomplete-background-color, var(--mat-sys-surface-container))}@media(forced-colors: active){div.mat-mdc-autocomplete-panel{outline:solid 1px}}.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) div.mat-mdc-autocomplete-panel{border-top-left-radius:0;border-top-right-radius:0}.mat-mdc-autocomplete-panel-above div.mat-mdc-autocomplete-panel{border-bottom-left-radius:0;border-bottom-right-radius:0;transform-origin:center bottom}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible{visibility:visible}div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden{visibility:hidden;pointer-events:none}@keyframes _mat-autocomplete-enter{from{opacity:0;transform:scaleY(0.8)}to{opacity:1;transform:none}}.mat-autocomplete-panel-animations-enabled{animation:_mat-autocomplete-enter 120ms cubic-bezier(0, 0, 0.2, 1)}mat-autocomplete{display:none}\n"]
    }]
  }], () => [], {
    template: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    panel: [{
      type: ViewChild,
      args: ["panel"]
    }],
    options: [{
      type: ContentChildren,
      args: [MatOption, {
        descendants: true
      }]
    }],
    optionGroups: [{
      type: ContentChildren,
      args: [MAT_OPTGROUP, {
        descendants: true
      }]
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    displayWith: [{
      type: Input
    }],
    autoActiveFirstOption: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    autoSelectActiveOption: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    requireSelection: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    panelWidth: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    optionSelected: [{
      type: Output
    }],
    opened: [{
      type: Output
    }],
    closed: [{
      type: Output
    }],
    optionActivated: [{
      type: Output
    }],
    classList: [{
      type: Input,
      args: ["class"]
    }],
    hideSingleSelectionIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatAutocompleteOrigin = class _MatAutocompleteOrigin {
  elementRef = inject(ElementRef);
  constructor() {
  }
  static \u0275fac = function MatAutocompleteOrigin_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocompleteOrigin)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatAutocompleteOrigin,
    selectors: [["", "matAutocompleteOrigin", ""]],
    exportAs: ["matAutocompleteOrigin"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocompleteOrigin, [{
    type: Directive,
    args: [{
      selector: "[matAutocompleteOrigin]",
      exportAs: "matAutocompleteOrigin"
    }]
  }], () => [], null);
})();
var MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatAutocompleteTrigger),
  multi: true
};
function getMatAutocompleteMissingPanelError() {
  return Error("Attempting to open an undefined instance of `mat-autocomplete`. Make sure that the id passed to the `matAutocomplete` is correct and that you're attempting to open it after the ngAfterContentInit hook.");
}
var MAT_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken("mat-autocomplete-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector);
  }
});
function MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(_overlay) {
  const injector = inject(Injector);
  return () => createRepositionScrollStrategy(injector);
}
var MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
  deps: [],
  useFactory: MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY
};
var MatAutocompleteTrigger = class _MatAutocompleteTrigger {
  _environmentInjector = inject(EnvironmentInjector);
  _element = inject(ElementRef);
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _zone = inject(NgZone);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _dir = inject(Directionality, {
    optional: true
  });
  _formField = inject(MAT_FORM_FIELD, {
    optional: true,
    host: true
  });
  _viewportRuler = inject(ViewportRuler);
  _scrollStrategy = inject(MAT_AUTOCOMPLETE_SCROLL_STRATEGY);
  _renderer = inject(Renderer2);
  _animationsDisabled = _animationsDisabled();
  _defaults = inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, {
    optional: true
  });
  _overlayRef;
  _portal;
  _componentDestroyed = false;
  _initialized = new Subject();
  _keydownSubscription;
  _outsideClickSubscription;
  _cleanupWindowBlur;
  /** Old value of the native input. Used to work around issues with the `input` event on IE. */
  _previousValue;
  /** Value of the input element when the panel was attached (even if there are no options). */
  _valueOnAttach;
  /** Value on the previous keydown event. */
  _valueOnLastKeydown;
  /** Strategy that is used to position the panel. */
  _positionStrategy;
  /** Whether or not the label state is being overridden. */
  _manuallyFloatingLabel = false;
  /** The subscription for closing actions (some are bound to document). */
  _closingActionsSubscription;
  /** Subscription to viewport size changes. */
  _viewportSubscription = Subscription.EMPTY;
  /** Implements BreakpointObserver to be used to detect handset landscape */
  _breakpointObserver = inject(BreakpointObserver);
  _handsetLandscapeSubscription = Subscription.EMPTY;
  /**
   * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
   * closed autocomplete from being reopened if the user switches to another browser tab and then
   * comes back.
   */
  _canOpenOnNextFocus = true;
  /** Value inside the input before we auto-selected an option. */
  _valueBeforeAutoSelection;
  /**
   * Current option that we have auto-selected as the user is navigating,
   * but which hasn't been propagated to the model value yet.
   */
  _pendingAutoselectedOption;
  /** Stream of keyboard events that can close the panel. */
  _closeKeyEventStream = new Subject();
  /** Classes to apply to the panel. Exposed as a public property for internal usage. */
  _overlayPanelClass = coerceArray(this._defaults?.overlayPanelClass || []);
  /**
   * Event handler for when the window is blurred. Needs to be an
   * arrow function in order to preserve the context.
   */
  _windowBlurHandler = () => {
    this._canOpenOnNextFocus = this.panelOpen || !this._hasFocus();
  };
  /** `View -> model callback called when value changes` */
  _onChange = () => {
  };
  /** `View -> model callback called when autocomplete has been touched` */
  _onTouched = () => {
  };
  /** The autocomplete panel to be attached to this trigger. */
  autocomplete;
  /**
   * Position of the autocomplete panel relative to the trigger element. A position of `auto`
   * will render the panel underneath the trigger if there is enough space for it to fit in
   * the viewport, otherwise the panel will be shown above it. If the position is set to
   * `above` or `below`, the panel will always be shown above or below the trigger. no matter
   * whether it fits completely in the viewport.
   */
  position = "auto";
  /**
   * Reference relative to which to position the autocomplete panel.
   * Defaults to the autocomplete trigger element.
   */
  connectedTo;
  /**
   * `autocomplete` attribute to be set on the input element.
   * @docs-private
   */
  autocompleteAttribute = "off";
  /**
   * Whether the autocomplete is disabled. When disabled, the element will
   * act as a regular input and the user won't be able to open the panel.
   */
  autocompleteDisabled;
  constructor() {
  }
  /** Class to apply to the panel when it's above the input. */
  _aboveClass = "mat-mdc-autocomplete-panel-above";
  ngAfterViewInit() {
    this._initialized.next();
    this._initialized.complete();
    this._cleanupWindowBlur = this._renderer.listen("window", "blur", this._windowBlurHandler);
  }
  ngOnChanges(changes) {
    if (changes["position"] && this._positionStrategy) {
      this._setStrategyPositions(this._positionStrategy);
      if (this.panelOpen) {
        this._overlayRef.updatePosition();
      }
    }
  }
  ngOnDestroy() {
    this._cleanupWindowBlur?.();
    this._handsetLandscapeSubscription.unsubscribe();
    this._viewportSubscription.unsubscribe();
    this._componentDestroyed = true;
    this._destroyPanel();
    this._closeKeyEventStream.complete();
    this._clearFromModal();
  }
  /** Whether or not the autocomplete panel is open. */
  get panelOpen() {
    return this._overlayAttached && this.autocomplete.showPanel;
  }
  _overlayAttached = false;
  /** Opens the autocomplete suggestion panel. */
  openPanel() {
    this._openPanelInternal();
  }
  /** Closes the autocomplete suggestion panel. */
  closePanel() {
    this._resetLabel();
    if (!this._overlayAttached) {
      return;
    }
    if (this.panelOpen) {
      this._zone.run(() => {
        this.autocomplete.closed.emit();
      });
    }
    if (this.autocomplete._latestOpeningTrigger === this) {
      this.autocomplete._isOpen = false;
      this.autocomplete._latestOpeningTrigger = null;
    }
    this._overlayAttached = false;
    this._pendingAutoselectedOption = null;
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
      this._closingActionsSubscription.unsubscribe();
    }
    this._updatePanelState();
    if (!this._componentDestroyed) {
      this._changeDetectorRef.detectChanges();
    }
    if (this._trackedModal) {
      removeAriaReferencedId(this._trackedModal, "aria-owns", this.autocomplete.id);
    }
  }
  /**
   * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
   * within the viewport.
   */
  updatePosition() {
    if (this._overlayAttached) {
      this._overlayRef.updatePosition();
    }
  }
  /**
   * A stream of actions that should close the autocomplete panel, including
   * when an option is selected, on blur, and when TAB is pressed.
   */
  get panelClosingActions() {
    return merge(this.optionSelections, this.autocomplete._keyManager.tabOut.pipe(filter(() => this._overlayAttached)), this._closeKeyEventStream, this._getOutsideClickStream(), this._overlayRef ? this._overlayRef.detachments().pipe(filter(() => this._overlayAttached)) : of()).pipe(
      // Normalize the output so we return a consistent type.
      map((event) => event instanceof MatOptionSelectionChange ? event : null)
    );
  }
  /** Stream of changes to the selection state of the autocomplete options. */
  optionSelections = defer(() => {
    const options = this.autocomplete ? this.autocomplete.options : null;
    if (options) {
      return options.changes.pipe(startWith(options), switchMap(() => merge(...options.map((option) => option.onSelectionChange))));
    }
    return this._initialized.pipe(switchMap(() => this.optionSelections));
  });
  /** The currently active option, coerced to MatOption type. */
  get activeOption() {
    if (this.autocomplete && this.autocomplete._keyManager) {
      return this.autocomplete._keyManager.activeItem;
    }
    return null;
  }
  /** Stream of clicks outside of the autocomplete panel. */
  _getOutsideClickStream() {
    return new Observable((observer) => {
      const listener = (event) => {
        const clickTarget = _getEventTarget(event);
        const formField = this._formField ? this._formField.getConnectedOverlayOrigin().nativeElement : null;
        const customOrigin = this.connectedTo ? this.connectedTo.elementRef.nativeElement : null;
        if (this._overlayAttached && clickTarget !== this._element.nativeElement && // Normally focus moves inside `mousedown` so this condition will almost always be
        // true. Its main purpose is to handle the case where the input is focused from an
        // outside click which propagates up to the `body` listener within the same sequence
        // and causes the panel to close immediately (see #3106).
        !this._hasFocus() && (!formField || !formField.contains(clickTarget)) && (!customOrigin || !customOrigin.contains(clickTarget)) && !!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget)) {
          observer.next(event);
        }
      };
      const cleanups = [this._renderer.listen("document", "click", listener), this._renderer.listen("document", "auxclick", listener), this._renderer.listen("document", "touchend", listener)];
      return () => {
        cleanups.forEach((current) => current());
      };
    });
  }
  // Implemented as part of ControlValueAccessor.
  writeValue(value) {
    Promise.resolve(null).then(() => this._assignOptionValue(value));
  }
  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn) {
    this._onChange = fn;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled) {
    this._element.nativeElement.disabled = isDisabled;
  }
  _handleKeydown(e) {
    const event = e;
    const keyCode = event.keyCode;
    const hasModifier = hasModifierKey(event);
    if (keyCode === ESCAPE && !hasModifier) {
      event.preventDefault();
    }
    this._valueOnLastKeydown = this._element.nativeElement.value;
    if (this.activeOption && keyCode === ENTER && this.panelOpen && !hasModifier) {
      this.activeOption._selectViaInteraction();
      this._resetActiveItem();
      event.preventDefault();
    } else if (this.autocomplete) {
      const prevActiveItem = this.autocomplete._keyManager.activeItem;
      const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
      if (keyCode === TAB || isArrowKey && !hasModifier && this.panelOpen) {
        this.autocomplete._keyManager.onKeydown(event);
      } else if (isArrowKey && this._canOpen()) {
        this._openPanelInternal(this._valueOnLastKeydown);
      }
      if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
        this._scrollToOption(this.autocomplete._keyManager.activeItemIndex || 0);
        if (this.autocomplete.autoSelectActiveOption && this.activeOption) {
          if (!this._pendingAutoselectedOption) {
            this._valueBeforeAutoSelection = this._valueOnLastKeydown;
          }
          this._pendingAutoselectedOption = this.activeOption;
          this._assignOptionValue(this.activeOption.value);
        }
      }
    }
  }
  _handleInput(event) {
    let target = event.target;
    let value = target.value;
    if (target.type === "number") {
      value = value == "" ? null : parseFloat(value);
    }
    if (this._previousValue !== value) {
      this._previousValue = value;
      this._pendingAutoselectedOption = null;
      if (!this.autocomplete || !this.autocomplete.requireSelection) {
        this._onChange(value);
      }
      if (!value) {
        this._clearPreviousSelectedOption(null, false);
      } else if (this.panelOpen && !this.autocomplete.requireSelection) {
        const selectedOption = this.autocomplete.options?.find((option) => option.selected);
        if (selectedOption) {
          const display = this._getDisplayValue(selectedOption.value);
          if (value !== display) {
            selectedOption.deselect(false);
          }
        }
      }
      if (this._canOpen() && this._hasFocus()) {
        const valueOnAttach = this._valueOnLastKeydown ?? this._element.nativeElement.value;
        this._valueOnLastKeydown = null;
        this._openPanelInternal(valueOnAttach);
      }
    }
  }
  _handleFocus() {
    if (!this._canOpenOnNextFocus) {
      this._canOpenOnNextFocus = true;
    } else if (this._canOpen()) {
      this._previousValue = this._element.nativeElement.value;
      this._attachOverlay(this._previousValue);
      this._floatLabel(true);
    }
  }
  _handleClick() {
    if (this._canOpen() && !this.panelOpen) {
      this._openPanelInternal();
    }
  }
  /** Whether the input currently has focus. */
  _hasFocus() {
    return _getFocusedElementPierceShadowDom() === this._element.nativeElement;
  }
  /**
   * In "auto" mode, the label will animate down as soon as focus is lost.
   * This causes the value to jump when selecting an option with the mouse.
   * This method manually floats the label until the panel can be closed.
   * @param shouldAnimate Whether the label should be animated when it is floated.
   */
  _floatLabel(shouldAnimate = false) {
    if (this._formField && this._formField.floatLabel === "auto") {
      if (shouldAnimate) {
        this._formField._animateAndLockLabel();
      } else {
        this._formField.floatLabel = "always";
      }
      this._manuallyFloatingLabel = true;
    }
  }
  /** If the label has been manually elevated, return it to its normal state. */
  _resetLabel() {
    if (this._manuallyFloatingLabel) {
      if (this._formField) {
        this._formField.floatLabel = "auto";
      }
      this._manuallyFloatingLabel = false;
    }
  }
  /**
   * This method listens to a stream of panel closing actions and resets the
   * stream every time the option list changes.
   */
  _subscribeToClosingActions() {
    const initialRender = new Observable((subscriber) => {
      afterNextRender(() => {
        subscriber.next();
      }, {
        injector: this._environmentInjector
      });
    });
    const optionChanges = this.autocomplete.options?.changes.pipe(
      tap(() => this._positionStrategy.reapplyLastPosition()),
      // Defer emitting to the stream until the next tick, because changing
      // bindings in here will cause "changed after checked" errors.
      delay(0)
    ) ?? of();
    return merge(initialRender, optionChanges).pipe(
      // create a new stream of panelClosingActions, replacing any previous streams
      // that were created, and flatten it so our stream only emits closing events...
      switchMap(() => this._zone.run(() => {
        const wasOpen = this.panelOpen;
        this._resetActiveItem();
        this._updatePanelState();
        this._changeDetectorRef.detectChanges();
        if (this.panelOpen) {
          this._overlayRef.updatePosition();
        }
        if (wasOpen !== this.panelOpen) {
          if (this.panelOpen) {
            this._emitOpened();
          } else {
            this.autocomplete.closed.emit();
          }
        }
        return this.panelClosingActions;
      })),
      // when the first closing event occurs...
      take(1)
    ).subscribe((event) => this._setValueAndClose(event));
  }
  /**
   * Emits the opened event once it's known that the panel will be shown and stores
   * the state of the trigger right before the opening sequence was finished.
   */
  _emitOpened() {
    this.autocomplete.opened.emit();
  }
  /** Destroys the autocomplete suggestion panel. */
  _destroyPanel() {
    if (this._overlayRef) {
      this.closePanel();
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }
  /** Given a value, returns the string that should be shown within the input. */
  _getDisplayValue(value) {
    const autocomplete = this.autocomplete;
    return autocomplete && autocomplete.displayWith ? autocomplete.displayWith(value) : value;
  }
  _assignOptionValue(value) {
    const toDisplay = this._getDisplayValue(value);
    if (value == null) {
      this._clearPreviousSelectedOption(null, false);
    }
    this._updateNativeInputValue(toDisplay != null ? toDisplay : "");
  }
  _updateNativeInputValue(value) {
    if (this._formField) {
      this._formField._control.value = value;
    } else {
      this._element.nativeElement.value = value;
    }
    this._previousValue = value;
  }
  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  _setValueAndClose(event) {
    const panel = this.autocomplete;
    const toSelect = event ? event.source : this._pendingAutoselectedOption;
    if (toSelect) {
      this._clearPreviousSelectedOption(toSelect);
      this._assignOptionValue(toSelect.value);
      this._onChange(toSelect.value);
      panel._emitSelectEvent(toSelect);
      this._element.nativeElement.focus();
    } else if (panel.requireSelection && this._element.nativeElement.value !== this._valueOnAttach) {
      this._clearPreviousSelectedOption(null);
      this._assignOptionValue(null);
      this._onChange(null);
    }
    this.closePanel();
  }
  /**
   * Clear any previous selected option and emit a selection change event for this option
   */
  _clearPreviousSelectedOption(skip, emitEvent) {
    this.autocomplete?.options?.forEach((option) => {
      if (option !== skip && option.selected) {
        option.deselect(emitEvent);
      }
    });
  }
  _openPanelInternal(valueOnAttach = this._element.nativeElement.value) {
    this._attachOverlay(valueOnAttach);
    this._floatLabel();
    if (this._trackedModal) {
      const panelId = this.autocomplete.id;
      addAriaReferencedId(this._trackedModal, "aria-owns", panelId);
    }
  }
  _attachOverlay(valueOnAttach) {
    if (!this.autocomplete && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatAutocompleteMissingPanelError();
    }
    let overlayRef = this._overlayRef;
    if (!overlayRef) {
      this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef, {
        id: this._formField?.getLabelId()
      });
      overlayRef = createOverlayRef(this._injector, this._getOverlayConfig());
      this._overlayRef = overlayRef;
      this._viewportSubscription = this._viewportRuler.change().subscribe(() => {
        if (this.panelOpen && overlayRef) {
          overlayRef.updateSize({
            width: this._getPanelWidth()
          });
        }
      });
      this._handsetLandscapeSubscription = this._breakpointObserver.observe(Breakpoints.HandsetLandscape).subscribe((result) => {
        const isHandsetLandscape = result.matches;
        if (isHandsetLandscape) {
          this._positionStrategy.withFlexibleDimensions(true).withGrowAfterOpen(true).withViewportMargin(8);
        } else {
          this._positionStrategy.withFlexibleDimensions(false).withGrowAfterOpen(false).withViewportMargin(0);
        }
      });
    } else {
      this._positionStrategy.setOrigin(this._getConnectedElement());
      overlayRef.updateSize({
        width: this._getPanelWidth()
      });
    }
    if (overlayRef && !overlayRef.hasAttached()) {
      overlayRef.attach(this._portal);
      this._valueOnAttach = valueOnAttach;
      this._valueOnLastKeydown = null;
      this._closingActionsSubscription = this._subscribeToClosingActions();
    }
    const wasOpen = this.panelOpen;
    this.autocomplete._isOpen = this._overlayAttached = true;
    this.autocomplete._latestOpeningTrigger = this;
    this.autocomplete._setColor(this._formField?.color);
    this._updatePanelState();
    this._applyModalPanelOwnership();
    if (this.panelOpen && wasOpen !== this.panelOpen) {
      this._emitOpened();
    }
  }
  /** Handles keyboard events coming from the overlay panel. */
  _handlePanelKeydown = (event) => {
    if (event.keyCode === ESCAPE && !hasModifierKey(event) || event.keyCode === UP_ARROW && hasModifierKey(event, "altKey")) {
      if (this._pendingAutoselectedOption) {
        this._updateNativeInputValue(this._valueBeforeAutoSelection ?? "");
        this._pendingAutoselectedOption = null;
      }
      this._closeKeyEventStream.next();
      this._resetActiveItem();
      event.stopPropagation();
      event.preventDefault();
    }
  };
  /** Updates the panel's visibility state and any trigger state tied to id. */
  _updatePanelState() {
    this.autocomplete._setVisibility();
    if (this.panelOpen) {
      const overlayRef = this._overlayRef;
      if (!this._keydownSubscription) {
        this._keydownSubscription = overlayRef.keydownEvents().subscribe(this._handlePanelKeydown);
      }
      if (!this._outsideClickSubscription) {
        this._outsideClickSubscription = overlayRef.outsidePointerEvents().subscribe();
      }
    } else {
      this._keydownSubscription?.unsubscribe();
      this._outsideClickSubscription?.unsubscribe();
      this._keydownSubscription = this._outsideClickSubscription = null;
    }
  }
  _getOverlayConfig() {
    return new OverlayConfig({
      positionStrategy: this._getOverlayPosition(),
      scrollStrategy: this._scrollStrategy(),
      width: this._getPanelWidth(),
      direction: this._dir ?? void 0,
      hasBackdrop: this._defaults?.hasBackdrop,
      backdropClass: this._defaults?.backdropClass || "cdk-overlay-transparent-backdrop",
      panelClass: this._overlayPanelClass,
      disableAnimations: this._animationsDisabled
    });
  }
  _getOverlayPosition() {
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this._getConnectedElement()).withFlexibleDimensions(false).withPush(false);
    this._setStrategyPositions(strategy);
    this._positionStrategy = strategy;
    return strategy;
  }
  /** Sets the positions on a position strategy based on the directive's input state. */
  _setStrategyPositions(positionStrategy) {
    const belowPositions = [{
      originX: "start",
      originY: "bottom",
      overlayX: "start",
      overlayY: "top"
    }, {
      originX: "end",
      originY: "bottom",
      overlayX: "end",
      overlayY: "top"
    }];
    const panelClass = this._aboveClass;
    const abovePositions = [{
      originX: "start",
      originY: "top",
      overlayX: "start",
      overlayY: "bottom",
      panelClass
    }, {
      originX: "end",
      originY: "top",
      overlayX: "end",
      overlayY: "bottom",
      panelClass
    }];
    let positions;
    if (this.position === "above") {
      positions = abovePositions;
    } else if (this.position === "below") {
      positions = belowPositions;
    } else {
      positions = [...belowPositions, ...abovePositions];
    }
    positionStrategy.withPositions(positions);
  }
  _getConnectedElement() {
    if (this.connectedTo) {
      return this.connectedTo.elementRef;
    }
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._element;
  }
  _getPanelWidth() {
    return this.autocomplete.panelWidth || this._getHostWidth();
  }
  /** Returns the width of the input element, so the panel width can match it. */
  _getHostWidth() {
    return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
  }
  /**
   * Reset the active item to -1. This is so that pressing arrow keys will activate the correct
   * option.
   *
   * If the consumer opted-in to automatically activatating the first option, activate the first
   * *enabled* option.
   */
  _resetActiveItem() {
    const autocomplete = this.autocomplete;
    if (autocomplete.autoActiveFirstOption) {
      let firstEnabledOptionIndex = -1;
      for (let index = 0; index < autocomplete.options.length; index++) {
        const option = autocomplete.options.get(index);
        if (!option.disabled) {
          firstEnabledOptionIndex = index;
          break;
        }
      }
      autocomplete._keyManager.setActiveItem(firstEnabledOptionIndex);
    } else {
      autocomplete._keyManager.setActiveItem(-1);
    }
  }
  /** Determines whether the panel can be opened. */
  _canOpen() {
    const element = this._element.nativeElement;
    return !element.readOnly && !element.disabled && !this.autocompleteDisabled;
  }
  /** Scrolls to a particular option in the list. */
  _scrollToOption(index) {
    const autocomplete = this.autocomplete;
    const labelCount = _countGroupLabelsBeforeOption(index, autocomplete.options, autocomplete.optionGroups);
    if (index === 0 && labelCount === 1) {
      autocomplete._setScrollTop(0);
    } else if (autocomplete.panel) {
      const option = autocomplete.options.toArray()[index];
      if (option) {
        const element = option._getHostElement();
        const newScrollPosition = _getOptionScrollPosition(element.offsetTop, element.offsetHeight, autocomplete._getScrollTop(), autocomplete.panel.nativeElement.offsetHeight);
        autocomplete._setScrollTop(newScrollPosition);
      }
    }
  }
  /**
   * Track which modal we have modified the `aria-owns` attribute of. When the combobox trigger is
   * inside an aria-modal, we apply aria-owns to the parent modal with the `id` of the options
   * panel. Track the modal we have changed so we can undo the changes on destroy.
   */
  _trackedModal = null;
  /**
   * If the autocomplete trigger is inside of an `aria-modal` element, connect
   * that modal to the options panel with `aria-owns`.
   *
   * For some browser + screen reader combinations, when navigation is inside
   * of an `aria-modal` element, the screen reader treats everything outside
   * of that modal as hidden or invisible.
   *
   * This causes a problem when the combobox trigger is _inside_ of a modal, because the
   * options panel is rendered _outside_ of that modal, preventing screen reader navigation
   * from reaching the panel.
   *
   * We can work around this issue by applying `aria-owns` to the modal with the `id` of
   * the options panel. This effectively communicates to assistive technology that the
   * options panel is part of the same interaction as the modal.
   *
   * At time of this writing, this issue is present in VoiceOver.
   * See https://github.com/angular/components/issues/20694
   */
  _applyModalPanelOwnership() {
    const modal = this._element.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');
    if (!modal) {
      return;
    }
    const panelId = this.autocomplete.id;
    if (this._trackedModal) {
      removeAriaReferencedId(this._trackedModal, "aria-owns", panelId);
    }
    addAriaReferencedId(modal, "aria-owns", panelId);
    this._trackedModal = modal;
  }
  /** Clears the references to the listbox overlay element from the modal it was added to. */
  _clearFromModal() {
    if (this._trackedModal) {
      const panelId = this.autocomplete.id;
      removeAriaReferencedId(this._trackedModal, "aria-owns", panelId);
      this._trackedModal = null;
    }
  }
  static \u0275fac = function MatAutocompleteTrigger_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocompleteTrigger)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatAutocompleteTrigger,
    selectors: [["input", "matAutocomplete", ""], ["textarea", "matAutocomplete", ""]],
    hostAttrs: [1, "mat-mdc-autocomplete-trigger"],
    hostVars: 7,
    hostBindings: function MatAutocompleteTrigger_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("focusin", function MatAutocompleteTrigger_focusin_HostBindingHandler() {
          return ctx._handleFocus();
        })("blur", function MatAutocompleteTrigger_blur_HostBindingHandler() {
          return ctx._onTouched();
        })("input", function MatAutocompleteTrigger_input_HostBindingHandler($event) {
          return ctx._handleInput($event);
        })("keydown", function MatAutocompleteTrigger_keydown_HostBindingHandler($event) {
          return ctx._handleKeydown($event);
        })("click", function MatAutocompleteTrigger_click_HostBindingHandler() {
          return ctx._handleClick();
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("autocomplete", ctx.autocompleteAttribute)("role", ctx.autocompleteDisabled ? null : "combobox")("aria-autocomplete", ctx.autocompleteDisabled ? null : "list")("aria-activedescendant", ctx.panelOpen && ctx.activeOption ? ctx.activeOption.id : null)("aria-expanded", ctx.autocompleteDisabled ? null : ctx.panelOpen.toString())("aria-controls", ctx.autocompleteDisabled || !ctx.panelOpen ? null : ctx.autocomplete == null ? null : ctx.autocomplete.id)("aria-haspopup", ctx.autocompleteDisabled ? null : "listbox");
      }
    },
    inputs: {
      autocomplete: [0, "matAutocomplete", "autocomplete"],
      position: [0, "matAutocompletePosition", "position"],
      connectedTo: [0, "matAutocompleteConnectedTo", "connectedTo"],
      autocompleteAttribute: [0, "autocomplete", "autocompleteAttribute"],
      autocompleteDisabled: [2, "matAutocompleteDisabled", "autocompleteDisabled", booleanAttribute]
    },
    exportAs: ["matAutocompleteTrigger"],
    features: [\u0275\u0275ProvidersFeature([MAT_AUTOCOMPLETE_VALUE_ACCESSOR]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocompleteTrigger, [{
    type: Directive,
    args: [{
      selector: `input[matAutocomplete], textarea[matAutocomplete]`,
      host: {
        "class": "mat-mdc-autocomplete-trigger",
        "[attr.autocomplete]": "autocompleteAttribute",
        "[attr.role]": 'autocompleteDisabled ? null : "combobox"',
        "[attr.aria-autocomplete]": 'autocompleteDisabled ? null : "list"',
        "[attr.aria-activedescendant]": "(panelOpen && activeOption) ? activeOption.id : null",
        "[attr.aria-expanded]": "autocompleteDisabled ? null : panelOpen.toString()",
        "[attr.aria-controls]": "(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id",
        "[attr.aria-haspopup]": 'autocompleteDisabled ? null : "listbox"',
        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
        // a little earlier. This avoids issues where IE delays the focusing of the input.
        "(focusin)": "_handleFocus()",
        "(blur)": "_onTouched()",
        "(input)": "_handleInput($event)",
        "(keydown)": "_handleKeydown($event)",
        "(click)": "_handleClick()"
      },
      exportAs: "matAutocompleteTrigger",
      providers: [MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
    }]
  }], () => [], {
    autocomplete: [{
      type: Input,
      args: ["matAutocomplete"]
    }],
    position: [{
      type: Input,
      args: ["matAutocompletePosition"]
    }],
    connectedTo: [{
      type: Input,
      args: ["matAutocompleteConnectedTo"]
    }],
    autocompleteAttribute: [{
      type: Input,
      args: ["autocomplete"]
    }],
    autocompleteDisabled: [{
      type: Input,
      args: [{
        alias: "matAutocompleteDisabled",
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatAutocompleteModule = class _MatAutocompleteModule {
  static \u0275fac = function MatAutocompleteModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatAutocompleteModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatAutocompleteModule,
    imports: [OverlayModule, MatOptionModule, MatCommonModule, MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
    exports: [CdkScrollableModule, MatAutocomplete, MatOptionModule, MatCommonModule, MatAutocompleteTrigger, MatAutocompleteOrigin]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
    imports: [OverlayModule, MatOptionModule, MatCommonModule, CdkScrollableModule, MatOptionModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAutocompleteModule, [{
    type: NgModule,
    args: [{
      imports: [OverlayModule, MatOptionModule, MatCommonModule, MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
      exports: [CdkScrollableModule, MatAutocomplete, MatOptionModule, MatCommonModule, MatAutocompleteTrigger, MatAutocompleteOrigin],
      providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/paginator.mjs
function MatPaginator_Conditional_2_Conditional_3_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pageSizeOption_r3 = ctx.$implicit;
    \u0275\u0275property("value", pageSizeOption_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pageSizeOption_r3, " ");
  }
}
function MatPaginator_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 14)(1, "mat-select", 16, 0);
    \u0275\u0275listener("selectionChange", function MatPaginator_Conditional_2_Conditional_3_Template_mat_select_selectionChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1._changePageSize($event.value));
    });
    \u0275\u0275repeaterCreate(3, MatPaginator_Conditional_2_Conditional_3_For_4_Template, 2, 2, "mat-option", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 18);
    \u0275\u0275listener("click", function MatPaginator_Conditional_2_Conditional_3_Template_div_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const selectRef_r4 = \u0275\u0275reference(2);
      return \u0275\u0275resetView(selectRef_r4.open());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("appearance", ctx_r1._formFieldAppearance)("color", ctx_r1.color);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.pageSize)("disabled", ctx_r1.disabled);
    \u0275\u0275ariaProperty("aria-labelledby", ctx_r1._pageSizeLabelId);
    \u0275\u0275property("panelClass", ctx_r1.selectConfig.panelClass || "")("disableOptionCentering", ctx_r1.selectConfig.disableOptionCentering);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1._displayedPageSizeOptions);
  }
}
function MatPaginator_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.pageSize);
  }
}
function MatPaginator_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, MatPaginator_Conditional_2_Conditional_3_Template, 6, 7, "mat-form-field", 14);
    \u0275\u0275conditionalCreate(4, MatPaginator_Conditional_2_Conditional_4_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("id", ctx_r1._pageSizeLabelId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1._intl.itemsPerPageLabel, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1._displayedPageSizeOptions.length > 1 ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1._displayedPageSizeOptions.length <= 1 ? 4 : -1);
  }
}
function MatPaginator_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function MatPaginator_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1._buttonClicked(0, ctx_r1._previousButtonsDisabled()));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 8);
    \u0275\u0275element(2, "path", 20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r1._intl.firstPageLabel)("matTooltipDisabled", ctx_r1._previousButtonsDisabled())("disabled", ctx_r1._previousButtonsDisabled())("tabindex", ctx_r1._previousButtonsDisabled() ? -1 : null);
    \u0275\u0275attribute("aria-label", ctx_r1._intl.firstPageLabel);
  }
}
function MatPaginator_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function MatPaginator_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1._buttonClicked(ctx_r1.getNumberOfPages() - 1, ctx_r1._nextButtonsDisabled()));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 8);
    \u0275\u0275element(2, "path", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("matTooltip", ctx_r1._intl.lastPageLabel)("matTooltipDisabled", ctx_r1._nextButtonsDisabled())("disabled", ctx_r1._nextButtonsDisabled())("tabindex", ctx_r1._nextButtonsDisabled() ? -1 : null);
    \u0275\u0275attribute("aria-label", ctx_r1._intl.lastPageLabel);
  }
}
var MatPaginatorIntl = class _MatPaginatorIntl {
  /**
   * Stream to emit from when labels are changed. Use this to notify components when the labels have
   * changed after initialization.
   */
  changes = new Subject();
  /** A label for the page size selector. */
  itemsPerPageLabel = "Items per page:";
  /** A label for the button that increments the current page. */
  nextPageLabel = "Next page";
  /** A label for the button that decrements the current page. */
  previousPageLabel = "Previous page";
  /** A label for the button that moves to the first page. */
  firstPageLabel = "First page";
  /** A label for the button that moves to the last page. */
  lastPageLabel = "Last page";
  /** A label for the range of items within the current page and the length of the whole list. */
  getRangeLabel = (page, pageSize, length) => {
    if (length == 0 || pageSize == 0) {
      return `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} \u2013 ${endIndex} of ${length}`;
  };
  static \u0275fac = function MatPaginatorIntl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginatorIntl)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MatPaginatorIntl,
    factory: _MatPaginatorIntl.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorIntl, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function MAT_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl) {
  return parentIntl || new MatPaginatorIntl();
}
var MAT_PAGINATOR_INTL_PROVIDER = {
  // If there is already an MatPaginatorIntl available, use that. Otherwise, provide a new one.
  provide: MatPaginatorIntl,
  deps: [[new Optional(), new SkipSelf(), MatPaginatorIntl]],
  useFactory: MAT_PAGINATOR_INTL_PROVIDER_FACTORY
};
var DEFAULT_PAGE_SIZE = 50;
var MAT_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken("MAT_PAGINATOR_DEFAULT_OPTIONS");
var MatPaginator = class _MatPaginator {
  _intl = inject(MatPaginatorIntl);
  _changeDetectorRef = inject(ChangeDetectorRef);
  /** If set, styles the "page size" form field with the designated style. */
  _formFieldAppearance;
  /** ID for the DOM node containing the paginator's items per page label. */
  _pageSizeLabelId = inject(_IdGenerator).getId("mat-paginator-page-size-label-");
  _intlChanges;
  _isInitialized = false;
  _initializedStream = new ReplaySubject(1);
  /**
   * Theme color of the underlying form controls. This API is supported in M2
   * themes only,it has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/paginator/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color;
  /** The zero-based page index of the displayed list of items. Defaulted to 0. */
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value) {
    this._pageIndex = Math.max(value || 0, 0);
    this._changeDetectorRef.markForCheck();
  }
  _pageIndex = 0;
  /** The length of the total number of items that are being paginated. Defaulted to 0. */
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value || 0;
    this._changeDetectorRef.markForCheck();
  }
  _length = 0;
  /** Number of items to display on a page. By default set to 50. */
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(value) {
    this._pageSize = Math.max(value || 0, 0);
    this._updateDisplayedPageSizeOptions();
  }
  _pageSize;
  /** The set of provided page size options to display to the user. */
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value) {
    this._pageSizeOptions = (value || []).map((p) => numberAttribute(p, 0));
    this._updateDisplayedPageSizeOptions();
  }
  _pageSizeOptions = [];
  /** Whether to hide the page size selection UI from the user. */
  hidePageSize = false;
  /** Whether to show the first/last buttons UI to the user. */
  showFirstLastButtons = false;
  /** Used to configure the underlying `MatSelect` inside the paginator. */
  selectConfig = {};
  /** Whether the paginator is disabled. */
  disabled = false;
  /** Event emitted when the paginator changes the page size or page index. */
  page = new EventEmitter();
  /** Displayed set of page size options. Will be sorted and include current page size. */
  _displayedPageSizeOptions;
  /** Emits when the paginator is initialized. */
  initialized = this._initializedStream;
  constructor() {
    const _intl = this._intl;
    const defaults = inject(MAT_PAGINATOR_DEFAULT_OPTIONS, {
      optional: true
    });
    this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
    if (defaults) {
      const {
        pageSize,
        pageSizeOptions,
        hidePageSize,
        showFirstLastButtons
      } = defaults;
      if (pageSize != null) {
        this._pageSize = pageSize;
      }
      if (pageSizeOptions != null) {
        this._pageSizeOptions = pageSizeOptions;
      }
      if (hidePageSize != null) {
        this.hidePageSize = hidePageSize;
      }
      if (showFirstLastButtons != null) {
        this.showFirstLastButtons = showFirstLastButtons;
      }
    }
    this._formFieldAppearance = defaults?.formFieldAppearance || "outline";
  }
  ngOnInit() {
    this._isInitialized = true;
    this._updateDisplayedPageSizeOptions();
    this._initializedStream.next();
  }
  ngOnDestroy() {
    this._initializedStream.complete();
    this._intlChanges.unsubscribe();
  }
  /** Advances to the next page if it exists. */
  nextPage() {
    if (this.hasNextPage()) {
      this._navigate(this.pageIndex + 1);
    }
  }
  /** Move back to the previous page if it exists. */
  previousPage() {
    if (this.hasPreviousPage()) {
      this._navigate(this.pageIndex - 1);
    }
  }
  /** Move to the first page if not already there. */
  firstPage() {
    if (this.hasPreviousPage()) {
      this._navigate(0);
    }
  }
  /** Move to the last page if not already there. */
  lastPage() {
    if (this.hasNextPage()) {
      this._navigate(this.getNumberOfPages() - 1);
    }
  }
  /** Whether there is a previous page. */
  hasPreviousPage() {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }
  /** Whether there is a next page. */
  hasNextPage() {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }
  /** Calculate the number of pages */
  getNumberOfPages() {
    if (!this.pageSize) {
      return 0;
    }
    return Math.ceil(this.length / this.pageSize);
  }
  /**
   * Changes the page size so that the first item displayed on the page will still be
   * displayed using the new page size.
   *
   * For example, if the page size is 10 and on the second page (items indexed 10-19) then
   * switching so that the page size is 5 will set the third page as the current page so
   * that the 10th item will still be displayed.
   */
  _changePageSize(pageSize) {
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;
    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }
  /** Checks whether the buttons for going forwards should be disabled. */
  _nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }
  /** Checks whether the buttons for going backwards should be disabled. */
  _previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }
  /**
   * Updates the list of page size options to display to the user. Includes making sure that
   * the page size is an option and that the list is sorted.
   */
  _updateDisplayedPageSizeOptions() {
    if (!this._isInitialized) {
      return;
    }
    if (!this.pageSize) {
      this._pageSize = this.pageSizeOptions.length != 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }
    this._displayedPageSizeOptions = this.pageSizeOptions.slice();
    if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this._displayedPageSizeOptions.push(this.pageSize);
    }
    this._displayedPageSizeOptions.sort((a, b) => a - b);
    this._changeDetectorRef.markForCheck();
  }
  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  _emitPageEvent(previousPageIndex) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }
  /** Navigates to a specific page index. */
  _navigate(index) {
    const previousIndex = this.pageIndex;
    if (index !== previousIndex) {
      this.pageIndex = index;
      this._emitPageEvent(previousIndex);
    }
  }
  /**
   * Callback invoked when one of the navigation buttons is called.
   * @param targetIndex Index to which the paginator should navigate.
   * @param isDisabled Whether the button is disabled.
   */
  _buttonClicked(targetIndex, isDisabled) {
    if (!isDisabled) {
      this._navigate(targetIndex);
    }
  }
  static \u0275fac = function MatPaginator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginator)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatPaginator,
    selectors: [["mat-paginator"]],
    hostAttrs: ["role", "group", 1, "mat-mdc-paginator"],
    inputs: {
      color: "color",
      pageIndex: [2, "pageIndex", "pageIndex", numberAttribute],
      length: [2, "length", "length", numberAttribute],
      pageSize: [2, "pageSize", "pageSize", numberAttribute],
      pageSizeOptions: "pageSizeOptions",
      hidePageSize: [2, "hidePageSize", "hidePageSize", booleanAttribute],
      showFirstLastButtons: [2, "showFirstLastButtons", "showFirstLastButtons", booleanAttribute],
      selectConfig: "selectConfig",
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      page: "page"
    },
    exportAs: ["matPaginator"],
    decls: 14,
    vars: 14,
    consts: [["selectRef", ""], [1, "mat-mdc-paginator-outer-container"], [1, "mat-mdc-paginator-container"], [1, "mat-mdc-paginator-page-size"], [1, "mat-mdc-paginator-range-actions"], ["aria-live", "polite", 1, "mat-mdc-paginator-range-label"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-first", 3, "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-previous", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["viewBox", "0 0 24 24", "focusable", "false", "aria-hidden", "true", 1, "mat-mdc-paginator-icon"], ["d", "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-next", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-last", 3, "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], [1, "mat-mdc-paginator-page-size-label"], [1, "mat-mdc-paginator-page-size-select", 3, "appearance", "color"], [1, "mat-mdc-paginator-page-size-value"], ["hideSingleSelectionIndicator", "", 3, "selectionChange", "value", "disabled", "aria-labelledby", "panelClass", "disableOptionCentering"], [3, "value"], [1, "mat-mdc-paginator-touch-target", 3, "click"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-first", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"], ["matIconButton", "", "type", "button", "matTooltipPosition", "above", "disabledInteractive", "", 1, "mat-mdc-paginator-navigation-last", 3, "click", "matTooltip", "matTooltipDisabled", "disabled", "tabindex"], ["d", "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],
    template: function MatPaginator_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
        \u0275\u0275conditionalCreate(2, MatPaginator_Conditional_2_Template, 5, 4, "div", 3);
        \u0275\u0275elementStart(3, "div", 4)(4, "div", 5);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(6, MatPaginator_Conditional_6_Template, 3, 5, "button", 6);
        \u0275\u0275elementStart(7, "button", 7);
        \u0275\u0275listener("click", function MatPaginator_Template_button_click_7_listener() {
          return ctx._buttonClicked(ctx.pageIndex - 1, ctx._previousButtonsDisabled());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 8);
        \u0275\u0275element(9, "path", 9);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(10, "button", 10);
        \u0275\u0275listener("click", function MatPaginator_Template_button_click_10_listener() {
          return ctx._buttonClicked(ctx.pageIndex + 1, ctx._nextButtonsDisabled());
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(11, "svg", 8);
        \u0275\u0275element(12, "path", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275conditionalCreate(13, MatPaginator_Conditional_13_Template, 3, 5, "button", 12);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275conditional(!ctx.hidePageSize ? 2 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", ctx._intl.getRangeLabel(ctx.pageIndex, ctx.pageSize, ctx.length), " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showFirstLastButtons ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("matTooltip", ctx._intl.previousPageLabel)("matTooltipDisabled", ctx._previousButtonsDisabled())("disabled", ctx._previousButtonsDisabled())("tabindex", ctx._previousButtonsDisabled() ? -1 : null);
        \u0275\u0275attribute("aria-label", ctx._intl.previousPageLabel);
        \u0275\u0275advance(3);
        \u0275\u0275property("matTooltip", ctx._intl.nextPageLabel)("matTooltipDisabled", ctx._nextButtonsDisabled())("disabled", ctx._nextButtonsDisabled())("tabindex", ctx._nextButtonsDisabled() ? -1 : null);
        \u0275\u0275attribute("aria-label", ctx._intl.nextPageLabel);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.showFirstLastButtons ? 13 : -1);
      }
    },
    dependencies: [MatFormField, MatSelect, MatOption, MatIconButton, MatTooltip],
    styles: [".mat-mdc-paginator{display:block;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));background-color:var(--mat-paginator-container-background-color, var(--mat-sys-surface));font-family:var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));line-height:var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));font-size:var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));letter-spacing:var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));--mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);--mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px)}.mat-mdc-paginator .mat-mdc-select-value{font-size:var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size))}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap;width:100%;min-height:var(--mat-paginator-container-size, 56px)}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:var(--mat-paginator-page-size-select-width, 84px)}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px;fill:var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon{fill:var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}@media(forced-colors: active){.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,.mat-mdc-paginator-icon{fill:currentColor}.mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}.mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled]{color:GrayText}}.mat-mdc-paginator-touch-target{display:var(--mat-paginator-touch-target-display, block);position:absolute;top:50%;left:50%;width:var(--mat-paginator-page-size-select-width, 84px);height:var(--mat-paginator-page-size-select-touch-target-height, 48px);background-color:rgba(0,0,0,0);transform:translate(-50%, -50%);cursor:pointer}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginator, [{
    type: Component,
    args: [{
      selector: "mat-paginator",
      exportAs: "matPaginator",
      host: {
        "class": "mat-mdc-paginator",
        "role": "group"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [MatFormField, MatSelect, MatOption, MatIconButton, MatTooltip],
      template: '<div class="mat-mdc-paginator-outer-container">\n  <div class="mat-mdc-paginator-container">\n    @if (!hidePageSize) {\n      <div class="mat-mdc-paginator-page-size">\n        <div class="mat-mdc-paginator-page-size-label" [attr.id]="_pageSizeLabelId">\n          {{_intl.itemsPerPageLabel}}\n        </div>\n\n        @if (_displayedPageSizeOptions.length > 1) {\n          <mat-form-field\n            [appearance]="_formFieldAppearance!"\n            [color]="color"\n            class="mat-mdc-paginator-page-size-select">\n            <mat-select\n              #selectRef\n              [value]="pageSize"\n              [disabled]="disabled"\n              [aria-labelledby]="_pageSizeLabelId"\n              [panelClass]="selectConfig.panelClass || \'\'"\n              [disableOptionCentering]="selectConfig.disableOptionCentering"\n              (selectionChange)="_changePageSize($event.value)"\n              hideSingleSelectionIndicator>\n              @for (pageSizeOption of _displayedPageSizeOptions; track pageSizeOption) {\n                <mat-option [value]="pageSizeOption">\n                  {{pageSizeOption}}\n                </mat-option>\n              }\n            </mat-select>\n          <div class="mat-mdc-paginator-touch-target" (click)="selectRef.open()"></div>\n          </mat-form-field>\n        }\n\n        @if (_displayedPageSizeOptions.length <= 1) {\n          <div class="mat-mdc-paginator-page-size-value">{{pageSize}}</div>\n        }\n      </div>\n    }\n\n    <div class="mat-mdc-paginator-range-actions">\n      <div class="mat-mdc-paginator-range-label" aria-live="polite">\n        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}\n      </div>\n\n      <!--\n      The buttons use `disabledInteractive` so that they can retain focus if they become disabled,\n      otherwise focus is moved to the document body. However, users should not be able to navigate\n      into these buttons, so `tabindex` is set to -1 when disabled.\n      -->\n\n      @if (showFirstLastButtons) {\n        <button matIconButton type="button"\n                class="mat-mdc-paginator-navigation-first"\n                (click)="_buttonClicked(0, _previousButtonsDisabled())"\n                [attr.aria-label]="_intl.firstPageLabel"\n                [matTooltip]="_intl.firstPageLabel"\n                [matTooltipDisabled]="_previousButtonsDisabled()"\n                matTooltipPosition="above"\n                [disabled]="_previousButtonsDisabled()"\n                [tabindex]="_previousButtonsDisabled() ? -1 : null"\n                disabledInteractive>\n          <svg class="mat-mdc-paginator-icon"\n              viewBox="0 0 24 24"\n              focusable="false"\n              aria-hidden="true">\n            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>\n          </svg>\n        </button>\n      }\n      <button matIconButton type="button"\n              class="mat-mdc-paginator-navigation-previous"\n              (click)="_buttonClicked(pageIndex - 1, _previousButtonsDisabled())"\n              [attr.aria-label]="_intl.previousPageLabel"\n              [matTooltip]="_intl.previousPageLabel"\n              [matTooltipDisabled]="_previousButtonsDisabled()"\n              matTooltipPosition="above"\n              [disabled]="_previousButtonsDisabled()"\n              [tabindex]="_previousButtonsDisabled() ? -1 : null"\n              disabledInteractive>\n        <svg class="mat-mdc-paginator-icon"\n             viewBox="0 0 24 24"\n             focusable="false"\n             aria-hidden="true">\n          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\n        </svg>\n      </button>\n      <button matIconButton type="button"\n              class="mat-mdc-paginator-navigation-next"\n              (click)="_buttonClicked(pageIndex + 1, _nextButtonsDisabled())"\n              [attr.aria-label]="_intl.nextPageLabel"\n              [matTooltip]="_intl.nextPageLabel"\n              [matTooltipDisabled]="_nextButtonsDisabled()"\n              matTooltipPosition="above"\n              [disabled]="_nextButtonsDisabled()"\n              [tabindex]="_nextButtonsDisabled() ? -1 : null"\n              disabledInteractive>\n        <svg class="mat-mdc-paginator-icon"\n             viewBox="0 0 24 24"\n             focusable="false"\n             aria-hidden="true">\n          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\n        </svg>\n      </button>\n      @if (showFirstLastButtons) {\n        <button matIconButton type="button"\n                class="mat-mdc-paginator-navigation-last"\n                (click)="_buttonClicked(getNumberOfPages() - 1, _nextButtonsDisabled())"\n                [attr.aria-label]="_intl.lastPageLabel"\n                [matTooltip]="_intl.lastPageLabel"\n                [matTooltipDisabled]="_nextButtonsDisabled()"\n                matTooltipPosition="above"\n                [disabled]="_nextButtonsDisabled()"\n                [tabindex]="_nextButtonsDisabled() ? -1 : null"\n                disabledInteractive>\n          <svg class="mat-mdc-paginator-icon"\n              viewBox="0 0 24 24"\n              focusable="false"\n              aria-hidden="true">\n            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>\n          </svg>\n        </button>\n      }\n    </div>\n  </div>\n</div>\n',
      styles: [".mat-mdc-paginator{display:block;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-paginator-container-text-color, var(--mat-sys-on-surface));background-color:var(--mat-paginator-container-background-color, var(--mat-sys-surface));font-family:var(--mat-paginator-container-text-font, var(--mat-sys-body-small-font));line-height:var(--mat-paginator-container-text-line-height, var(--mat-sys-body-small-line-height));font-size:var(--mat-paginator-container-text-size, var(--mat-sys-body-small-size));font-weight:var(--mat-paginator-container-text-weight, var(--mat-sys-body-small-weight));letter-spacing:var(--mat-paginator-container-text-tracking, var(--mat-sys-body-small-tracking));--mat-form-field-container-height: var(--mat-paginator-form-field-container-height, 40px);--mat-form-field-container-vertical-padding: var(--mat-paginator-form-field-container-vertical-padding, 8px)}.mat-mdc-paginator .mat-mdc-select-value{font-size:var(--mat-paginator-select-trigger-text-size, var(--mat-sys-body-small-size))}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap;width:100%;min-height:var(--mat-paginator-container-size, 56px)}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:var(--mat-paginator-page-size-select-width, 84px)}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px;fill:var(--mat-paginator-enabled-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon{fill:var(--mat-paginator-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}@media(forced-colors: active){.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,.mat-mdc-paginator-icon{fill:currentColor}.mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}.mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled]{color:GrayText}}.mat-mdc-paginator-touch-target{display:var(--mat-paginator-touch-target-display, block);position:absolute;top:50%;left:50%;width:var(--mat-paginator-page-size-select-width, 84px);height:var(--mat-paginator-page-size-select-touch-target-height, 48px);background-color:rgba(0,0,0,0);transform:translate(-50%, -50%);cursor:pointer}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    pageIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    length: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    pageSizeOptions: [{
      type: Input
    }],
    hidePageSize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showFirstLastButtons: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectConfig: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    page: [{
      type: Output
    }]
  });
})();
var MatPaginatorModule = class _MatPaginatorModule {
  static \u0275fac = function MatPaginatorModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPaginatorModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatPaginatorModule,
    imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator],
    exports: [MatPaginator]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [MAT_PAGINATOR_INTL_PROVIDER],
    imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorModule, [{
    type: NgModule,
    args: [{
      imports: [MatButtonModule, MatSelectModule, MatTooltipModule, MatPaginator],
      exports: [MatPaginator],
      providers: [MAT_PAGINATOR_INTL_PROVIDER]
    }]
  }], null, null);
})();

// src/app/components/inventory/inventory-list/inventory-list.component.ts
var _c02 = () => [10, 25, 50, 100];
function InventoryListComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "mat-card", 31)(2, "mat-card-content")(3, "div", 32)(4, "mat-icon", 33);
    \u0275\u0275text(5, "devices");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 34)(7, "div", 35);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 36);
    \u0275\u0275text(10, "Total Devices");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(11, "mat-card", 37)(12, "mat-card-content")(13, "div", 32)(14, "mat-icon", 33);
    \u0275\u0275text(15, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 34)(17, "div", 35);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 36);
    \u0275\u0275text(20, "Active");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(21, "mat-card", 38)(22, "mat-card-content")(23, "div", 32)(24, "mat-icon", 33);
    \u0275\u0275text(25, "electric_bolt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 34)(27, "div", 35);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 36);
    \u0275\u0275text(30, "Poles");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(31, "mat-card", 39)(32, "mat-card-content")(33, "div", 32)(34, "mat-icon", 33);
    \u0275\u0275text(35, "security");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 34)(37, "div", 35);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 36);
    \u0275\u0275text(40, "ECB Present");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.items.length);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.getActiveDevicesCount());
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.getPolesCount());
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.getECBCount());
  }
}
function InventoryListComponent_mat_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loc_r2 = ctx.$implicit;
    \u0275\u0275property("value", loc_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", loc_r2, " ");
  }
}
function InventoryListComponent_mat_option_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r3 = ctx.$implicit;
    \u0275\u0275property("value", type_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", type_r3, " ");
  }
}
function InventoryListComponent_mat_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r4 = ctx.$implicit;
    \u0275\u0275property("value", status_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", status_r4, " ");
  }
}
function InventoryListComponent_th_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41);
    \u0275\u0275text(1, "Location Name");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_td_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.locationName || "N/A");
  }
}
function InventoryListComponent_th_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41);
    \u0275\u0275text(1, "Serial No.");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_td_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r6.serialNumber || "N/A");
  }
}
function InventoryListComponent_th_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41);
    \u0275\u0275text(1, "Device Type");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_td_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.deviceType || "N/A");
  }
}
function InventoryListComponent_th_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_td_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 42)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap("status-badge status-" + ((item_r8.status == null ? null : item_r8.status.toLowerCase()) || "unknown"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r8.status || "Unknown", " ");
  }
}
function InventoryListComponent_th_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41);
    \u0275\u0275text(1, "Poles");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_td_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r9.poles ? "Yes" : "No", " ");
  }
}
function InventoryListComponent_th_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41);
    \u0275\u0275text(1, "ECB Present");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_td_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r10.ecbPresent ? "Yes" : "No", " ");
  }
}
function InventoryListComponent_th_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41);
    \u0275\u0275text(1, "Approach Road");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_td_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r11.approachRoad || "N/A");
  }
}
function InventoryListComponent_th_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41);
    \u0275\u0275text(1, "Coordinates");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_td_59_div_1_Template(rf, ctx) {
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
    const d_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Lat: ", \u0275\u0275pipeBind2(3, 2, d_r12.latitude, "1.4-4"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Lng: ", \u0275\u0275pipeBind2(7, 5, d_r12.longitude, "1.4-4"));
  }
}
function InventoryListComponent_td_59_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "No coordinates");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_td_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 43);
    \u0275\u0275template(1, InventoryListComponent_td_59_div_1_Template, 8, 8, "div", 44)(2, InventoryListComponent_td_59_ng_template_2_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r12 = ctx.$implicit;
    const noCoords_r13 = \u0275\u0275reference(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", d_r12.latitude && d_r12.longitude)("ngIfElse", noCoords_r13);
  }
}
function InventoryListComponent_ng_container_60_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function InventoryListComponent_ng_container_60_td_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 42)(1, "button", 47);
    \u0275\u0275listener("click", function InventoryListComponent_ng_container_60_td_2_Template_button_click_1_listener() {
      const item_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.edit(item_r15.id));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 48);
    \u0275\u0275listener("click", function InventoryListComponent_ng_container_60_td_2_Template_button_click_4_listener() {
      const item_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.viewHistory(item_r15.id));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "history");
    \u0275\u0275elementEnd()()();
  }
}
function InventoryListComponent_ng_container_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 46);
    \u0275\u0275template(1, InventoryListComponent_ng_container_60_th_1_Template, 2, 0, "th", 15)(2, InventoryListComponent_ng_container_60_td_2_Template, 7, 0, "td", 16);
    \u0275\u0275elementContainerEnd();
  }
}
function InventoryListComponent_tr_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 49);
  }
}
function InventoryListComponent_tr_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 50);
  }
}
function InventoryListComponent_div_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.items.length === 0 ? "Loading devices..." : "No devices found matching your filters.", " ");
  }
}
function InventoryListComponent_mat_paginator_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-paginator", 52);
    \u0275\u0275listener("page", function InventoryListComponent_mat_paginator_64_Template_mat_paginator_page_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPageChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("length", ctx_r0.filteredItems.length)("pageSize", ctx_r0.pageSize)("pageIndex", ctx_r0.pageIndex)("pageSizeOptions", \u0275\u0275pureFunction0(4, _c02));
  }
}
var InventoryListComponent = class _InventoryListComponent {
  inventory;
  router;
  auth;
  items = [];
  filteredItems = [];
  paginatedItems = [];
  query = "";
  selectedLocation = "";
  selectedType = "";
  selectedStatus = "";
  isAdmin = false;
  displayedColumns = [];
  // Pagination
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];
  // Device types based on your backend data
  deviceTypes = ["ANPR", "RLVD", "PTZ", "FIXED", "ANALYTICAL"];
  // Status options from your backend data
  statuses = ["Installed", "Active", "Inactive", "Maintenance"];
  constructor(inventory, router, auth) {
    this.inventory = inventory;
    this.router = router;
    this.auth = auth;
  }
  ngOnInit() {
    this.loadInventory();
    this.isAdmin = this.auth.isAdmin();
    this.setDisplayedColumns();
  }
  loadInventory() {
    this.inventory.getAll().subscribe({
      next: (data) => {
        this.items = data || [];
        this.applyFilters();
      },
      error: (error) => {
        console.error("Error loading inventory:", error);
        this.items = [];
        this.filteredItems = [];
        this.updatePaginatedItems();
      }
    });
  }
  setDisplayedColumns() {
    const baseColumns = [
      "locationName",
      "serialNumber",
      "deviceType",
      "status",
      "poles",
      "ecbPresent",
      "approachRoad",
      "coordinates"
    ];
    if (this.isAdmin) {
      this.displayedColumns = [...baseColumns, "actions"];
    } else {
      this.displayedColumns = baseColumns;
    }
  }
  onFilterChange() {
    this.applyFilters();
  }
  resetFilters() {
    this.query = "";
    this.selectedLocation = "";
    this.selectedType = "";
    this.selectedStatus = "";
    this.pageIndex = 0;
    this.applyFilters();
  }
  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedItems();
  }
  /** Apply Filters */
  applyFilters() {
    const q = (this.query || "").toLowerCase().trim();
    this.filteredItems = this.items.filter((item) => {
      const matchesQuery = !q || (item.locationName?.toLowerCase().includes(q) ?? false) || (item.serialNumber?.toLowerCase().includes(q) ?? false) || (item.approachRoad?.toLowerCase().includes(q) ?? false);
      const matchesLocation = !this.selectedLocation || item.locationName === this.selectedLocation;
      const matchesType = !this.selectedType || item.deviceType === this.selectedType;
      const matchesStatus = !this.selectedStatus || item.status === this.selectedStatus;
      return matchesQuery && matchesLocation && matchesType && matchesStatus;
    });
    this.pageIndex = 0;
    this.updatePaginatedItems();
  }
  updatePaginatedItems() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex);
  }
  /** Unique Locations */
  get locations() {
    const locations = this.items.map((i) => i.locationName).filter((loc) => Boolean(loc && loc.trim()));
    return Array.from(new Set(locations)).sort();
  }
  edit(id) {
    if (id) {
      this.router.navigate(["/admin/items", id, "edit"]);
    }
  }
  viewHistory(id) {
    if (id) {
      this.router.navigate(["/devices", id, "history"]);
    }
  }
  /** Count active devices */
  getActiveDevicesCount() {
    return this.items.filter((device) => device.status?.toLowerCase() === "active" || device.status?.toLowerCase() === "installed").length;
  }
  /** Count devices with poles */
  getPolesCount() {
    return this.items.filter((device) => device.poles).length;
  }
  /** Count devices with ECB present */
  getECBCount() {
    return this.items.filter((device) => device.ecbPresent).length;
  }
  static \u0275fac = function InventoryListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventoryListComponent)(\u0275\u0275directiveInject(InventoryService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InventoryListComponent, selectors: [["app-inventory-list"]], decls: 65, vars: 14, consts: [["noCoords", ""], [1, "page-container"], ["class", "summary-cards", 4, "ngIf"], [1, "inventory-card", "mat-elevation-z4"], [1, "filters-container"], [1, "filters"], ["appearance", "fill", 1, "filter-field"], ["matInput", "", "placeholder", "Search location or serial", 3, "ngModelChange", "input", "ngModel"], [3, "ngModelChange", "selectionChange", "ngModel"], ["value", "", 1, "options-select"], ["class", "options-select", 3, "value", 4, "ngFor", "ngForOf"], ["mat-raised-button", "", 1, "reset-btn", 3, "click"], [1, "table-full-container"], ["mat-table", "", 1, "full-width-table", 3, "dataSource"], ["matColumnDef", "locationName"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "serialNumber"], ["matColumnDef", "deviceType"], ["matColumnDef", "status"], ["matColumnDef", "poles"], ["matColumnDef", "ecbPresent"], ["matColumnDef", "approachRoad"], ["matColumnDef", "coordinates"], ["mat-cell", "", "class", "coordinates-cell", 4, "matCellDef"], ["matColumnDef", "actions", 4, "ngIf"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "no-items", 4, "ngIf"], ["showFirstLastButtons", "", "class", "paginator", 3, "length", "pageSize", "pageIndex", "pageSizeOptions", "page", 4, "ngIf"], [1, "summary-cards"], [1, "summary-card", "total-card"], [1, "summary-content"], [1, "summary-icon"], [1, "summary-text"], [1, "summary-number"], [1, "summary-label"], [1, "summary-card", "active-card"], [1, "summary-card", "poles-card"], [1, "summary-card", "ecb-card"], [1, "options-select", 3, "value"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-cell", "", 1, "coordinates-cell"], [4, "ngIf", "ngIfElse"], [1, "no-data"], ["matColumnDef", "actions"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Edit", 3, "click"], ["mat-icon-button", "", "color", "primary", "matTooltip", "View History", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-items"], ["showFirstLastButtons", "", 1, "paginator", 3, "page", "length", "pageSize", "pageIndex", "pageSizeOptions"]], template: function InventoryListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275template(1, InventoryListComponent_div_1_Template, 41, 4, "div", 2);
      \u0275\u0275elementStart(2, "mat-card", 3)(3, "h2");
      \u0275\u0275text(4, "Device Inventory");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "mat-form-field", 6)(8, "mat-label");
      \u0275\u0275text(9, "Search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function InventoryListComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.query, $event) || (ctx.query = $event);
        return $event;
      });
      \u0275\u0275listener("input", function InventoryListComponent_Template_input_input_10_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-form-field", 6)(12, "mat-label");
      \u0275\u0275text(13, "Location");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "mat-select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function InventoryListComponent_Template_mat_select_ngModelChange_14_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedLocation, $event) || (ctx.selectedLocation = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function InventoryListComponent_Template_mat_select_selectionChange_14_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(15, "mat-option", 9);
      \u0275\u0275text(16, "All Locations");
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, InventoryListComponent_mat_option_17_Template, 2, 2, "mat-option", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "mat-form-field", 6)(19, "mat-label");
      \u0275\u0275text(20, "Device Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function InventoryListComponent_Template_mat_select_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedType, $event) || (ctx.selectedType = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function InventoryListComponent_Template_mat_select_selectionChange_21_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(22, "mat-option", 9);
      \u0275\u0275text(23, "All Types");
      \u0275\u0275elementEnd();
      \u0275\u0275template(24, InventoryListComponent_mat_option_24_Template, 2, 2, "mat-option", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "mat-form-field", 6)(26, "mat-label");
      \u0275\u0275text(27, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function InventoryListComponent_Template_mat_select_ngModelChange_28_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedStatus, $event) || (ctx.selectedStatus = $event);
        return $event;
      });
      \u0275\u0275listener("selectionChange", function InventoryListComponent_Template_mat_select_selectionChange_28_listener() {
        return ctx.onFilterChange();
      });
      \u0275\u0275elementStart(29, "mat-option", 9);
      \u0275\u0275text(30, "All Status");
      \u0275\u0275elementEnd();
      \u0275\u0275template(31, InventoryListComponent_mat_option_31_Template, 2, 2, "mat-option", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "button", 11);
      \u0275\u0275listener("click", function InventoryListComponent_Template_button_click_32_listener() {
        return ctx.resetFilters();
      });
      \u0275\u0275text(33, " Reset Filters ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(34, "div", 12)(35, "table", 13);
      \u0275\u0275elementContainerStart(36, 14);
      \u0275\u0275template(37, InventoryListComponent_th_37_Template, 2, 0, "th", 15)(38, InventoryListComponent_td_38_Template, 2, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(39, 17);
      \u0275\u0275template(40, InventoryListComponent_th_40_Template, 2, 0, "th", 15)(41, InventoryListComponent_td_41_Template, 2, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(42, 18);
      \u0275\u0275template(43, InventoryListComponent_th_43_Template, 2, 0, "th", 15)(44, InventoryListComponent_td_44_Template, 2, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(45, 19);
      \u0275\u0275template(46, InventoryListComponent_th_46_Template, 2, 0, "th", 15)(47, InventoryListComponent_td_47_Template, 3, 3, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(48, 20);
      \u0275\u0275template(49, InventoryListComponent_th_49_Template, 2, 0, "th", 15)(50, InventoryListComponent_td_50_Template, 2, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(51, 21);
      \u0275\u0275template(52, InventoryListComponent_th_52_Template, 2, 0, "th", 15)(53, InventoryListComponent_td_53_Template, 2, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(54, 22);
      \u0275\u0275template(55, InventoryListComponent_th_55_Template, 2, 0, "th", 15)(56, InventoryListComponent_td_56_Template, 2, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(57, 23);
      \u0275\u0275template(58, InventoryListComponent_th_58_Template, 2, 0, "th", 15)(59, InventoryListComponent_td_59_Template, 4, 2, "td", 24);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(60, InventoryListComponent_ng_container_60_Template, 3, 0, "ng-container", 25)(61, InventoryListComponent_tr_61_Template, 1, 0, "tr", 26)(62, InventoryListComponent_tr_62_Template, 1, 0, "tr", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275template(63, InventoryListComponent_div_63_Template, 2, 1, "div", 28);
      \u0275\u0275elementEnd();
      \u0275\u0275template(64, InventoryListComponent_mat_paginator_64_Template, 1, 5, "mat-paginator", 29);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.items.length > 0);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.query);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedLocation);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.locations);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedType);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.deviceTypes);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedStatus);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.statuses);
      \u0275\u0275advance(4);
      \u0275\u0275property("dataSource", ctx.paginatedItems);
      \u0275\u0275advance(25);
      \u0275\u0275property("ngIf", ctx.isAdmin);
      \u0275\u0275advance();
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredItems.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredItems.length > 0);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
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
    MatInputModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatFormFieldModule,
    MatIconModule,
    MatIcon,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatAutocompleteModule,
    MatOptionModule,
    MatPaginatorModule,
    MatPaginator,
    DecimalPipe
  ], styles: ["\n\n.page-container[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 20px;\n  background: #f5f5f5;\n  min-height: 100vh;\n  box-sizing: border-box;\n}\n.inventory-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  width: 100%;\n  border-radius: 8px;\n  box-sizing: border-box;\n}\n.summary-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  transition: transform 0.2s ease;\n}\n.summary-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.summary-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.options-select[_ngcontent-%COMP%] {\n  text-color: #6610f2;\n  font-weight: 500;\n  background-color: #f8f9fa !important;\n}\n.summary-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.summary-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.summary-number[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  line-height: 1;\n}\n.summary-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #f0f0f0;\n}\n.total-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #2196F3,\n      #1976D2);\n  color: white;\n}\n.active-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4CAF50,\n      #388E3C);\n  color: white;\n}\n.poles-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #FF9800,\n      #F57C00);\n  color: white;\n}\n.ecb-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #9C27B0,\n      #7B1FA2);\n  color: white;\n}\nh2[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  font-weight: 600;\n  color: #3f51b5;\n  text-align: center;\n}\n.filters-container[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 20px;\n  border: 1px solid #e0e0e0;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  align-items: center;\n}\n.filter-field[_ngcontent-%COMP%] {\n  min-width: 200px;\n  flex: 1;\n}\n  .filters-container .mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: #f5f5f5 !important;\n  border-radius: 4px !important;\n  border: 1px solid #e0e0e0 !important;\n}\n  .filters-container .mat-form-field-appearance-fill .mat-form-field-underline {\n  display: none !important;\n}\n  .filters-container .mat-select-value {\n  background-color: #f5f5f5 !important;\n}\n  .filters-container .mat-form-field-infix {\n  background-color: #f5f5f5 !important;\n}\n  .filters-container input {\n  background-color: #f5f5f5 !important;\n}\n  .mat-select-panel {\n  background: white !important;\n  border: 2px solid #ccc !important;\n}\n  .mat-option {\n  background: white !important;\n}\n  .mat-option:hover:not(.mat-option-disabled) {\n  background: #f0f0f0 !important;\n}\n  .mat-option.mat-selected {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n}\n.reset-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ef5350,\n      #e53935);\n  color: white;\n  font-weight: 600;\n  border-radius: 8px;\n  padding: 0 16px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  height: 48px;\n  transition: all 0.3s ease;\n  box-shadow: 0 3px 8px rgba(244, 67, 54, 0.25);\n  white-space: nowrap;\n  margin-top: 4px;\n}\n.reset-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  background:\n    linear-gradient(\n      135deg,\n      #e53935,\n      #d32f2f);\n}\n.table-full-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 600px;\n  overflow-y: auto;\n  overflow-x: auto;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid #e0e0e0;\n  margin-bottom: 16px;\n}\n.full-width-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 100%;\n  border-spacing: 0;\n  border-collapse: collapse;\n}\nth.mat-header-cell[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  background: #5687b8;\n  font-weight: 600;\n  font-size: 14px;\n  color: #fff;\n  text-transform: uppercase;\n  border-bottom: 2px solid #e0e0e0;\n  z-index: 1;\n  padding: 12px 8px;\n  white-space: nowrap;\n}\ntd.mat-cell[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #333;\n  border-bottom: 1px solid #eaeaea;\n  padding: 12px 8px;\n  white-space: nowrap;\n}\ntr[_ngcontent-%COMP%]:hover {\n  background-color: #e3f2fd;\n  transition: background-color 0.2s ease;\n}\n.no-items[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #777;\n  padding: 40px 20px;\n  font-size: 16px;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: capitalize;\n}\n.status-active[_ngcontent-%COMP%], \n.status-installed[_ngcontent-%COMP%] {\n  background: #e8f5e8;\n  color: #2e7d32;\n}\n.status-inactive[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.status-maintenance[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #ef6c00;\n}\n.status-unknown[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  color: #666;\n}\n.paginator[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  background: #fafafa;\n  border: 1px solid #e0e0e0;\n  width: 100%;\n}\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .filters[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .filter-field[_ngcontent-%COMP%] {\n    min-width: auto;\n    width: 100%;\n  }\n  .reset-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  th.mat-header-cell[_ngcontent-%COMP%], \n   td.mat-cell[_ngcontent-%COMP%] {\n    padding: 8px 4px;\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .summary-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .table-full-container[_ngcontent-%COMP%] {\n    max-height: 500px;\n  }\n}\n/*# sourceMappingURL=inventory-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventoryListComponent, [{
    type: Component,
    args: [{ standalone: true, selector: "app-inventory-list", imports: [
      CommonModule,
      FormsModule,
      MatTableModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatFormFieldModule,
      MatIconModule,
      MatCardModule,
      MatAutocompleteModule,
      MatOptionModule,
      MatPaginatorModule
    ], template: `
    <div class="page-container">
      <div class="summary-cards" *ngIf="items.length > 0">
        <mat-card class="summary-card total-card">
          <mat-card-content>
            <div class="summary-content">
              <mat-icon class="summary-icon">devices</mat-icon>
              <div class="summary-text">
                <div class="summary-number">{{ items.length }}</div>
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

      <mat-card class="inventory-card mat-elevation-z4">
        <h2>Device Inventory</h2>

        <!-- \u{1F50D} Filters -->
        <div class="filters-container">
          <div class="filters">
            <!-- Search by location name or serial -->
            <mat-form-field appearance="fill" class="filter-field">
              <mat-label>Search</mat-label>
              <input
                matInput
                placeholder="Search location or serial"
                [(ngModel)]="query"
                (input)="onFilterChange()"
              />
            </mat-form-field>

            <!-- Filter by Location -->
            <mat-form-field appearance="fill" class="filter-field">
              <mat-label>Location</mat-label>
              <mat-select [(ngModel)]="selectedLocation" (selectionChange)="onFilterChange()">
                <mat-option value="" class="options-select">All Locations</mat-option>
                <mat-option class="options-select" *ngFor="let loc of locations" [value]="loc">
                  {{ loc }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Filter by Device Type -->
            <mat-form-field appearance="fill" class="filter-field">
              <mat-label>Device Type</mat-label>
              <mat-select [(ngModel)]="selectedType" (selectionChange)="onFilterChange()">
                <mat-option value="" class="options-select">All Types</mat-option>
                <mat-option class="options-select" *ngFor="let type of deviceTypes" [value]="type">
                  {{ type }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Filter by Status -->
            <mat-form-field appearance="fill" class="filter-field">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="selectedStatus" (selectionChange)="onFilterChange()">
                <mat-option value="" class="options-select">All Status</mat-option>
                <mat-option class="options-select" *ngFor="let status of statuses" [value]="status">
                  {{ status }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- \u{1F9F9} Reset Filters -->
            <button mat-raised-button class="reset-btn" (click)="resetFilters()">
              Reset Filters
            </button>
          </div>
        </div>

        <!-- \u{1F9FE} Table -->
        <div class="table-full-container">
          <table mat-table [dataSource]="paginatedItems" class="full-width-table">

            <!-- Location Name -->
            <ng-container matColumnDef="locationName">
              <th mat-header-cell *matHeaderCellDef>Location Name</th>
              <td mat-cell *matCellDef="let item">{{ item.locationName || 'N/A' }}</td>
            </ng-container>

            <!-- Serial Number -->
            <ng-container matColumnDef="serialNumber">
              <th mat-header-cell *matHeaderCellDef>Serial No.</th>
              <td mat-cell *matCellDef="let item">{{ item.serialNumber || 'N/A' }}</td>
            </ng-container>

            <!-- Device Type -->
            <ng-container matColumnDef="deviceType">
              <th mat-header-cell *matHeaderCellDef>Device Type</th>
              <td mat-cell *matCellDef="let item">{{ item.deviceType || 'N/A' }}</td>
            </ng-container>

            <!-- Status -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let item">
                <span [class]="'status-badge status-' + (item.status?.toLowerCase() || 'unknown')">
                  {{ item.status || 'Unknown' }}
                </span>
              </td>
            </ng-container>

            <!-- Poles -->
            <ng-container matColumnDef="poles">
              <th mat-header-cell *matHeaderCellDef>Poles</th>
              <td mat-cell *matCellDef="let item">
                {{ item.poles ? 'Yes' : 'No' }}
              </td>
            </ng-container>

            <!-- ECB Present -->
            <ng-container matColumnDef="ecbPresent">
              <th mat-header-cell *matHeaderCellDef>ECB Present</th>
              <td mat-cell *matCellDef="let item">
                {{ item.ecbPresent ? 'Yes' : 'No' }}
              </td>
            </ng-container>

            <!-- Approach Road -->
            <ng-container matColumnDef="approachRoad">
              <th mat-header-cell *matHeaderCellDef>Approach Road</th>
              <td mat-cell *matCellDef="let item">{{ item.approachRoad || 'N/A' }}</td>
            </ng-container>

            <!-- Coordinates -->
          <ng-container matColumnDef="coordinates">
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

            <!-- Actions (only for admin) -->
            <ng-container *ngIf="isAdmin" matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let item">
                <button mat-icon-button color="accent" (click)="edit(item.id)" matTooltip="Edit">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="primary" (click)="viewHistory(item.id)" matTooltip="View History">
                  <mat-icon>history</mat-icon>
                </button>
              </td>
            </ng-container>

            <!-- Header + Rows -->
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>

          <div *ngIf="filteredItems.length === 0" class="no-items">
            {{ items.length === 0 ? 'Loading devices...' : 'No devices found matching your filters.' }}
          </div>
        </div>

        <!-- Pagination -->
        <mat-paginator
          *ngIf="filteredItems.length > 0"
          [length]="filteredItems.length"
          [pageSize]="pageSize"
          [pageIndex]="pageIndex"
          [pageSizeOptions]="[10, 25, 50, 100]"
          (page)="onPageChange($event)"
          showFirstLastButtons
          class="paginator">
        </mat-paginator>
      </mat-card>
    </div>
  `, styles: ["/* angular:styles/component:scss;2c932b72427fc784abf392cd354bd6cc21b5a36c0042c69c06968fa669c3a1f0;C:/Users/Administrator/Documents/GitHub/iccc-smart-dashboard/src/app/components/inventory/inventory-list/inventory-list.component.ts */\n.page-container {\n  width: 100%;\n  padding: 20px;\n  background: #f5f5f5;\n  min-height: 100vh;\n  box-sizing: border-box;\n}\n.inventory-card {\n  padding: 20px;\n  width: 100%;\n  border-radius: 8px;\n  box-sizing: border-box;\n}\n.summary-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.summary-card {\n  border-radius: 8px;\n  transition: transform 0.2s ease;\n}\n.summary-card:hover {\n  transform: translateY(-2px);\n}\n.summary-content {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.options-select {\n  text-color: #6610f2;\n  font-weight: 500;\n  background-color: #f8f9fa !important;\n}\n.summary-icon {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.summary-text {\n  display: flex;\n  flex-direction: column;\n}\n.summary-number {\n  font-size: 24px;\n  font-weight: bold;\n  line-height: 1;\n}\n.summary-label {\n  font-size: 14px;\n  color: #f0f0f0;\n}\n.total-card {\n  background:\n    linear-gradient(\n      135deg,\n      #2196F3,\n      #1976D2);\n  color: white;\n}\n.active-card {\n  background:\n    linear-gradient(\n      135deg,\n      #4CAF50,\n      #388E3C);\n  color: white;\n}\n.poles-card {\n  background:\n    linear-gradient(\n      135deg,\n      #FF9800,\n      #F57C00);\n  color: white;\n}\n.ecb-card {\n  background:\n    linear-gradient(\n      135deg,\n      #9C27B0,\n      #7B1FA2);\n  color: white;\n}\nh2 {\n  margin-bottom: 20px;\n  font-weight: 600;\n  color: #3f51b5;\n  text-align: center;\n}\n.filters-container {\n  background: #ffffff;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 20px;\n  border: 1px solid #e0e0e0;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  align-items: center;\n}\n.filter-field {\n  min-width: 200px;\n  flex: 1;\n}\n::ng-deep .filters-container .mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: #f5f5f5 !important;\n  border-radius: 4px !important;\n  border: 1px solid #e0e0e0 !important;\n}\n::ng-deep .filters-container .mat-form-field-appearance-fill .mat-form-field-underline {\n  display: none !important;\n}\n::ng-deep .filters-container .mat-select-value {\n  background-color: #f5f5f5 !important;\n}\n::ng-deep .filters-container .mat-form-field-infix {\n  background-color: #f5f5f5 !important;\n}\n::ng-deep .filters-container input {\n  background-color: #f5f5f5 !important;\n}\n::ng-deep .mat-select-panel {\n  background: white !important;\n  border: 2px solid #ccc !important;\n}\n::ng-deep .mat-option {\n  background: white !important;\n}\n::ng-deep .mat-option:hover:not(.mat-option-disabled) {\n  background: #f0f0f0 !important;\n}\n::ng-deep .mat-option.mat-selected {\n  background: #e3f2fd !important;\n  color: #1976d2 !important;\n}\n.reset-btn {\n  background:\n    linear-gradient(\n      135deg,\n      #ef5350,\n      #e53935);\n  color: white;\n  font-weight: 600;\n  border-radius: 8px;\n  padding: 0 16px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  height: 48px;\n  transition: all 0.3s ease;\n  box-shadow: 0 3px 8px rgba(244, 67, 54, 0.25);\n  white-space: nowrap;\n  margin-top: 4px;\n}\n.reset-btn:hover {\n  transform: translateY(-2px);\n  background:\n    linear-gradient(\n      135deg,\n      #e53935,\n      #d32f2f);\n}\n.table-full-container {\n  width: 100%;\n  max-height: 600px;\n  overflow-y: auto;\n  overflow-x: auto;\n  border-radius: 8px;\n  background: #fff;\n  border: 1px solid #e0e0e0;\n  margin-bottom: 16px;\n}\n.full-width-table {\n  width: 100%;\n  min-width: 100%;\n  border-spacing: 0;\n  border-collapse: collapse;\n}\nth.mat-header-cell {\n  position: sticky;\n  top: 0;\n  background: #5687b8;\n  font-weight: 600;\n  font-size: 14px;\n  color: #fff;\n  text-transform: uppercase;\n  border-bottom: 2px solid #e0e0e0;\n  z-index: 1;\n  padding: 12px 8px;\n  white-space: nowrap;\n}\ntd.mat-cell {\n  font-size: 14px;\n  color: #333;\n  border-bottom: 1px solid #eaeaea;\n  padding: 12px 8px;\n  white-space: nowrap;\n}\ntr:hover {\n  background-color: #e3f2fd;\n  transition: background-color 0.2s ease;\n}\n.no-items {\n  text-align: center;\n  color: #777;\n  padding: 40px 20px;\n  font-size: 16px;\n}\n.status-badge {\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-transform: capitalize;\n}\n.status-active,\n.status-installed {\n  background: #e8f5e8;\n  color: #2e7d32;\n}\n.status-inactive {\n  background: #ffebee;\n  color: #c62828;\n}\n.status-maintenance {\n  background: #fff3e0;\n  color: #ef6c00;\n}\n.status-unknown {\n  background: #f5f5f5;\n  color: #666;\n}\n.paginator {\n  border-radius: 8px;\n  background: #fafafa;\n  border: 1px solid #e0e0e0;\n  width: 100%;\n}\n@media (max-width: 768px) {\n  .page-container {\n    padding: 15px;\n  }\n  .summary-cards {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .filters {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .filter-field {\n    min-width: auto;\n    width: 100%;\n  }\n  .reset-btn {\n    width: 100%;\n    justify-content: center;\n  }\n  th.mat-header-cell,\n  td.mat-cell {\n    padding: 8px 4px;\n    font-size: 12px;\n  }\n}\n@media (max-width: 480px) {\n  .summary-cards {\n    grid-template-columns: 1fr;\n  }\n  .table-full-container {\n    max-height: 500px;\n  }\n}\n/*# sourceMappingURL=inventory-list.component.css.map */\n"] }]
  }], () => [{ type: InventoryService }, { type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InventoryListComponent, { className: "InventoryListComponent", filePath: "src/app/components/inventory/inventory-list/inventory-list.component.ts", lineNumber: 558 });
})();
export {
  InventoryListComponent
};
//# sourceMappingURL=chunk-DQBJXNHA.js.map
