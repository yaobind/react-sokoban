import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/ui/Startup';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
