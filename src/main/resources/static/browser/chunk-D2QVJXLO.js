import {
  SmcService
} from "./chunk-C2E4MYPM.js";
import {
  MatTooltipModule
} from "./chunk-CDHLY53M.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-NUGY3VFH.js";
import {
  MatLine,
  MatLineModule,
  setLines
} from "./chunk-FHWKHDJD.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-FCQFOFUY.js";
import "./chunk-QWWSWOTY.js";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-A5CP52TD.js";
import {
  Directionality,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIconButton,
  coerceNumberProperty
} from "./chunk-NNMEMFZC.js";
import {
  Router
} from "./chunk-YWEFX6MF.js";
import "./chunk-W7WDMGEW.js";
import {
  FormsModule
} from "./chunk-LZCG3VZ3.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  UpperCasePipe
} from "./chunk-6LIGNQX5.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  InjectionToken,
  Input,
  NgModule,
  Subject,
  ViewEncapsulation,
  inject,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-OXNL7LB6.js";
import "./chunk-TXDUYLVM.js";

// node_modules/@angular/material/fesm2022/public-api.mjs
var TileCoordinator = class {
  /** Tracking array (see class description). */
  tracker;
  /** Index at which the search for the next gap will start. */
  columnIndex = 0;
  /** The current row index. */
  rowIndex = 0;
  /** Gets the total number of rows occupied by tiles */
  get rowCount() {
    return this.rowIndex + 1;
  }
  /**
   * Gets the total span of rows occupied by tiles.
   * Ex: A list with 1 row that contains a tile with rowspan 2 will have a total rowspan of 2.
   */
  get rowspan() {
    const lastRowMax = Math.max(...this.tracker);
    return lastRowMax > 1 ? this.rowCount + lastRowMax - 1 : this.rowCount;
  }
  /** The computed (row, col) position of each tile (the output). */
  positions;
  /**
   * Updates the tile positions.
   * @param numColumns Amount of columns in the grid.
   * @param tiles Tiles to be positioned.
   */
  update(numColumns, tiles) {
    this.columnIndex = 0;
    this.rowIndex = 0;
    this.tracker = new Array(numColumns);
    this.tracker.fill(0, 0, this.tracker.length);
    this.positions = tiles.map((tile) => this._trackTile(tile));
  }
  /** Calculates the row and col position of a tile. */
  _trackTile(tile) {
    const gapStartIndex = this._findMatchingGap(tile.colspan);
    this._markTilePosition(gapStartIndex, tile);
    this.columnIndex = gapStartIndex + tile.colspan;
    return new TilePosition(this.rowIndex, gapStartIndex);
  }
  /** Finds the next available space large enough to fit the tile. */
  _findMatchingGap(tileCols) {
    if (tileCols > this.tracker.length && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`mat-grid-list: tile with colspan ${tileCols} is wider than grid with cols="${this.tracker.length}".`);
    }
    let gapStartIndex = -1;
    let gapEndIndex = -1;
    do {
      if (this.columnIndex + tileCols > this.tracker.length) {
        this._nextRow();
        gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
        gapEndIndex = this._findGapEndIndex(gapStartIndex);
        continue;
      }
      gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
      if (gapStartIndex == -1) {
        this._nextRow();
        gapStartIndex = this.tracker.indexOf(0, this.columnIndex);
        gapEndIndex = this._findGapEndIndex(gapStartIndex);
        continue;
      }
      gapEndIndex = this._findGapEndIndex(gapStartIndex);
      this.columnIndex = gapStartIndex + 1;
    } while (gapEndIndex - gapStartIndex < tileCols || gapEndIndex == 0);
    return Math.max(gapStartIndex, 0);
  }
  /** Move "down" to the next row. */
  _nextRow() {
    this.columnIndex = 0;
    this.rowIndex++;
    for (let i = 0; i < this.tracker.length; i++) {
      this.tracker[i] = Math.max(0, this.tracker[i] - 1);
    }
  }
  /**
   * Finds the end index (exclusive) of a gap given the index from which to start looking.
   * The gap ends when a non-zero value is found.
   */
  _findGapEndIndex(gapStartIndex) {
    for (let i = gapStartIndex + 1; i < this.tracker.length; i++) {
      if (this.tracker[i] != 0) {
        return i;
      }
    }
    return this.tracker.length;
  }
  /** Update the tile tracker to account for the given tile in the given space. */
  _markTilePosition(start, tile) {
    for (let i = 0; i < tile.colspan; i++) {
      this.tracker[start + i] = tile.rowspan;
    }
  }
};
var TilePosition = class {
  row;
  col;
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
};

// node_modules/@angular/material/fesm2022/grid-list.mjs
var _c0 = ["*"];
var _c1 = [[["", "mat-grid-avatar", ""], ["", "matGridAvatar", ""]], [["", "mat-line", ""], ["", "matLine", ""]], "*"];
var _c2 = ["[mat-grid-avatar], [matGridAvatar]", "[mat-line], [matLine]", "*"];
var _c3 = ".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}\n";
var MAT_GRID_LIST = new InjectionToken("MAT_GRID_LIST");
var MatGridTile = class _MatGridTile {
  _element = inject(ElementRef);
  _gridList = inject(MAT_GRID_LIST, {
    optional: true
  });
  _rowspan = 1;
  _colspan = 1;
  constructor() {
  }
  /** Amount of rows that the grid tile takes up. */
  get rowspan() {
    return this._rowspan;
  }
  set rowspan(value) {
    this._rowspan = Math.round(coerceNumberProperty(value));
  }
  /** Amount of columns that the grid tile takes up. */
  get colspan() {
    return this._colspan;
  }
  set colspan(value) {
    this._colspan = Math.round(coerceNumberProperty(value));
  }
  /**
   * Sets the style of the grid-tile element.  Needs to be set manually to avoid
   * "Changed after checked" errors that would occur with HostBinding.
   */
  _setStyle(property, value) {
    this._element.nativeElement.style[property] = value;
  }
  static \u0275fac = function MatGridTile_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatGridTile)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatGridTile,
    selectors: [["mat-grid-tile"]],
    hostAttrs: [1, "mat-grid-tile"],
    hostVars: 2,
    hostBindings: function MatGridTile_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("rowspan", ctx.rowspan)("colspan", ctx.colspan);
      }
    },
    inputs: {
      rowspan: "rowspan",
      colspan: "colspan"
    },
    exportAs: ["matGridTile"],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 0,
    consts: [[1, "mat-grid-tile-content"]],
    template: function MatGridTile_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275projection(1);
        \u0275\u0275domElementEnd();
      }
    },
    styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridTile, [{
    type: Component,
    args: [{
      selector: "mat-grid-tile",
      exportAs: "matGridTile",
      host: {
        "class": "mat-grid-tile",
        // Ensures that the "rowspan" and "colspan" input value is reflected in
        // the DOM. This is needed for the grid-tile harness.
        "[attr.rowspan]": "rowspan",
        "[attr.colspan]": "colspan"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<div class="mat-grid-tile-content">\n  <ng-content></ng-content>\n</div>\n',
      styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}\n"]
    }]
  }], () => [], {
    rowspan: [{
      type: Input
    }],
    colspan: [{
      type: Input
    }]
  });
})();
var MatGridTileText = class _MatGridTileText {
  _element = inject(ElementRef);
  _lines;
  constructor() {
  }
  ngAfterContentInit() {
    setLines(this._lines, this._element);
  }
  static \u0275fac = function MatGridTileText_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatGridTileText)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatGridTileText,
    selectors: [["mat-grid-tile-header"], ["mat-grid-tile-footer"]],
    contentQueries: function MatGridTileText_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatLine, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lines = _t);
      }
    },
    ngContentSelectors: _c2,
    decls: 4,
    vars: 0,
    consts: [[1, "mat-grid-list-text"]],
    template: function MatGridTileText_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c1);
        \u0275\u0275projection(0);
        \u0275\u0275domElementStart(1, "div", 0);
        \u0275\u0275projection(2, 1);
        \u0275\u0275domElementEnd();
        \u0275\u0275projection(3, 2);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridTileText, [{
    type: Component,
    args: [{
      selector: "mat-grid-tile-header, mat-grid-tile-footer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: '<ng-content select="[mat-grid-avatar], [matGridAvatar]"></ng-content>\n<div class="mat-grid-list-text"><ng-content select="[mat-line], [matLine]"></ng-content></div>\n<ng-content></ng-content>\n'
    }]
  }], () => [], {
    _lines: [{
      type: ContentChildren,
      args: [MatLine, {
        descendants: true
      }]
    }]
  });
})();
var MatGridAvatarCssMatStyler = class _MatGridAvatarCssMatStyler {
  static \u0275fac = function MatGridAvatarCssMatStyler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatGridAvatarCssMatStyler)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatGridAvatarCssMatStyler,
    selectors: [["", "mat-grid-avatar", ""], ["", "matGridAvatar", ""]],
    hostAttrs: [1, "mat-grid-avatar"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridAvatarCssMatStyler, [{
    type: Directive,
    args: [{
      selector: "[mat-grid-avatar], [matGridAvatar]",
      host: {
        "class": "mat-grid-avatar"
      }
    }]
  }], null, null);
})();
var MatGridTileHeaderCssMatStyler = class _MatGridTileHeaderCssMatStyler {
  static \u0275fac = function MatGridTileHeaderCssMatStyler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatGridTileHeaderCssMatStyler)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatGridTileHeaderCssMatStyler,
    selectors: [["mat-grid-tile-header"]],
    hostAttrs: [1, "mat-grid-tile-header"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridTileHeaderCssMatStyler, [{
    type: Directive,
    args: [{
      selector: "mat-grid-tile-header",
      host: {
        "class": "mat-grid-tile-header"
      }
    }]
  }], null, null);
})();
var MatGridTileFooterCssMatStyler = class _MatGridTileFooterCssMatStyler {
  static \u0275fac = function MatGridTileFooterCssMatStyler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatGridTileFooterCssMatStyler)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatGridTileFooterCssMatStyler,
    selectors: [["mat-grid-tile-footer"]],
    hostAttrs: [1, "mat-grid-tile-footer"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridTileFooterCssMatStyler, [{
    type: Directive,
    args: [{
      selector: "mat-grid-tile-footer",
      host: {
        "class": "mat-grid-tile-footer"
      }
    }]
  }], null, null);
})();
var cssCalcAllowedValue = /^-?\d+((\.\d+)?[A-Za-z%$]?)+$/;
var TileStyler = class {
  _gutterSize;
  _rows = 0;
  _rowspan = 0;
  _cols;
  _direction;
  /**
   * Adds grid-list layout info once it is available. Cannot be processed in the constructor
   * because these properties haven't been calculated by that point.
   *
   * @param gutterSize Size of the grid's gutter.
   * @param tracker Instance of the TileCoordinator.
   * @param cols Amount of columns in the grid.
   * @param direction Layout direction of the grid.
   */
  init(gutterSize, tracker, cols, direction) {
    this._gutterSize = normalizeUnits(gutterSize);
    this._rows = tracker.rowCount;
    this._rowspan = tracker.rowspan;
    this._cols = cols;
    this._direction = direction;
  }
  /**
   * Computes the amount of space a single 1x1 tile would take up (width or height).
   * Used as a basis for other calculations.
   * @param sizePercent Percent of the total grid-list space that one 1x1 tile would take up.
   * @param gutterFraction Fraction of the gutter size taken up by one 1x1 tile.
   * @return The size of a 1x1 tile as an expression that can be evaluated via CSS calc().
   */
  getBaseTileSize(sizePercent, gutterFraction) {
    return `(${sizePercent}% - (${this._gutterSize} * ${gutterFraction}))`;
  }
  /**
   * Gets The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
   * @param offset Number of tiles that have already been rendered in the row/column.
   * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
   * @return Position of the tile as a CSS calc() expression.
   */
  getTilePosition(baseSize, offset) {
    return offset === 0 ? "0" : calc(`(${baseSize} + ${this._gutterSize}) * ${offset}`);
  }
  /**
   * Gets the actual size of a tile, e.g., width or height, taking rowspan or colspan into account.
   * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
   * @param span The tile's rowspan or colspan.
   * @return Size of the tile as a CSS calc() expression.
   */
  getTileSize(baseSize, span) {
    return `(${baseSize} * ${span}) + (${span - 1} * ${this._gutterSize})`;
  }
  /**
   * Sets the style properties to be applied to a tile for the given row and column index.
   * @param tile Tile to which to apply the styling.
   * @param rowIndex Index of the tile's row.
   * @param colIndex Index of the tile's column.
   */
  setStyle(tile, rowIndex, colIndex) {
    let percentWidthPerTile = 100 / this._cols;
    let gutterWidthFractionPerTile = (this._cols - 1) / this._cols;
    this.setColStyles(tile, colIndex, percentWidthPerTile, gutterWidthFractionPerTile);
    this.setRowStyles(tile, rowIndex, percentWidthPerTile, gutterWidthFractionPerTile);
  }
  /** Sets the horizontal placement of the tile in the list. */
  setColStyles(tile, colIndex, percentWidth, gutterWidth) {
    let baseTileWidth = this.getBaseTileSize(percentWidth, gutterWidth);
    let side = this._direction === "rtl" ? "right" : "left";
    tile._setStyle(side, this.getTilePosition(baseTileWidth, colIndex));
    tile._setStyle("width", calc(this.getTileSize(baseTileWidth, tile.colspan)));
  }
  /**
   * Calculates the total size taken up by gutters across one axis of a list.
   */
  getGutterSpan() {
    return `${this._gutterSize} * (${this._rowspan} - 1)`;
  }
  /**
   * Calculates the total size taken up by tiles across one axis of a list.
   * @param tileHeight Height of the tile.
   */
  getTileSpan(tileHeight) {
    return `${this._rowspan} * ${this.getTileSize(tileHeight, 1)}`;
  }
  /**
   * Calculates the computed height and returns the correct style property to set.
   * This method can be implemented by each type of TileStyler.
   * @docs-private
   */
  getComputedHeight() {
    return null;
  }
};
var FixedTileStyler = class extends TileStyler {
  fixedRowHeight;
  constructor(fixedRowHeight) {
    super();
    this.fixedRowHeight = fixedRowHeight;
  }
  init(gutterSize, tracker, cols, direction) {
    super.init(gutterSize, tracker, cols, direction);
    this.fixedRowHeight = normalizeUnits(this.fixedRowHeight);
    if (!cssCalcAllowedValue.test(this.fixedRowHeight) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`Invalid value "${this.fixedRowHeight}" set as rowHeight.`);
    }
  }
  setRowStyles(tile, rowIndex) {
    tile._setStyle("top", this.getTilePosition(this.fixedRowHeight, rowIndex));
    tile._setStyle("height", calc(this.getTileSize(this.fixedRowHeight, tile.rowspan)));
  }
  getComputedHeight() {
    return ["height", calc(`${this.getTileSpan(this.fixedRowHeight)} + ${this.getGutterSpan()}`)];
  }
  reset(list) {
    list._setListStyle(["height", null]);
    if (list._tiles) {
      list._tiles.forEach((tile) => {
        tile._setStyle("top", null);
        tile._setStyle("height", null);
      });
    }
  }
};
var RatioTileStyler = class extends TileStyler {
  /** Ratio width:height given by user to determine row height. */
  rowHeightRatio;
  baseTileHeight;
  constructor(value) {
    super();
    this._parseRatio(value);
  }
  setRowStyles(tile, rowIndex, percentWidth, gutterWidth) {
    let percentHeightPerTile = percentWidth / this.rowHeightRatio;
    this.baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterWidth);
    tile._setStyle("marginTop", this.getTilePosition(this.baseTileHeight, rowIndex));
    tile._setStyle("paddingTop", calc(this.getTileSize(this.baseTileHeight, tile.rowspan)));
  }
  getComputedHeight() {
    return ["paddingBottom", calc(`${this.getTileSpan(this.baseTileHeight)} + ${this.getGutterSpan()}`)];
  }
  reset(list) {
    list._setListStyle(["paddingBottom", null]);
    list._tiles.forEach((tile) => {
      tile._setStyle("marginTop", null);
      tile._setStyle("paddingTop", null);
    });
  }
  _parseRatio(value) {
    const ratioParts = value.split(":");
    if (ratioParts.length !== 2 && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`mat-grid-list: invalid ratio given for row-height: "${value}"`);
    }
    this.rowHeightRatio = parseFloat(ratioParts[0]) / parseFloat(ratioParts[1]);
  }
};
var FitTileStyler = class extends TileStyler {
  setRowStyles(tile, rowIndex) {
    let percentHeightPerTile = 100 / this._rowspan;
    let gutterHeightPerTile = (this._rows - 1) / this._rows;
    let baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterHeightPerTile);
    tile._setStyle("top", this.getTilePosition(baseTileHeight, rowIndex));
    tile._setStyle("height", calc(this.getTileSize(baseTileHeight, tile.rowspan)));
  }
  reset(list) {
    if (list._tiles) {
      list._tiles.forEach((tile) => {
        tile._setStyle("top", null);
        tile._setStyle("height", null);
      });
    }
  }
};
function calc(exp) {
  return `calc(${exp})`;
}
function normalizeUnits(value) {
  return value.match(/([A-Za-z%]+)$/) ? value : `${value}px`;
}
var MAT_FIT_MODE = "fit";
var MatGridList = class _MatGridList {
  _element = inject(ElementRef);
  _dir = inject(Directionality, {
    optional: true
  });
  /** Number of columns being rendered. */
  _cols;
  /** Used for determining the position of each tile in the grid. */
  _tileCoordinator;
  /**
   * Row height value passed in by user. This can be one of three types:
   * - Number value (ex: "100px"):  sets a fixed row height to that value
   * - Ratio value (ex: "4:3"): sets the row height based on width:height ratio
   * - "Fit" mode (ex: "fit"): sets the row height to total height divided by number of rows
   */
  _rowHeight;
  /** The amount of space between tiles. This will be something like '5px' or '2em'. */
  _gutter = "1px";
  /** Sets position and size styles for a tile */
  _tileStyler;
  /** Query list of tiles that are being rendered. */
  _tiles;
  constructor() {
  }
  /** Amount of columns in the grid list. */
  get cols() {
    return this._cols;
  }
  set cols(value) {
    this._cols = Math.max(1, Math.round(coerceNumberProperty(value)));
  }
  /** Size of the grid list's gutter in pixels. */
  get gutterSize() {
    return this._gutter;
  }
  set gutterSize(value) {
    this._gutter = `${value == null ? "" : value}`;
  }
  /** Set internal representation of row height from the user-provided value. */
  get rowHeight() {
    return this._rowHeight;
  }
  set rowHeight(value) {
    const newValue = `${value == null ? "" : value}`;
    if (newValue !== this._rowHeight) {
      this._rowHeight = newValue;
      this._setTileStyler(this._rowHeight);
    }
  }
  ngOnInit() {
    this._checkCols();
    this._checkRowHeight();
  }
  /**
   * The layout calculation is fairly cheap if nothing changes, so there's little cost
   * to run it frequently.
   */
  ngAfterContentChecked() {
    this._layoutTiles();
  }
  /** Throw a friendly error if cols property is missing */
  _checkCols() {
    if (!this.cols && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`mat-grid-list: must pass in number of columns. Example: <mat-grid-list cols="3">`);
    }
  }
  /** Default to equal width:height if rowHeight property is missing */
  _checkRowHeight() {
    if (!this._rowHeight) {
      this._setTileStyler("1:1");
    }
  }
  /** Creates correct Tile Styler subtype based on rowHeight passed in by user */
  _setTileStyler(rowHeight) {
    if (this._tileStyler) {
      this._tileStyler.reset(this);
    }
    if (rowHeight === MAT_FIT_MODE) {
      this._tileStyler = new FitTileStyler();
    } else if (rowHeight && rowHeight.indexOf(":") > -1) {
      this._tileStyler = new RatioTileStyler(rowHeight);
    } else {
      this._tileStyler = new FixedTileStyler(rowHeight);
    }
  }
  /** Computes and applies the size and position for all children grid tiles. */
  _layoutTiles() {
    if (!this._tileCoordinator) {
      this._tileCoordinator = new TileCoordinator();
    }
    const tracker = this._tileCoordinator;
    const tiles = this._tiles.filter((tile) => !tile._gridList || tile._gridList === this);
    const direction = this._dir ? this._dir.value : "ltr";
    this._tileCoordinator.update(this.cols, tiles);
    this._tileStyler.init(this.gutterSize, tracker, this.cols, direction);
    tiles.forEach((tile, index) => {
      const pos = tracker.positions[index];
      this._tileStyler.setStyle(tile, pos.row, pos.col);
    });
    this._setListStyle(this._tileStyler.getComputedHeight());
  }
  /** Sets style on the main grid-list element, given the style name and value. */
  _setListStyle(style) {
    if (style) {
      this._element.nativeElement.style[style[0]] = style[1];
    }
  }
  static \u0275fac = function MatGridList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatGridList)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatGridList,
    selectors: [["mat-grid-list"]],
    contentQueries: function MatGridList_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatGridTile, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tiles = _t);
      }
    },
    hostAttrs: [1, "mat-grid-list"],
    hostVars: 1,
    hostBindings: function MatGridList_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("cols", ctx.cols);
      }
    },
    inputs: {
      cols: "cols",
      gutterSize: "gutterSize",
      rowHeight: "rowHeight"
    },
    exportAs: ["matGridList"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_GRID_LIST,
      useExisting: _MatGridList
    }])],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 0,
    template: function MatGridList_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domElementStart(0, "div");
        \u0275\u0275projection(1);
        \u0275\u0275domElementEnd();
      }
    },
    styles: [_c3],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridList, [{
    type: Component,
    args: [{
      selector: "mat-grid-list",
      exportAs: "matGridList",
      host: {
        "class": "mat-grid-list",
        // Ensures that the "cols" input value is reflected in the DOM. This is
        // needed for the grid-list harness.
        "[attr.cols]": "cols"
      },
      providers: [{
        provide: MAT_GRID_LIST,
        useExisting: MatGridList
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: "<div>\n  <ng-content></ng-content>\n</div>",
      styles: [".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}\n"]
    }]
  }], () => [], {
    _tiles: [{
      type: ContentChildren,
      args: [MatGridTile, {
        descendants: true
      }]
    }],
    cols: [{
      type: Input
    }],
    gutterSize: [{
      type: Input
    }],
    rowHeight: [{
      type: Input
    }]
  });
})();
var MatGridListModule = class _MatGridListModule {
  static \u0275fac = function MatGridListModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatGridListModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatGridListModule,
    imports: [MatLineModule, MatCommonModule, MatGridList, MatGridTile, MatGridTileText, MatGridTileHeaderCssMatStyler, MatGridTileFooterCssMatStyler, MatGridAvatarCssMatStyler],
    exports: [MatGridList, MatGridTile, MatGridTileText, MatLineModule, MatCommonModule, MatGridTileHeaderCssMatStyler, MatGridTileFooterCssMatStyler, MatGridAvatarCssMatStyler]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatLineModule, MatCommonModule, MatLineModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatGridListModule, [{
    type: NgModule,
    args: [{
      imports: [MatLineModule, MatCommonModule, MatGridList, MatGridTile, MatGridTileText, MatGridTileHeaderCssMatStyler, MatGridTileFooterCssMatStyler, MatGridAvatarCssMatStyler],
      exports: [MatGridList, MatGridTile, MatGridTileText, MatLineModule, MatCommonModule, MatGridTileHeaderCssMatStyler, MatGridTileFooterCssMatStyler, MatGridAvatarCssMatStyler]
    }]
  }], null, null);
})();

// src/app/components/admin/chartered-bike-dashboard/chartered-bike-dashboard.component.ts
function CharteredBikeDashboardComponent_mat_card_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 8)(1, "div", 9)(2, "mat-icon");
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 10);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_mat_card_9_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dismissError());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function CharteredBikeDashboardComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "mat-spinner", 12);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading dashboard data...");
    \u0275\u0275elementEnd()();
  }
}
function CharteredBikeDashboardComponent_div_11_div_124_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "h2");
    \u0275\u0275text(2, "Station Overview");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 37)(4, "p", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Displaying data from ", ctx_r1.stations.length, " stations");
  }
}
function CharteredBikeDashboardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "h2");
    \u0275\u0275text(3, "Key Metrics");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 15)(5, "mat-card", 16)(6, "div", 17)(7, "mat-icon", 18);
    \u0275\u0275text(8, "dashboard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 19)(10, "div", 20);
    \u0275\u0275text(11, "Overall Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 21);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "uppercase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 22);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "mat-card", 23)(18, "div", 17)(19, "mat-icon", 18);
    \u0275\u0275text(20, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 19)(22, "div", 20);
    \u0275\u0275text(23, "Total Stations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 21);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 22);
    \u0275\u0275text(27, "Active locations");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(28, "mat-card", 24)(29, "div", 17)(30, "mat-icon", 18);
    \u0275\u0275text(31, "directions_bike");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 19)(33, "div", 20);
    \u0275\u0275text(34, "Total Bikes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 21);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 22);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(39, "mat-card", 25)(40, "div", 17)(41, "mat-icon", 18);
    \u0275\u0275text(42, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 19)(44, "div", 20);
    \u0275\u0275text(45, "Critical Stations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 21);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 22);
    \u0275\u0275text(49, "<25% Availability");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(50, "mat-card", 26)(51, "div", 17)(52, "mat-icon", 18);
    \u0275\u0275text(53, "percent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 19)(55, "div", 20);
    \u0275\u0275text(56, "Avg Availability");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 21);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 22);
    \u0275\u0275text(60, "Network average");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(61, "mat-card", 27)(62, "div", 17)(63, "mat-icon", 18);
    \u0275\u0275text(64, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 19)(66, "div", 20);
    \u0275\u0275text(67, "Last Sync");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 21);
    \u0275\u0275text(69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "div", 22);
    \u0275\u0275text(71, "Real-time data");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(72, "div", 28)(73, "h2");
    \u0275\u0275text(74, "Quick Access");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "div", 29)(76, "mat-card", 30);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_div_11_Template_mat_card_click_76_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateTo("/chartered-bike/stations"));
    });
    \u0275\u0275elementStart(77, "mat-card-content")(78, "mat-icon", 31);
    \u0275\u0275text(79, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "div", 32);
    \u0275\u0275text(81, "View Stations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "p", 33);
    \u0275\u0275text(83, "Real-time station status and availability");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "button", 34);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_div_11_Template_button_click_84_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(85, " Go to Stations ");
    \u0275\u0275elementStart(86, "mat-icon");
    \u0275\u0275text(87, "arrow_forward");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(88, "mat-card", 30);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_div_11_Template_mat_card_click_88_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateTo("/chartered-bike/history"));
    });
    \u0275\u0275elementStart(89, "mat-card-content")(90, "mat-icon", 31);
    \u0275\u0275text(91, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "div", 32);
    \u0275\u0275text(93, "View History");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "p", 33);
    \u0275\u0275text(95, "Historical data and trends over time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "button", 34);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_div_11_Template_button_click_96_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(97, " Go to History ");
    \u0275\u0275elementStart(98, "mat-icon");
    \u0275\u0275text(99, "arrow_forward");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(100, "mat-card", 30);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_div_11_Template_mat_card_click_100_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateTo("/chartered-bike/statistics"));
    });
    \u0275\u0275elementStart(101, "mat-card-content")(102, "mat-icon", 31);
    \u0275\u0275text(103, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(104, "div", 32);
    \u0275\u0275text(105, "View Statistics");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(106, "p", 33);
    \u0275\u0275text(107, "Min, max, and average statistics");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "button", 34);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_div_11_Template_button_click_108_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(109, " Go to Statistics ");
    \u0275\u0275elementStart(110, "mat-icon");
    \u0275\u0275text(111, "arrow_forward");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(112, "mat-card", 30);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_div_11_Template_mat_card_click_112_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateTo("/chartered-bike/reports"));
    });
    \u0275\u0275elementStart(113, "mat-card-content")(114, "mat-icon", 31);
    \u0275\u0275text(115, "description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(116, "div", 32);
    \u0275\u0275text(117, "View Reports");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(118, "p", 33);
    \u0275\u0275text(119, "Weekly and monthly reports");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "button", 34);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_div_11_Template_button_click_120_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(121, " Go to Reports ");
    \u0275\u0275elementStart(122, "mat-icon");
    \u0275\u0275text(123, "arrow_forward");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275template(124, CharteredBikeDashboardComponent_div_11_div_124_Template, 6, 1, "div", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", "status-" + ctx_r1.getStatusIndicator());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 10, ctx_r1.getStatusIndicator()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.avgAvailability, "% Available");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.totalStations);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.totalBikes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Available: ", ctx_r1.availableBikes);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.criticalStations);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("", ctx_r1.avgAvailability, "%");
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.getFormattedTime(ctx_r1.lastSyncTime));
    \u0275\u0275advance(55);
    \u0275\u0275property("ngIf", ctx_r1.stations.length > 0);
  }
}
function CharteredBikeDashboardComponent_mat_card_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 39)(1, "div", 40)(2, "mat-icon", 41);
    \u0275\u0275text(3, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "No Data Available");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Unable to load dashboard data. Please try refreshing or check your connection.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 34);
    \u0275\u0275listener("click", function CharteredBikeDashboardComponent_mat_card_12_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refreshData());
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Retry ");
    \u0275\u0275elementEnd()()();
  }
}
var CharteredBikeDashboardComponent = class _CharteredBikeDashboardComponent {
  smcService;
  router;
  stations = [];
  loading = false;
  error = null;
  // Statistics
  totalStations = 0;
  totalBikes = 0;
  availableBikes = 0;
  criticalStations = 0;
  avgAvailability = 0;
  lastSyncTime = null;
  destroy$ = new Subject();
  constructor(smcService, router) {
    this.smcService = smcService;
    this.router = router;
  }
  ngOnInit() {
    this.loadDashboardData();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadDashboardData() {
    this.loading = true;
    this.error = null;
    this.smcService.getCharteredBikeStations().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.stations = data;
        this.calculateStatistics();
        this.lastSyncTime = /* @__PURE__ */ new Date();
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading dashboard data:", err);
        this.error = "Failed to load dashboard data. Please try again.";
        this.loading = false;
      }
    });
  }
  calculateStatistics() {
    if (this.stations.length === 0)
      return;
    this.totalStations = this.stations.length;
    this.totalBikes = this.stations.reduce((sum, s) => sum + s.bikesTotal, 0);
    this.availableBikes = this.stations.reduce((sum, s) => sum + s.bikesAvailable, 0);
    this.criticalStations = this.stations.filter((s) => s.bikesTotal > 0 && s.bikesAvailable / s.bikesTotal * 100 < 25).length;
    if (this.totalBikes > 0) {
      this.avgAvailability = Math.round(this.availableBikes / this.totalBikes * 100);
    }
  }
  navigateTo(route) {
    this.router.navigate([route]);
  }
  refreshData() {
    this.loadDashboardData();
  }
  dismissError() {
    this.error = null;
  }
  getStatusIndicator() {
    if (this.avgAvailability >= 60)
      return "good";
    if (this.avgAvailability >= 30)
      return "warning";
    return "critical";
  }
  getFormattedTime(date) {
    if (!date)
      return "Never";
    return date.toLocaleTimeString();
  }
  static \u0275fac = function CharteredBikeDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CharteredBikeDashboardComponent)(\u0275\u0275directiveInject(SmcService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CharteredBikeDashboardComponent, selectors: [["app-chartered-bike-dashboard"]], decls: 13, vars: 5, consts: [[1, "dashboard-container"], [1, "dashboard-header"], [1, "header-actions"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["class", "error-card", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "dashboard-content", 4, "ngIf"], ["class", "empty-card", 4, "ngIf"], [1, "error-card"], [1, "error-content"], ["mat-icon-button", "", 3, "click"], [1, "loading-container"], ["diameter", "50"], [1, "dashboard-content"], [1, "metrics-section"], [1, "metrics-grid"], [1, "metric-card", "status-card", 3, "ngClass"], [1, "metric-content"], [1, "metric-icon"], [1, "metric-info"], [1, "metric-label"], [1, "metric-value"], [1, "metric-detail"], [1, "metric-card", "stations-card"], [1, "metric-card", "bikes-card"], [1, "metric-card", "critical-card"], [1, "metric-card", "availability-card"], [1, "metric-card", "sync-card"], [1, "quick-access-section"], [1, "quick-access-grid"], [1, "quick-access-card", 2, "cursor", "pointer", 3, "click"], [1, "access-icon"], [1, "access-title"], [1, "access-description"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["class", "top-stations-section", 4, "ngIf"], [1, "top-stations-section"], [1, "stations-summary"], [1, "summary-text"], [1, "empty-card"], [1, "empty-content"], [1, "empty-icon"]], template: function CharteredBikeDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3, "Chartered Bike Srinagar Dashboard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "button", 3);
      \u0275\u0275listener("click", function CharteredBikeDashboardComponent_Template_button_click_5_listener() {
        return ctx.refreshData();
      });
      \u0275\u0275elementStart(6, "mat-icon");
      \u0275\u0275text(7, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(8, " Refresh ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(9, CharteredBikeDashboardComponent_mat_card_9_Template, 9, 1, "mat-card", 4)(10, CharteredBikeDashboardComponent_div_10_Template, 4, 0, "div", 5)(11, CharteredBikeDashboardComponent_div_11_Template, 125, 12, "div", 6)(12, CharteredBikeDashboardComponent_mat_card_12_Template, 12, 0, "mat-card", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.stations.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.stations.length === 0);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgIf,
    FormsModule,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatIconModule,
    MatIcon,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatTooltipModule,
    MatGridListModule,
    UpperCasePipe
  ], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 28px;\n  font-weight: 600;\n  color: #333;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  background-color: #ffebee;\n  border-left: 4px solid #f44336;\n}\n.dashboard-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #c62828;\n  padding: 16px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.dashboard-container[_ngcontent-%COMP%]   .error-card[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n.dashboard-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  gap: 16px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #666;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 24px 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #333;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 20px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s, box-shadow 0.2s;\n  cursor: pointer;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-content[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  color: white;\n  flex-shrink: 0;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-content[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-content[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   .metric-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-content[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: #333;\n  line-height: 1;\n  margin-bottom: 4px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-content[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   .metric-detail[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card.status-card.status-good[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50,\n      #388e3c);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card.status-card.status-warning[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800,\n      #f57c00);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card.status-card.status-critical[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336,\n      #d32f2f);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card.stations-card[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #2196f3,\n      #1565c0);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card.bikes-card[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #9c27b0,\n      #6a1b9a);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card.critical-card[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336,\n      #c62828);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card.availability-card[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #00bcd4,\n      #0097a7);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card.sync-card[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ff5722,\n      #d84315);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%] {\n  margin-bottom: 40px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 24px 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #333;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 20px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%]   .quick-access-card[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%]   .quick-access-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%]   .quick-access-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 24px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%]   .quick-access-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .access-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #1976d2;\n  margin: 0 auto 16px;\n  display: block;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%]   .quick-access-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .access-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 8px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%]   .quick-access-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   .access-description[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #666;\n  margin: 0 0 16px 0;\n  line-height: 1.4;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%]   .quick-access-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%]   .quick-access-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .top-stations-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 16px 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #333;\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .top-stations-section[_ngcontent-%COMP%]   .stations-summary[_ngcontent-%COMP%] {\n  background-color: white;\n  padding: 16px 24px;\n  border-radius: 4px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .top-stations-section[_ngcontent-%COMP%]   .stations-summary[_ngcontent-%COMP%]   .summary-text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #666;\n}\n.dashboard-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 80px 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.dashboard-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n  margin: 0 auto 16px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #666;\n  margin: 0 0 8px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n  margin: 0 0 24px;\n}\n.dashboard-container[_ngcontent-%COMP%]   .empty-card[_ngcontent-%COMP%]   .empty-content[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-content[_ngcontent-%COMP%] {\n    padding: 12px;\n    gap: 12px;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-content[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] {\n    width: 50px;\n    height: 50px;\n    font-size: 28px;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .metrics-section[_ngcontent-%COMP%]   .metrics-grid[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%]   .metric-content[_ngcontent-%COMP%]   .metric-info[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .dashboard-container[_ngcontent-%COMP%]   .dashboard-content[_ngcontent-%COMP%]   .quick-access-section[_ngcontent-%COMP%]   .quick-access-grid[_ngcontent-%COMP%]   .quick-access-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    padding: 20px;\n  }\n}\n/*# sourceMappingURL=chartered-bike-dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CharteredBikeDashboardComponent, [{
    type: Component,
    args: [{ selector: "app-chartered-bike-dashboard", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatCardModule,
      MatTooltipModule,
      MatGridListModule
    ], template: `<div class="dashboard-container">\r
  <!-- Header -->\r
  <div class="dashboard-header">\r
    <h1>Chartered Bike Srinagar Dashboard</h1>\r
    <div class="header-actions">\r
      <button mat-raised-button color="primary" (click)="refreshData()" [disabled]="loading">\r
        <mat-icon>refresh</mat-icon>\r
        Refresh\r
      </button>\r
    </div>\r
  </div>\r
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
  <!-- Loading Spinner -->\r
  <div *ngIf="loading" class="loading-container">\r
    <mat-spinner diameter="50"></mat-spinner>\r
    <p>Loading dashboard data...</p>\r
  </div>\r
\r
  <!-- Dashboard Content -->\r
  <div *ngIf="!loading && stations.length > 0" class="dashboard-content">\r
    <!-- Key Metrics -->\r
    <div class="metrics-section">\r
      <h2>Key Metrics</h2>\r
      <div class="metrics-grid">\r
        <!-- Overall Status Card -->\r
        <mat-card class="metric-card status-card" [ngClass]="'status-' + getStatusIndicator()">\r
          <div class="metric-content">\r
            <mat-icon class="metric-icon">dashboard</mat-icon>\r
            <div class="metric-info">\r
              <div class="metric-label">Overall Status</div>\r
              <div class="metric-value">{{ getStatusIndicator() | uppercase }}</div>\r
              <div class="metric-detail">{{ avgAvailability }}% Available</div>\r
            </div>\r
          </div>\r
        </mat-card>\r
\r
        <!-- Total Stations -->\r
        <mat-card class="metric-card stations-card">\r
          <div class="metric-content">\r
            <mat-icon class="metric-icon">location_on</mat-icon>\r
            <div class="metric-info">\r
              <div class="metric-label">Total Stations</div>\r
              <div class="metric-value">{{ totalStations }}</div>\r
              <div class="metric-detail">Active locations</div>\r
            </div>\r
          </div>\r
        </mat-card>\r
\r
        <!-- Total Bikes -->\r
        <mat-card class="metric-card bikes-card">\r
          <div class="metric-content">\r
            <mat-icon class="metric-icon">directions_bike</mat-icon>\r
            <div class="metric-info">\r
              <div class="metric-label">Total Bikes</div>\r
              <div class="metric-value">{{ totalBikes }}</div>\r
              <div class="metric-detail">Available: {{ availableBikes }}</div>\r
            </div>\r
          </div>\r
        </mat-card>\r
\r
        <!-- Critical Stations -->\r
        <mat-card class="metric-card critical-card">\r
          <div class="metric-content">\r
            <mat-icon class="metric-icon">warning</mat-icon>\r
            <div class="metric-info">\r
              <div class="metric-label">Critical Stations</div>\r
              <div class="metric-value">{{ criticalStations }}</div>\r
              <div class="metric-detail">&lt;25% Availability</div>\r
            </div>\r
          </div>\r
        </mat-card>\r
\r
        <!-- Availability Rate -->\r
        <mat-card class="metric-card availability-card">\r
          <div class="metric-content">\r
            <mat-icon class="metric-icon">percent</mat-icon>\r
            <div class="metric-info">\r
              <div class="metric-label">Avg Availability</div>\r
              <div class="metric-value">{{ avgAvailability }}%</div>\r
              <div class="metric-detail">Network average</div>\r
            </div>\r
          </div>\r
        </mat-card>\r
\r
        <!-- Last Sync -->\r
        <mat-card class="metric-card sync-card">\r
          <div class="metric-content">\r
            <mat-icon class="metric-icon">schedule</mat-icon>\r
            <div class="metric-info">\r
              <div class="metric-label">Last Sync</div>\r
              <div class="metric-value">{{ getFormattedTime(lastSyncTime) }}</div>\r
              <div class="metric-detail">Real-time data</div>\r
            </div>\r
          </div>\r
        </mat-card>\r
      </div>\r
    </div>\r
\r
    <!-- Quick Access Section -->\r
    <div class="quick-access-section">\r
      <h2>Quick Access</h2>\r
      <div class="quick-access-grid">\r
        <!-- View Stations -->\r
        <mat-card\r
          class="quick-access-card"\r
          (click)="navigateTo('/chartered-bike/stations')"\r
          style="cursor: pointer;"\r
        >\r
          <mat-card-content>\r
            <mat-icon class="access-icon">location_on</mat-icon>\r
            <div class="access-title">View Stations</div>\r
            <p class="access-description">Real-time station status and availability</p>\r
            <button mat-raised-button color="primary" (click)="$event.stopPropagation()">\r
              Go to Stations\r
              <mat-icon>arrow_forward</mat-icon>\r
            </button>\r
          </mat-card-content>\r
        </mat-card>\r
\r
        <!-- View History -->\r
        <mat-card\r
          class="quick-access-card"\r
          (click)="navigateTo('/chartered-bike/history')"\r
          style="cursor: pointer;"\r
        >\r
          <mat-card-content>\r
            <mat-icon class="access-icon">history</mat-icon>\r
            <div class="access-title">View History</div>\r
            <p class="access-description">Historical data and trends over time</p>\r
            <button mat-raised-button color="primary" (click)="$event.stopPropagation()">\r
              Go to History\r
              <mat-icon>arrow_forward</mat-icon>\r
            </button>\r
          </mat-card-content>\r
        </mat-card>\r
\r
        <!-- View Statistics -->\r
        <mat-card\r
          class="quick-access-card"\r
          (click)="navigateTo('/chartered-bike/statistics')"\r
          style="cursor: pointer;"\r
        >\r
          <mat-card-content>\r
            <mat-icon class="access-icon">bar_chart</mat-icon>\r
            <div class="access-title">View Statistics</div>\r
            <p class="access-description">Min, max, and average statistics</p>\r
            <button mat-raised-button color="primary" (click)="$event.stopPropagation()">\r
              Go to Statistics\r
              <mat-icon>arrow_forward</mat-icon>\r
            </button>\r
          </mat-card-content>\r
        </mat-card>\r
\r
        <!-- View Reports -->\r
        <mat-card\r
          class="quick-access-card"\r
          (click)="navigateTo('/chartered-bike/reports')"\r
          style="cursor: pointer;"\r
        >\r
          <mat-card-content>\r
            <mat-icon class="access-icon">description</mat-icon>\r
            <div class="access-title">View Reports</div>\r
            <p class="access-description">Weekly and monthly reports</p>\r
            <button mat-raised-button color="primary" (click)="$event.stopPropagation()">\r
              Go to Reports\r
              <mat-icon>arrow_forward</mat-icon>\r
            </button>\r
          </mat-card-content>\r
        </mat-card>\r
      </div>\r
    </div>\r
\r
    <!-- Top Stations Section -->\r
    <div class="top-stations-section" *ngIf="stations.length > 0">\r
      <h2>Station Overview</h2>\r
      <div class="stations-summary">\r
        <p class="summary-text">Displaying data from {{ stations.length }} stations</p>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Empty State -->\r
  <mat-card *ngIf="!loading && stations.length === 0" class="empty-card">\r
    <div class="empty-content">\r
      <mat-icon class="empty-icon">info</mat-icon>\r
      <h3>No Data Available</h3>\r
      <p>Unable to load dashboard data. Please try refreshing or check your connection.</p>\r
      <button mat-raised-button color="primary" (click)="refreshData()">\r
        <mat-icon>refresh</mat-icon>\r
        Retry\r
      </button>\r
    </div>\r
  </mat-card>\r
</div>\r
`, styles: ["/* src/app/components/admin/chartered-bike-dashboard/chartered-bike-dashboard.component.scss */\n.dashboard-container {\n  padding: 24px;\n  background-color: #f5f5f5;\n  min-height: 100vh;\n}\n.dashboard-container .dashboard-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.dashboard-container .dashboard-header h1 {\n  margin: 0;\n  font-size: 28px;\n  font-weight: 600;\n  color: #333;\n}\n.dashboard-container .dashboard-header .header-actions {\n  display: flex;\n  gap: 12px;\n}\n.dashboard-container .dashboard-header .header-actions button {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dashboard-container .error-card {\n  margin-bottom: 24px;\n  background-color: #ffebee;\n  border-left: 4px solid #f44336;\n}\n.dashboard-container .error-card .error-content {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #c62828;\n  padding: 16px;\n}\n.dashboard-container .error-card .error-content mat-icon {\n  color: #f44336;\n}\n.dashboard-container .error-card .error-content button {\n  margin-left: auto;\n}\n.dashboard-container .loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 24px;\n  gap: 16px;\n}\n.dashboard-container .loading-container p {\n  font-size: 16px;\n  color: #666;\n}\n.dashboard-container .dashboard-content .metrics-section {\n  margin-bottom: 40px;\n}\n.dashboard-container .dashboard-content .metrics-section h2 {\n  margin: 0 0 24px 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #333;\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 20px;\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s, box-shadow 0.2s;\n  cursor: pointer;\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card .metric-content {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card .metric-content .metric-icon {\n  font-size: 40px;\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  color: white;\n  flex-shrink: 0;\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card .metric-content .metric-info {\n  flex: 1;\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card .metric-content .metric-info .metric-label {\n  font-size: 12px;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px;\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card .metric-content .metric-info .metric-value {\n  font-size: 28px;\n  font-weight: 700;\n  color: #333;\n  line-height: 1;\n  margin-bottom: 4px;\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card .metric-content .metric-info .metric-detail {\n  font-size: 12px;\n  color: #666;\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card.status-card.status-good .metric-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50,\n      #388e3c);\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card.status-card.status-warning .metric-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800,\n      #f57c00);\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card.status-card.status-critical .metric-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336,\n      #d32f2f);\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card.stations-card .metric-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #2196f3,\n      #1565c0);\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card.bikes-card .metric-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #9c27b0,\n      #6a1b9a);\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card.critical-card .metric-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336,\n      #c62828);\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card.availability-card .metric-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #00bcd4,\n      #0097a7);\n}\n.dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card.sync-card .metric-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ff5722,\n      #d84315);\n}\n.dashboard-container .dashboard-content .quick-access-section {\n  margin-bottom: 40px;\n}\n.dashboard-container .dashboard-content .quick-access-section h2 {\n  margin: 0 0 24px 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #333;\n}\n.dashboard-container .dashboard-content .quick-access-section .quick-access-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 20px;\n}\n.dashboard-container .dashboard-content .quick-access-section .quick-access-grid .quick-access-card {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.dashboard-container .dashboard-content .quick-access-section .quick-access-grid .quick-access-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n}\n.dashboard-container .dashboard-content .quick-access-section .quick-access-grid .quick-access-card mat-card-content {\n  text-align: center;\n  padding: 24px;\n}\n.dashboard-container .dashboard-content .quick-access-section .quick-access-grid .quick-access-card mat-card-content .access-icon {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #1976d2;\n  margin: 0 auto 16px;\n  display: block;\n}\n.dashboard-container .dashboard-content .quick-access-section .quick-access-grid .quick-access-card mat-card-content .access-title {\n  font-size: 16px;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 8px;\n}\n.dashboard-container .dashboard-content .quick-access-section .quick-access-grid .quick-access-card mat-card-content .access-description {\n  font-size: 13px;\n  color: #666;\n  margin: 0 0 16px 0;\n  line-height: 1.4;\n}\n.dashboard-container .dashboard-content .quick-access-section .quick-access-grid .quick-access-card mat-card-content button {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.dashboard-container .dashboard-content .quick-access-section .quick-access-grid .quick-access-card mat-card-content button mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.dashboard-container .dashboard-content .top-stations-section h2 {\n  margin: 0 0 16px 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: #333;\n}\n.dashboard-container .dashboard-content .top-stations-section .stations-summary {\n  background-color: white;\n  padding: 16px 24px;\n  border-radius: 4px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.dashboard-container .dashboard-content .top-stations-section .stations-summary .summary-text {\n  margin: 0;\n  font-size: 14px;\n  color: #666;\n}\n.dashboard-container .empty-card {\n  text-align: center;\n  padding: 80px 24px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.dashboard-container .empty-card .empty-content .empty-icon {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n  margin: 0 auto 16px;\n}\n.dashboard-container .empty-card .empty-content h3 {\n  font-size: 20px;\n  color: #666;\n  margin: 0 0 8px;\n}\n.dashboard-container .empty-card .empty-content p {\n  color: #999;\n  margin: 0 0 24px;\n}\n.dashboard-container .empty-card .empty-content button {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n@media (max-width: 768px) {\n  .dashboard-container {\n    padding: 16px;\n  }\n  .dashboard-container .dashboard-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .dashboard-container .dashboard-header h1 {\n    font-size: 22px;\n  }\n  .dashboard-container .dashboard-header .header-actions {\n    width: 100%;\n  }\n  .dashboard-container .dashboard-header .header-actions button {\n    flex: 1;\n  }\n  .dashboard-container .dashboard-content .metrics-section .metrics-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n  .dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card .metric-content {\n    padding: 12px;\n    gap: 12px;\n  }\n  .dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card .metric-content .metric-icon {\n    width: 50px;\n    height: 50px;\n    font-size: 28px;\n  }\n  .dashboard-container .dashboard-content .metrics-section .metrics-grid .metric-card .metric-content .metric-info .metric-value {\n    font-size: 22px;\n  }\n  .dashboard-container .dashboard-content .quick-access-section .quick-access-grid {\n    grid-template-columns: 1fr;\n  }\n  .dashboard-container .dashboard-content .quick-access-section .quick-access-grid .quick-access-card mat-card-content {\n    padding: 20px;\n  }\n}\n/*# sourceMappingURL=chartered-bike-dashboard.component.css.map */\n"] }]
  }], () => [{ type: SmcService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CharteredBikeDashboardComponent, { className: "CharteredBikeDashboardComponent", filePath: "src/app/components/admin/chartered-bike-dashboard/chartered-bike-dashboard.component.ts", lineNumber: 31 });
})();
export {
  CharteredBikeDashboardComponent
};
//# sourceMappingURL=chunk-D2QVJXLO.js.map
