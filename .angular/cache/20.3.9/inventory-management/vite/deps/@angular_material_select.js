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
} from "./chunk-RXMVXOQQ.js";
import "./chunk-CUYWTYB6.js";
import "./chunk-PKL7Z7XF.js";
import "./chunk-5ZDZYKJF.js";
import {
  MatOptgroup,
  MatOption
} from "./chunk-HRAUTPPB.js";
import "./chunk-XR36HKFM.js";
import "./chunk-TJXGW2CA.js";
import "./chunk-OJBH4FOL.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-KY2VWQ3B.js";
import "./chunk-3DYC74L2.js";
import "./chunk-TMHXIVKS.js";
import "./chunk-DJXH5MVL.js";
import "./chunk-OMQWT5UT.js";
import "./chunk-ZFCOH4EW.js";
import "./chunk-FM5TY7SB.js";
import "./chunk-OVT3FQCI.js";
import "./chunk-L4M5LL6T.js";
import "./chunk-2IZRMWHP.js";
import "./chunk-M7ZKEZDM.js";
import "./chunk-AC4XDEY7.js";
import "./chunk-I7L72O6A.js";
import "./chunk-7KO2KO7R.js";
import "./chunk-YU5BMYK4.js";
import "./chunk-YOEGP67K.js";
import "./chunk-BLRR33TW.js";
import "./chunk-QSCL67TR.js";
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
