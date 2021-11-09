import ColorContextPadProvider from './ColorContextPadProvider';
import ColorPopupProvider from './ColorPopupProvider';
import AlignDistributePopupProvider from './AlignDistributePopupProvider';

export default {
  __init__: [
    'colorContextPadProvider',
    'colorPopupProvider',
    'alignDistributePopupProvider'
  ],
  colorContextPadProvider: [ 'type', ColorContextPadProvider ],
  colorPopupProvider: [ 'type', ColorPopupProvider ],
  alignDistributePopupProvider: [ 'type', AlignDistributePopupProvider ]
};