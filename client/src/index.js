import React, { Suspense } from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Loading } from 'carbon-components-react';

import App from './App';

const Loader = () => <Loading withOverlay active />;

render(
    <Suspense fallback={<Loader />}>
        <App />
    </Suspense>,
    document.getElementById('root'),
);

serviceWorker.unregister();
