import { Component, lazy } from 'react';
import { withTranslation } from 'react-i18next';

import ieImg from './resources/img/ie.webp';
import './App.css';
import './i18n';

import Main from './pages/Main/Main';

const MainPage = withTranslation()(Main);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isIE: false,
        };
    }

    componentDidMount() {
        let ua = window.navigator.userAgent;
        if (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0) this.setState({ isIE: true });
    }

    render() {
        // for once, I get to choose whether to support IE or not
        return this.state.isIE ? <IE /> : <MainPage />
    }
}

function IE() {
    return (
        <div className="ie-container">
            <img src={ieImg} loading="lazy" alt="" />
        </div>
    );
}

export default withTranslation()(App);
