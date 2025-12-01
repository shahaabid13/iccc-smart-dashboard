import {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger
} from "./chunk-MMO4CS2T.js";
import "./chunk-6UNJEWB3.js";
import "./chunk-7FNIBP6O.js";
import "./chunk-7ZK4QT4C.js";
import {
  MatOptgroup,
  MatOption
} from "./chunk-EXAF2375.js";
import "./chunk-HBS5BK4E.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-3GZQLRHV.js";
import "./chunk-VV6GLQI7.js";
import "./chunk-E62AQI7E.js";
import "./chunk-6SMQL3ST.js";
import "./chunk-KI7NKCDG.js";
import "./chunk-BNGSXAG6.js";
import "./chunk-JGCOWSSB.js";
import "./chunk-KR2VOO33.js";
import "./chunk-U6KJYYOJ.js";
import "./chunk-AAETQAS2.js";
import "./chunk-A6EDFXM5.js";
import "./chunk-NTYTVHX3.js";
import "./chunk-MYDV67T4.js";
import "./chunk-B3LK2RJ3.js";
import "./chunk-UL3LBBOX.js";
import "./chunk-6YVREBWA.js";
import "./chunk-R2O5KZ6C.js";
import "./chunk-H4MZV6UN.js";
import "./chunk-ZQGNKPNF.js";
import "./chunk-45LJS6GN.js";
import "./chunk-TXDUYLVM.js";

// ../node_modules/@angular/material/fesm2022/select.mjs
var matSelectAnimations = {
  // Represents
  // trigger('transformPanel', [
  //   state(
  //     'void',
  //     style({
  //       opacity: 0,
  //       transform: 'scale(1, 0.8)',
  //     }),
  //   ),
  //   transition(
  //     'void => showing',
  //     animate(
  //       '120ms cubic-bezier(0, 0, 0.2, 1)',
  //       style({
  //         opacity: 1,
  //         transform: 'scale(1, 1)',
  //       }),
  //     ),
  //   ),
  //   transition('* => void', animate('100ms linear', style({opacity: 0}))),
  // ])
  /** This animation transforms the select's overlay panel on and off the page. */
  transformPanel: {
    type: 7,
    name: "transformPanel",
    definitions: [
      {
        type: 0,
        name: "void",
        styles: {
          type: 6,
          styles: { opacity: 0, transform: "scale(1, 0.8)" },
          offset: null
        }
      },
      {
        type: 1,
        expr: "void => showing",
        animation: {
          type: 4,
          styles: {
            type: 6,
            styles: { opacity: 1, transform: "scale(1, 1)" },
            offset: null
          },
          timings: "120ms cubic-bezier(0, 0, 0.2, 1)"
        },
        options: null
      },
      {
        type: 1,
        expr: "* => void",
        animation: {
          type: 4,
          styles: { type: 6, styles: { opacity: 0 }, offset: null },
          timings: "100ms linear"
        },
        options: null
      }
    ],
    options: {}
  }
};
export {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOptgroup,
  MatOption,
  MatPrefix,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger,
  MatSuffix,
  matSelectAnimations
};
//# sourceMappingURL=@angular_material_select.js.map
