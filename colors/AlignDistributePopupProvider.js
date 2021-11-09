import {
  filter
} from 'min-dash';

import { is } from 'bpmn-js/lib/util/ModelUtil';

var icons = {
  'align-bottom': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    <path d="M0 442v1314h2044V442h-584v1168h-146V880H730v730H584V442H0zm146 146h292v1022H146V588zm1460 0h292v1022h-292V588zm-730 438h292v584H876v-584z" style="color:#000;font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000;solid-opacity:1;fill:#282828;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:146.00001526;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"/>
  </svg>`,
  'align-center': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    <path d="M1028 1318v146" style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/>
    <path d="M365 515h1314V77H365v438zM657 1245h730V807H657v438z" style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
    <path d="M1022 588v146" style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/>
    <path d="M365 1975h1314v-438H365v438z" style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
  </svg>`,
  'align-left': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    <path style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146.00001526;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="M0 1537h2044" transform="rotate(90 949 953)"/>
    <path style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M511 369v1168H73V369h438zM1241 807v730H803V807h438zM1971 369v1168h-438V369h438z" transform="rotate(90 949 953)"/>
  </svg>`,
  'align-right': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    <path d="M1679 4v2044" style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146.00001526;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/>
    <path d="M511 515h1168V77H511v438zM949 1245h730V807H949v438zM511 1975h1168v-438H511v438z" style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
  </svg>`,
  'align-top': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    <path style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146.00001526;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="M0 1537h2044" transform="matrix(1 0 0 -1 0 1906)"/>
    <path style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M511 369v1168H73V369h438zM1241 807v730H803V807h438zM1971 369v1168h-438V369h438z" transform="matrix(1 0 0 -1 0 1906)"/>
  </svg>`,
  'align-middle': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    <path style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="M1028 1318v146" transform="rotate(90 1022 1026)"/>
    <path style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M365 515h1314V77H365v438zM657 1245h730V807H657v438z" transform="rotate(90 1022 1026)"/>
    <path style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="M1022 588v146" transform="rotate(90 1022 1026)"/>
    <path style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M365 1975h1314v-438H365v438z" transform="rotate(90 1022 1026)"/>
  </svg>`,
  'distribute-horizontal': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    <path d="M73 661v1022h438V661H73z" style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
    <path d="M438 369h1168" style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/>
    <path d="M803 661v730h438V661H803zM1533 661v1022h438V661h-438z" style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
    <path d="M511 442v146M1022 442v146M1533 442v146" style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/>
  </svg>`,
  'distribute-vertical': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
    <path style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M73 661v1022h438V661H73z" transform="rotate(-90 1022 1026)"/>
    <path style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="M438 369h1168" transform="rotate(-90 1022 1026)"/>
    <path style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M803 661v730h438V661H803zM1533 661v1022h438V661h-438z" transform="rotate(-90 1022 1026)"/>
    <path style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="M511 442v146M1022 442v146M1533 442v146" transform="rotate(-90 1022 1026)"/>
  </svg>`
};

export default function AlignDistributePopupProvider(
    popupMenu, alignElements, distributeElements) {

  this._popupMenu = popupMenu;
  this._alignElements = alignElements;
  this._distributeElements = distributeElements;

  this._popupMenu.registerProvider('align-distribute', this);
}


AlignDistributePopupProvider.$inject = [
  'popupMenu',
  'alignElements',
  'distributeElements'
];


AlignDistributePopupProvider.prototype.getEntries = function(elements) {
  var self = this;

  var alignItems = [{
    label: 'Align bottom',
    type: 'bottom'
  }, {
    label: 'Align left',
    type: 'left'
  }, {
    label: 'Align right',
    type: 'right'
  }, {
    label: 'Align top',
    type: 'top'
  }, {
    label: 'Align middle',
    type: 'middle'
  }, {
    label: 'Align center',
    type: 'center'
  }];

  var distributeItems = [{
    label: 'Distribute horizontal',
    type: 'horizontal'
  }, {
    label: 'Distribute vertical',
    type: 'vertical'
  }];

  var entries = [].concat(
    alignItems.map(function(align) {
      var id = 'align-' + align.type;

      return {
        title: align.label,
        id: id,
        imageUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(icons[id]),
        action: function() {
          var aligneableElements = filter(elements, function(element) {
            return !is(element, 'bpmn:Lane');
          });

          self._alignElements.trigger(aligneableElements, align.type);
        }
      };
    }),
    distributeItems.map(function(distribute) {

      var id = 'distribute-' + distribute.type;

      return {
        title: distribute.label,
        id: id,
        imageUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(icons[id]),
        action: function() {
          self._distributeElements.trigger(elements, distribute.type)
        }
      };
    })
  );

  return entries;
};