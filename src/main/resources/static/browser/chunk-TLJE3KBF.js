import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-GZFZG7RZ.js";
import {
  SmcService
} from "./chunk-C2E4MYPM.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-CDHLY53M.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-NUGY3VFH.js";
import {
  MatNativeDateModule
} from "./chunk-I2GMTQVL.js";
import "./chunk-LDVFDARF.js";
import "./chunk-FHWKHDJD.js";
import {
  MatOptgroup,
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
  MatButton,
  MatButtonModule,
  MatIconButton,
  _IdGenerator
} from "./chunk-NNMEMFZC.js";
import "./chunk-W7WDMGEW.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-LZCG3VZ3.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-6LIGNQX5.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Output,
  ReplaySubject,
  SkipSelf,
  Subject,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  numberAttribute,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-OXNL7LB6.js";
import "./chunk-TXDUYLVM.js";

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

// src/app/components/admin/chartered-bike-history/chartered-bike-history.component.ts
var _c0 = () => [5, 10, 20, 50];
function CharteredBikeHistoryComponent_mat_card_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 25)(1, "div", 26)(2, "mat-icon");
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 27);
    \u0275\u0275listener("click", function CharteredBikeHistoryComponent_mat_card_7_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.dismissError());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.error);
  }
}
function CharteredBikeHistoryComponent_mat_form_field_21_mat_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const station_r4 = ctx.$implicit;
    \u0275\u0275property("value", station_r4.stationName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", station_r4.stationName, " ");
  }
}
function CharteredBikeHistoryComponent_mat_form_field_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 10)(1, "mat-label");
    \u0275\u0275text(2, "Station");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 28)(4, "mat-optgroup", 29);
    \u0275\u0275template(5, CharteredBikeHistoryComponent_mat_form_field_21_mat_option_5_Template, 2, 2, "mat-option", 30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r2.stationNames);
  }
}
function CharteredBikeHistoryComponent_mat_form_field_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 10)(1, "mat-label");
    \u0275\u0275text(2, "Recent Days");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 32);
    \u0275\u0275elementStart(4, "mat-icon", 33);
    \u0275\u0275text(5, "timer");
    \u0275\u0275elementEnd()();
  }
}
function CharteredBikeHistoryComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "mat-spinner", 35);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading history...");
    \u0275\u0275elementEnd()();
  }
}
function CharteredBikeHistoryComponent_mat_card_47_th_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "Timestamp");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeHistoryComponent_mat_card_47_td_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const record_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatTimestamp(record_r6.timestamp));
  }
}
function CharteredBikeHistoryComponent_mat_card_47_th_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "Available");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeHistoryComponent_mat_card_47_td_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52)(1, "span", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const record_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(record_r7.bikesAvailable);
  }
}
function CharteredBikeHistoryComponent_mat_card_47_th_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "Total");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeHistoryComponent_mat_card_47_td_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const record_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(record_r8.bikesTotal);
  }
}
function CharteredBikeHistoryComponent_mat_card_47_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "Availability %");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeHistoryComponent_mat_card_47_td_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52)(1, "div", 54);
    \u0275\u0275element(2, "div", 55);
    \u0275\u0275elementStart(3, "span", 56);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const record_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r2.getAvailabilityPercentage(record_r9), "%");
    \u0275\u0275property("ngClass", ctx_r2.getAvailabilityPercentage(record_r9) >= 50 ? "good" : "warning");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r2.getAvailabilityPercentage(record_r9), "%");
  }
}
function CharteredBikeHistoryComponent_mat_card_47_th_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1, "Rack Available");
    \u0275\u0275elementEnd();
  }
}
function CharteredBikeHistoryComponent_mat_card_47_td_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const record_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(record_r10.bikeRackAvailable);
  }
}
function CharteredBikeHistoryComponent_mat_card_47_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 57);
  }
}
function CharteredBikeHistoryComponent_mat_card_47_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 58);
  }
}
function CharteredBikeHistoryComponent_mat_card_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 36)(1, "div", 37)(2, "span", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 39)(5, "table", 40);
    \u0275\u0275elementContainerStart(6, 41);
    \u0275\u0275template(7, CharteredBikeHistoryComponent_mat_card_47_th_7_Template, 2, 0, "th", 42)(8, CharteredBikeHistoryComponent_mat_card_47_td_8_Template, 2, 1, "td", 43);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(9, 44);
    \u0275\u0275template(10, CharteredBikeHistoryComponent_mat_card_47_th_10_Template, 2, 0, "th", 42)(11, CharteredBikeHistoryComponent_mat_card_47_td_11_Template, 3, 1, "td", 43);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(12, 45);
    \u0275\u0275template(13, CharteredBikeHistoryComponent_mat_card_47_th_13_Template, 2, 0, "th", 42)(14, CharteredBikeHistoryComponent_mat_card_47_td_14_Template, 2, 1, "td", 43);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(15, 46);
    \u0275\u0275template(16, CharteredBikeHistoryComponent_mat_card_47_th_16_Template, 2, 0, "th", 42)(17, CharteredBikeHistoryComponent_mat_card_47_td_17_Template, 5, 4, "td", 43);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(18, 47);
    \u0275\u0275template(19, CharteredBikeHistoryComponent_mat_card_47_th_19_Template, 2, 0, "th", 42)(20, CharteredBikeHistoryComponent_mat_card_47_td_20_Template, 2, 1, "td", 43);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(21, CharteredBikeHistoryComponent_mat_card_47_tr_21_Template, 1, 0, "tr", 48)(22, CharteredBikeHistoryComponent_mat_card_47_tr_22_Template, 1, 0, "tr", 49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "mat-paginator", 50);
    \u0275\u0275listener("page", function CharteredBikeHistoryComponent_mat_card_47_Template_mat_paginator_page_23_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageChange($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.historyData.length, " total records");
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r2.filteredHistoryData);
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r2.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("length", ctx_r2.historyData.length)("pageSize", ctx_r2.pageSize)("pageSizeOptions", \u0275\u0275pureFunction0(7, _c0));
  }
}
function CharteredBikeHistoryComponent_mat_card_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 59)(1, "div", 60)(2, "mat-icon", 61);
    \u0275\u0275text(3, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "No History Found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Select a station and date range to view historical data.");
    \u0275\u0275elementEnd()()();
  }
}
var CharteredBikeHistoryComponent = class _CharteredBikeHistoryComponent {
  smcService;
  fb;
  historyForm;
  stationNames = [];
  historyData = [];
  filteredHistoryData = [];
  loading = false;
  error = null;
  displayMode = "table";
  pageSize = 10;
  pageIndex = 0;
  displayedColumns = [
    "timestamp",
    "bikesAvailable",
    "bikesTotal",
    "availabilityPercentage",
    "bikeRackAvailable"
  ];
  destroy$ = new Subject();
  constructor(smcService, fb) {
    this.smcService = smcService;
    this.fb = fb;
    this.initializeForm();
  }
  ngOnInit() {
    this.loadStationNames();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  initializeForm() {
    const today = /* @__PURE__ */ new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1e3);
    this.historyForm = this.fb.group({
      stationName: [""],
      startDate: [sevenDaysAgo, Validators.required],
      endDate: [today, Validators.required],
      viewType: ["custom", Validators.required],
      recentDays: [7]
    });
  }
  loadStationNames() {
    this.loading = true;
    this.smcService.getCharteredBikeStationNames().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.stationNames = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading station names:", err);
        this.error = "Failed to load station names. Please try again.";
        this.loading = false;
      }
    });
  }
  loadHistory() {
    if (!this.historyForm.valid) {
      this.error = "Please select a station and date range.";
      return;
    }
    this.loading = true;
    this.error = null;
    const { stationName, startDate, endDate, viewType } = this.historyForm.value;
    const startDateStr = this.formatDate(startDate);
    const endDateStr = this.formatDate(endDate);
    let request$;
    if (viewType === "all") {
      request$ = this.smcService.getCharteredBikeAllHistory(startDateStr, endDateStr);
    } else if (viewType === "recent") {
      const days = this.historyForm.get("recentDays")?.value || 7;
      if (!stationName) {
        this.error = "Please select a station for recent history.";
        this.loading = false;
        return;
      }
      request$ = this.smcService.getCharteredBikeStationRecentHistory(stationName, days);
    } else {
      if (!stationName) {
        this.error = "Please select a station for historical data.";
        this.loading = false;
        return;
      }
      request$ = this.smcService.getCharteredBikeStationHistory(stationName, startDateStr, endDateStr);
    }
    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.historyData = data;
        this.pageIndex = 0;
        this.applyPagination();
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading history:", err);
        this.error = "Failed to load history. Please try again.";
        this.loading = false;
      }
    });
  }
  loadAllHistory() {
    if (!this.historyForm.valid) {
      this.error = "Please select a date range.";
      return;
    }
    this.loading = true;
    this.error = null;
    const { startDate, endDate } = this.historyForm.value;
    const startDateStr = this.formatDate(startDate);
    const endDateStr = this.formatDate(endDate);
    this.smcService.getCharteredBikeAllHistory(startDateStr, endDateStr).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.historyData = data;
        this.pageIndex = 0;
        this.applyPagination();
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading all history:", err);
        this.error = "Failed to load history. Please try again.";
        this.loading = false;
      }
    });
  }
  onViewTypeChange(viewType) {
    if (viewType === "all") {
      this.loadAllHistory();
    }
  }
  applyPagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredHistoryData = this.historyData.slice(startIndex, endIndex);
  }
  onPageChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }
  getAvailabilityPercentage(record) {
    if (record.bikesTotal === 0)
      return 0;
    return Math.round(record.bikesAvailable / record.bikesTotal * 100);
  }
  formatDate(date) {
    if (!date)
      return "";
    return date.toISOString().split("T")[0];
  }
  formatTimestamp(timestamp) {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return timestamp;
    }
  }
  exportToCSV() {
    if (this.historyData.length === 0) {
      this.error = "No data to export.";
      return;
    }
    const headers = ["Timestamp", "Bikes Available", "Total Bikes", "Availability %", "Rack Available"];
    const rows = this.historyData.map((record) => [
      this.formatTimestamp(record.timestamp),
      record.bikesAvailable,
      record.bikesTotal,
      this.getAvailabilityPercentage(record),
      record.bikeRackAvailable
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `chartered-bike-history-${Date.now()}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  dismissError() {
    this.error = null;
  }
  static \u0275fac = function CharteredBikeHistoryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CharteredBikeHistoryComponent)(\u0275\u0275directiveInject(SmcService), \u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CharteredBikeHistoryComponent, selectors: [["app-chartered-bike-history"]], decls: 49, vars: 13, consts: [["startPicker", ""], ["endPicker", ""], [1, "history-container"], [1, "header-card"], [1, "header-content"], [1, "subtitle"], ["class", "error-card", 4, "ngIf"], [1, "filters-card"], [1, "filter-form", 3, "formGroup"], [1, "filter-row"], [1, "filter-field"], ["formControlName", "viewType", 3, "selectionChange"], ["value", "custom"], ["value", "recent"], ["value", "all"], ["class", "filter-field", 4, "ngIf"], ["matInput", "", "formControlName", "startDate", 3, "matDatepicker"], ["matSuffix", "", 3, "for"], ["matInput", "", "formControlName", "endDate", 3, "matDatepicker"], [1, "button-row"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-raised-button", "", "color", "accent", 3, "click", "disabled"], ["class", "loading-container", 4, "ngIf"], ["class", "table-card", 4, "ngIf"], ["class", "empty-card", 4, "ngIf"], [1, "error-card"], [1, "error-content"], ["mat-icon-button", "", 3, "click"], ["formControlName", "stationName"], ["label", "Select a Station"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["matInput", "", "type", "number", "formControlName", "recentDays", "min", "1", "max", "30"], ["matSuffix", ""], [1, "loading-container"], ["diameter", "50"], [1, "table-card"], [1, "table-info"], [1, "record-count"], [1, "table-container"], ["mat-table", "", 1, "history-table", 3, "dataSource"], ["matColumnDef", "timestamp"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "bikesAvailable"], ["matColumnDef", "bikesTotal"], ["matColumnDef", "availabilityPercentage"], ["matColumnDef", "bikeRackAvailable"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "page", "length", "pageSize", "pageSizeOptions"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "bikes-available"], [1, "percentage-bar"], [1, "percentage-fill", 3, "ngClass"], [1, "percentage-text"], ["mat-header-row", ""], ["mat-row", ""], [1, "empty-card"], [1, "empty-content"], [1, "empty-icon"]], template: function CharteredBikeHistoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "mat-card", 3)(2, "div", 4)(3, "h1");
      \u0275\u0275text(4, "Chartered Bike History");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 5);
      \u0275\u0275text(6, "View historical bike availability data over time");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(7, CharteredBikeHistoryComponent_mat_card_7_Template, 9, 1, "mat-card", 6);
      \u0275\u0275elementStart(8, "mat-card", 7)(9, "form", 8)(10, "div", 9)(11, "mat-form-field", 10)(12, "mat-label");
      \u0275\u0275text(13, "View Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "mat-select", 11);
      \u0275\u0275listener("selectionChange", function CharteredBikeHistoryComponent_Template_mat_select_selectionChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onViewTypeChange($event.value));
      });
      \u0275\u0275elementStart(15, "mat-option", 12);
      \u0275\u0275text(16, "Custom Date Range");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-option", 13);
      \u0275\u0275text(18, "Recent (Last N Days)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "mat-option", 14);
      \u0275\u0275text(20, "All Stations");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(21, CharteredBikeHistoryComponent_mat_form_field_21_Template, 6, 1, "mat-form-field", 15)(22, CharteredBikeHistoryComponent_mat_form_field_22_Template, 6, 0, "mat-form-field", 15);
      \u0275\u0275elementStart(23, "mat-form-field", 10)(24, "mat-label");
      \u0275\u0275text(25, "Start Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(26, "input", 16)(27, "mat-datepicker-toggle", 17)(28, "mat-datepicker", null, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "mat-form-field", 10)(31, "mat-label");
      \u0275\u0275text(32, "End Date");
      \u0275\u0275elementEnd();
      \u0275\u0275element(33, "input", 18)(34, "mat-datepicker-toggle", 17)(35, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 19)(38, "button", 20);
      \u0275\u0275listener("click", function CharteredBikeHistoryComponent_Template_button_click_38_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadHistory());
      });
      \u0275\u0275elementStart(39, "mat-icon");
      \u0275\u0275text(40, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275text(41, " Load History ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "button", 21);
      \u0275\u0275listener("click", function CharteredBikeHistoryComponent_Template_button_click_42_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.exportToCSV());
      });
      \u0275\u0275elementStart(43, "mat-icon");
      \u0275\u0275text(44, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(45, " Export CSV ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(46, CharteredBikeHistoryComponent_div_46_Template, 4, 0, "div", 22)(47, CharteredBikeHistoryComponent_mat_card_47_Template, 24, 8, "mat-card", 23)(48, CharteredBikeHistoryComponent_mat_card_48_Template, 8, 0, "mat-card", 24);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_5_0;
      const startPicker_r11 = \u0275\u0275reference(29);
      const endPicker_r12 = \u0275\u0275reference(36);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.historyForm);
      \u0275\u0275advance(12);
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.historyForm.get("viewType")) == null ? null : tmp_4_0.value) !== "all");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.historyForm.get("viewType")) == null ? null : tmp_5_0.value) === "recent");
      \u0275\u0275advance(4);
      \u0275\u0275property("matDatepicker", startPicker_r11);
      \u0275\u0275advance();
      \u0275\u0275property("for", startPicker_r11);
      \u0275\u0275advance(6);
      \u0275\u0275property("matDatepicker", endPicker_r12);
      \u0275\u0275advance();
      \u0275\u0275property("for", endPicker_r12);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.loading || ctx.historyForm.invalid);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.loading || ctx.historyData.length === 0);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredHistoryData.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.historyData.length === 0);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    MinValidator,
    MaxValidator,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName,
    MatButtonModule,
    MatButton,
    MatIconButton,
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
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatIconModule,
    MatIcon,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatOptgroup,
    MatCardModule,
    MatCard,
    MatTooltipModule,
    MatPaginatorModule,
    MatPaginator
  ], styles: ["\n\n.history-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.history-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.history-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n}\n.history-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  font-size: 14px;\n}\n.history-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  background-color: #ffebee;\n  border-left: 4px solid #f44336;\n}\n.history-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #c62828;\n}\n.history-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.history-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.history-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.history-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-form[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.history-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.history-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.history-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.history-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.history-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  gap: 16px;\n}\n.history-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #666;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-info[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  background-color: #f9f9f9;\n  border-bottom: 1px solid #e0e0e0;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-info[_ngcontent-%COMP%]   .record-count[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  font-weight: 600;\n  color: #333;\n  padding: 16px;\n  text-align: left;\n  border-bottom: 2px solid #e0e0e0;\n  font-size: 13px;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  vertical-align: middle;\n  font-size: 14px;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #fafafa;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   .bikes-available[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1976d2;\n  font-size: 16px;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 28px;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%]   .percentage-fill[_ngcontent-%COMP%] {\n  height: 22px;\n  min-width: 50px;\n  border-radius: 4px;\n  transition: width 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 600;\n  font-size: 11px;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%]   .percentage-fill.good[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #4caf50,\n      #66bb6a);\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%]   .percentage-fill.warning[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #ff9800,\n      #ffb74d);\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   .percentage-bar[_ngcontent-%COMP%]   .percentage-text[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n  min-width: 40px;\n  font-size: 12px;\n}\n.history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]     .mat-mdc-paginator {\n  background-color: #f9f9f9;\n  border-top: 1px solid #e0e0e0;\n}\n.history-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.history-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n  margin: 0 auto 16px;\n}\n.history-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #666;\n  margin: 0 0 8px;\n}\n.history-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .history-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .history-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .history-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .history-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .history-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=chartered-bike-history.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CharteredBikeHistoryComponent, [{
    type: Component,
    args: [{ selector: "app-chartered-bike-history", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatTableModule,
      MatProgressSpinnerModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatSelectModule,
      MatCardModule,
      MatTooltipModule,
      MatPaginatorModule
    ], template: `<div class="history-container">\r
  <mat-card class="header-card">\r
    <div class="header-content">\r
      <h1>Chartered Bike History</h1>\r
      <p class="subtitle">View historical bike availability data over time</p>\r
    </div>\r
  </mat-card>\r
\r
  <!-- Error Message -->\r
  <mat-card *ngIf="error" class="error-card">\r
    <div class="error-content">\r
      <mat-icon>error</mat-icon>\r
      <span>{{ error }}</span>\r
      <button mat-icon-button (click)="dismissError()">\r
        <mat-icon>close</mat-icon>\r
      </button>\r
    </div>\r
  </mat-card>\r
\r
  <!-- Filters -->\r
  <mat-card class="filters-card">\r
    <form [formGroup]="historyForm" class="filter-form">\r
      <div class="filter-row">\r
        <mat-form-field class="filter-field">\r
          <mat-label>View Type</mat-label>\r
          <mat-select formControlName="viewType" (selectionChange)="onViewTypeChange($event.value)">\r
            <mat-option value="custom">Custom Date Range</mat-option>\r
            <mat-option value="recent">Recent (Last N Days)</mat-option>\r
            <mat-option value="all">All Stations</mat-option>\r
          </mat-select>\r
        </mat-form-field>\r
\r
        <mat-form-field class="filter-field" *ngIf="historyForm.get('viewType')?.value !== 'all'">\r
          <mat-label>Station</mat-label>\r
          <mat-select formControlName="stationName">\r
            <mat-optgroup label="Select a Station">\r
              <mat-option *ngFor="let station of stationNames" [value]="station.stationName">\r
                {{ station.stationName }}\r
              </mat-option>\r
            </mat-optgroup>\r
          </mat-select>\r
        </mat-form-field>\r
\r
        <mat-form-field class="filter-field" *ngIf="historyForm.get('viewType')?.value === 'recent'">\r
          <mat-label>Recent Days</mat-label>\r
          <input matInput type="number" formControlName="recentDays" min="1" max="30" />\r
          <mat-icon matSuffix>timer</mat-icon>\r
        </mat-form-field>\r
\r
        <mat-form-field class="filter-field">\r
          <mat-label>Start Date</mat-label>\r
          <input matInput [matDatepicker]="startPicker" formControlName="startDate" />\r
          <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>\r
          <mat-datepicker #startPicker></mat-datepicker>\r
        </mat-form-field>\r
\r
        <mat-form-field class="filter-field">\r
          <mat-label>End Date</mat-label>\r
          <input matInput [matDatepicker]="endPicker" formControlName="endDate" />\r
          <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>\r
          <mat-datepicker #endPicker></mat-datepicker>\r
        </mat-form-field>\r
      </div>\r
\r
      <div class="button-row">\r
        <button\r
          mat-raised-button\r
          color="primary"\r
          (click)="loadHistory()"\r
          [disabled]="loading || historyForm.invalid"\r
        >\r
          <mat-icon>search</mat-icon>\r
          Load History\r
        </button>\r
        <button\r
          mat-raised-button\r
          color="accent"\r
          (click)="exportToCSV()"\r
          [disabled]="loading || historyData.length === 0"\r
        >\r
          <mat-icon>download</mat-icon>\r
          Export CSV\r
        </button>\r
      </div>\r
    </form>\r
  </mat-card>\r
\r
  <!-- Loading Spinner -->\r
  <div *ngIf="loading" class="loading-container">\r
    <mat-spinner diameter="50"></mat-spinner>\r
    <p>Loading history...</p>\r
  </div>\r
\r
  <!-- History Table -->\r
  <mat-card *ngIf="!loading && filteredHistoryData.length > 0" class="table-card">\r
    <div class="table-info">\r
      <span class="record-count">{{ historyData.length }} total records</span>\r
    </div>\r
    <div class="table-container">\r
      <table mat-table [dataSource]="filteredHistoryData" class="history-table">\r
        <!-- Timestamp Column -->\r
        <ng-container matColumnDef="timestamp">\r
          <th mat-header-cell *matHeaderCellDef>Timestamp</th>\r
          <td mat-cell *matCellDef="let record">{{ formatTimestamp(record.timestamp) }}</td>\r
        </ng-container>\r
\r
        <!-- Bikes Available Column -->\r
        <ng-container matColumnDef="bikesAvailable">\r
          <th mat-header-cell *matHeaderCellDef>Available</th>\r
          <td mat-cell *matCellDef="let record">\r
            <span class="bikes-available">{{ record.bikesAvailable }}</span>\r
          </td>\r
        </ng-container>\r
\r
        <!-- Total Bikes Column -->\r
        <ng-container matColumnDef="bikesTotal">\r
          <th mat-header-cell *matHeaderCellDef>Total</th>\r
          <td mat-cell *matCellDef="let record">{{ record.bikesTotal }}</td>\r
        </ng-container>\r
\r
        <!-- Availability Percentage Column -->\r
        <ng-container matColumnDef="availabilityPercentage">\r
          <th mat-header-cell *matHeaderCellDef>Availability %</th>\r
          <td mat-cell *matCellDef="let record">\r
            <div class="percentage-bar">\r
              <div\r
                class="percentage-fill"\r
                [style.width.%]="getAvailabilityPercentage(record)"\r
                [ngClass]="getAvailabilityPercentage(record) >= 50 ? 'good' : 'warning'"\r
              ></div>\r
              <span class="percentage-text">{{ getAvailabilityPercentage(record) }}%</span>\r
            </div>\r
          </td>\r
        </ng-container>\r
\r
        <!-- Bike Rack Available Column -->\r
        <ng-container matColumnDef="bikeRackAvailable">\r
          <th mat-header-cell *matHeaderCellDef>Rack Available</th>\r
          <td mat-cell *matCellDef="let record">{{ record.bikeRackAvailable }}</td>\r
        </ng-container>\r
\r
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\r
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>\r
      </table>\r
    </div>\r
\r
    <!-- Pagination -->\r
    <mat-paginator\r
      [length]="historyData.length"\r
      [pageSize]="pageSize"\r
      [pageSizeOptions]="[5, 10, 20, 50]"\r
      (page)="onPageChange($event)"\r
    ></mat-paginator>\r
  </mat-card>\r
\r
  <!-- Empty State -->\r
  <mat-card *ngIf="!loading && historyData.length === 0" class="empty-card">\r
    <div class="empty-content">\r
      <mat-icon class="empty-icon">history</mat-icon>\r
      <h3>No History Found</h3>\r
      <p>Select a station and date range to view historical data.</p>\r
    </div>\r
  </mat-card>\r
</div>\r
`, styles: ["/* src/app/components/admin/chartered-bike-history/chartered-bike-history.component.scss */\n.history-container {\n  padding: 24px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.history-container .header-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.history-container .header-card .header-content h1 {\n  margin: 0 0 8px 0;\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n}\n.history-container .header-card .header-content .subtitle {\n  margin: 0;\n  color: #666;\n  font-size: 14px;\n}\n.history-container .error-card {\n  margin-bottom: 16px;\n  background-color: #ffebee;\n  border-left: 4px solid #f44336;\n}\n.history-container .error-card .error-content {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #c62828;\n}\n.history-container .error-card .error-content mat-icon {\n  color: #f44336;\n}\n.history-container .error-card .error-content button {\n  margin-left: auto;\n}\n.history-container .filters-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.history-container .filters-card .filter-form {\n  padding: 16px;\n}\n.history-container .filters-card .filter-row {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.history-container .filters-card .filter-row .filter-field {\n  width: 100%;\n}\n.history-container .filters-card .button-row {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.history-container .filters-card .button-row button {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.history-container .loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  gap: 16px;\n}\n.history-container .loading-container p {\n  font-size: 16px;\n  color: #666;\n}\n.history-container .table-card {\n  margin-bottom: 24px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.history-container .table-card .table-info {\n  padding: 12px 16px;\n  background-color: #f9f9f9;\n  border-bottom: 1px solid #e0e0e0;\n}\n.history-container .table-card .table-info .record-count {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.history-container .table-card .table-container {\n  overflow-x: auto;\n}\n.history-container .table-card .table-container .history-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.history-container .table-card .table-container .history-table th {\n  background-color: #f5f5f5;\n  font-weight: 600;\n  color: #333;\n  padding: 16px;\n  text-align: left;\n  border-bottom: 2px solid #e0e0e0;\n  font-size: 13px;\n}\n.history-container .table-card .table-container .history-table td {\n  padding: 16px;\n  border-bottom: 1px solid #e0e0e0;\n  vertical-align: middle;\n  font-size: 14px;\n}\n.history-container .table-card .table-container .history-table tr:hover {\n  background-color: #fafafa;\n}\n.history-container .table-card .table-container .history-table .bikes-available {\n  font-weight: 600;\n  color: #1976d2;\n  font-size: 16px;\n}\n.history-container .table-card .table-container .history-table .percentage-bar {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 28px;\n}\n.history-container .table-card .table-container .history-table .percentage-bar .percentage-fill {\n  height: 22px;\n  min-width: 50px;\n  border-radius: 4px;\n  transition: width 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: 600;\n  font-size: 11px;\n}\n.history-container .table-card .table-container .history-table .percentage-bar .percentage-fill.good {\n  background:\n    linear-gradient(\n      90deg,\n      #4caf50,\n      #66bb6a);\n}\n.history-container .table-card .table-container .history-table .percentage-bar .percentage-fill.warning {\n  background:\n    linear-gradient(\n      90deg,\n      #ff9800,\n      #ffb74d);\n}\n.history-container .table-card .table-container .history-table .percentage-bar .percentage-text {\n  font-weight: 600;\n  color: #333;\n  min-width: 40px;\n  font-size: 12px;\n}\n.history-container .table-card ::ng-deep .mat-mdc-paginator {\n  background-color: #f9f9f9;\n  border-top: 1px solid #e0e0e0;\n}\n.history-container .empty-card {\n  text-align: center;\n  padding: 80px 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.history-container .empty-card .empty-content .empty-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n  margin: 0 auto 16px;\n}\n.history-container .empty-card .empty-content h3 {\n  font-size: 20px;\n  color: #666;\n  margin: 0 0 8px;\n}\n.history-container .empty-card .empty-content p {\n  color: #999;\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .history-container {\n    padding: 16px;\n  }\n  .history-container .filters-card .filter-row {\n    grid-template-columns: 1fr;\n  }\n  .history-container .filters-card .button-row button {\n    flex: 1;\n  }\n  .history-container .table-card .table-container .history-table th,\n  .history-container .table-card .table-container .history-table td {\n    padding: 12px;\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=chartered-bike-history.component.css.map */\n"] }]
  }], () => [{ type: SmcService }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CharteredBikeHistoryComponent, { className: "CharteredBikeHistoryComponent", filePath: "src/app/components/admin/chartered-bike-history/chartered-bike-history.component.ts", lineNumber: 43 });
})();
export {
  CharteredBikeHistoryComponent
};
//# sourceMappingURL=chunk-TLJE3KBF.js.map
