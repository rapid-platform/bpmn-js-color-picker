const colorImageSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">' +
  '<path d="M1716 28l-430 431-117 117-214-61-222-62-4 4-179 179 428 428 428 428 179-179v-1l4-3-62-222-56-197 123-123 430-430-308-309zM423 765L24 1163l428 428 428 429 399-399-428-428-428-428z"/>' +
'</svg>';

const colorImageUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(colorImageSvg);

const alignDistributeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="100%" height="100%">
    <path style="fill:none;fill-rule:evenodd;stroke:#282828;stroke-width:146.00001526;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="M0 1537h2044" transform="rotate(90 949 953)"/>
    <path style="fill:#fff;fill-opacity:1;stroke:#282828;stroke-width:146;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M511 369v1168H73V369h438zM1241 807v730H803V807h438zM1971 369v1168h-438V369h438z" transform="rotate(90 949 953)"/>
  </svg>`;

const alignDistributeImageUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(alignDistributeSvg);


export default function ColorContextPadProvider(contextPad, popupMenu, canvas) {

  this._contextPad = contextPad;
  this._popupMenu = popupMenu;
  this._canvas = canvas;

  contextPad.registerProvider(this);
}


ColorContextPadProvider.$inject = [
  'contextPad',
  'popupMenu',
  'canvas'
];


ColorContextPadProvider.prototype.getContextPadEntries = function(element) {
  var self = this;

  var actions = {
    'set-color': {
      group: 'edit',
      imageUrl: colorImageUrl,
      title: 'Set Color',
      action: {
        click: function(event, element) {

          // get start popup draw start position
          var position = {
            ...getStartPosition(self._canvas, self._contextPad, element),
            cursor: {
              x: event.x,
              y: event.y
            }
          };

          // open new color-picker popup
          self._popupMenu.open(element, 'color-picker', position);
        }
      }
    }
  };

  return actions;
};



ColorContextPadProvider.prototype.getMultiElementContextPadEntries = function(elements) {
  var self = this;

  var actions = {
    'set-color': {
      group: 'edit',
      imageUrl: colorImageUrl,
      title: 'Set Color',
      action: {
        click: function(event, element) {

          // get start popup draw start position
          var position = {
            ...getStartPosition(self._canvas, self._contextPad, element),
            cursor: {
              x: event.x,
              y: event.y
            }
          };

          // open new color-picker popup
          self._popupMenu.open(elements, 'color-picker', position);
        }
      },
    },
    'align-distribute': {
      group: 'edit',
      imageUrl: alignDistributeImageUrl,
      title: 'Align / Distribute',
      action: {
        click: function(event, element) {

          // get start popup draw start position
          var position = {
            ...getStartPosition(self._canvas, self._contextPad, element),
            cursor: {
              x: event.x,
              y: event.y
            }
          };

          // open new color-picker popup
          self._popupMenu.open(elements, 'align-distribute', position);
        }
      }
    }
  };

  return actions;
};

// helpers //////////////////////

function getStartPosition(canvas, contextPad, element) {

  var Y_OFFSET = 5;

  var diagramContainer = canvas.getContainer(),
      pad = contextPad.getPad(element).html;

  var diagramRect = diagramContainer.getBoundingClientRect(),
      padRect = pad.getBoundingClientRect();

  var top = padRect.top - diagramRect.top;
  var left = padRect.left - diagramRect.left;

  var pos = {
    x: left,
    y: top + padRect.height + Y_OFFSET
  };

  return pos;
}