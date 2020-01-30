import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
  <App compiler="TypeScript" framework="2 as any" />,
  document.getElementById('app'),
);
