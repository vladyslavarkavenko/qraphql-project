import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './components/Hello';

ReactDOM.render(
  <Hello compiler="TypeScript" framework="2 as any" />,
  document.getElementById('example'),
);
