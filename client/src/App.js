import { Component } from 'react';
import { withTranslation } from 'react-i18next';

import './App.css';
import './i18n';
// import Main from './pages/Main/Main';

// const MainPage = withTranslation()(Main);

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>Hello world!</div>;
    }
}

export default withTranslation()(App);
