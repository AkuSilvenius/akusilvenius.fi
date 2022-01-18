/* eslint-disable no-extend-native */
import React, { Component } from 'react';

import './Main.css';

import HeaderNavi from '../../components/HeaderNavi';
import { withTranslation } from 'react-i18next';
const HeaderNaviComp = withTranslation()(HeaderNavi);

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSubPage: { component: null, name: null },
            cardIdToShow: null,
            mainPageMounted: false,
        };
    }

    toggleLang = () => {
        let newLang = this.props.i18n.language === 'fi' ? 'en' : 'fi';
        this.props.i18n.changeLanguage(newLang);
    };

    mainPageMounted = () => {
        return this.state.mainPageMounted;
    };

    mountMainPage = () => {
        if (!this.state.mainPageMounted) this.setState({ mainPageMounted: true });
    };

    setSubPage = (comp, n) => {
        if (this.state.selectedSubPage.name === null || this.state.selectedSubPage.name !== n) {
            this.unMountSubPage();
            setTimeout(() => {
                let c = { component: comp, name: n };
                this.setState({ selectedSubPage: c });
                this.mountSubPage();
            }, 500);
        }
    };

    unMountSubPage = () => {
        document.getElementById('subPageContainer').classList.remove('subPageMount');
        document.getElementById('subPageContainer').classList.add('subPageUnMount');
    };

    mountSubPage = () => {
        document.getElementById('subPageContainer').classList.remove('subPageUnMount');
        document.getElementById('subPageContainer').classList.add('subPageMount');
    };

    analyzeScroll = () => {
        let cards = Array.from(document.getElementsByClassName('scrollableCard'));
        let distancesFromTop = cards.map((el) => {
            return {
                id: el.id,
                distance: Math.abs(el.getBoundingClientRect().top),
            };
        });

        let newClosest = distancesFromTop.hasMin('distance');
        if (this.state.cardIdToShow !== newClosest.id) {
            console.log(`card to show is "${newClosest.id}"`)
            this.setState({ cardIdToShow: newClosest.id });
        }
    };

    render() {
        return (
            <div className="mainContainer">
                <div className="lang-switcher">
                    <button
                        className={`bare-btn ${!this.state.mainPageMounted ? 'hide' : ''}`}
                        id="langToggleButton"
                        value="fi"
                        alt="finnish"
                        onClick={this.toggleLang}
                    >
                        {this.props.i18n.language === 'fi' ? '🇫🇮' : '🇬🇧'}
                    </button>
                </div>
                <div className="contentContainer">
                    <HeaderNaviComp
                        selectedSubPage={this.state.selectedSubPage}
                        setSubPage={this.setSubPage}
                        mountMainPage={this.mountMainPage}
                        mainPageMounted={this.mainPageMounted}
                        cardIdToShow={this.state.cardIdToShow}
                    />

                    <div
                        onScroll={this.analyzeScroll}
                        id="subPageContainer"
                        className={`mainContent ${
                            !this.state.mainPageMounted ? 'scrollDisabled' : ''
                        }`}
                    >
                        {this.state.selectedSubPage.component}
                    </div>
                </div>
            </div>
        );
    }
}

Array.prototype.hasMin = function (attrib) {
    const checker = (o, i) => typeof o === 'object' && o[i];
    return (
        (this.length &&
            this.reduce(function (prev, curr) {
                const prevOk = checker(prev, attrib);
                const currOk = checker(curr, attrib);
                if (!prevOk && !currOk) return {};
                if (!prevOk) return curr;
                if (!currOk) return prev;
                return prev[attrib] < curr[attrib] ? prev : curr;
            })) ||
        null
    );
};
