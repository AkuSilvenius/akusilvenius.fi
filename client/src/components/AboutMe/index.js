import React, { Component } from 'react';
import Typed from 'typed.js';

import './AboutMe.css';
import avatar from '../../resources/img/memoji_default.webp';
import akuImg from '../../resources/img/aku2.webp';
import * as skillIcons from '../../resources/img/index';

import { formatInt } from '../../resources/utils';

import ScrollableCard from '../ScrollableCard';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarFlipped: false,
            cardIdToShow: this.props.cardIdToShow
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps.cardIdToShow !== prevState.cardIdToShow
            ? {
                    cardIdToShow: nextProps.cardIdToShow,
                }
            : null;
    }

    componentDidMount() {
        const optionsMain = {
            strings: ['Aku Silvenius'],
            typeSpeed: 50,
            startDelay: 1000,
            cursorChar: '❚',
            onComplete: () => this.completeTitle(),
        };
        const optionsSub = {
            strings: ['A Full Stack Developer'],
            typeSpeed: 50,
            startDelay: 1000,
            cursorChar: '❚',
            onComplete: () => this.completeSubTitle(),
        };

        if (!this.props.mainPageMounted()) {
            this.typedTitle = new Typed('#MainTitle', optionsMain);
            this.typedSubTitle = new Typed('#MainTitleSub', optionsSub);
            this.typedSubTitle.stop();
        }
    }

    componentWillUnmount() {
        this.typedTitle && this.typedTitle.destroy();
        this.typedSubTitle && this.typedSubTitle.destroy();
    }

    completeTitle = () => {
        let cont = document.getElementById('MainTitleContainer');
        let s = document.getElementById('MainTitleSubContainer');
        setTimeout(() => {
            cont.getElementsByClassName('typed-cursor')[0].style.color = 'transparent';
            s.getElementsByClassName('typed-cursor')[0].style.opacity = 1;
            this.typedSubTitle.start();
        }, 1000);
    };

    completeSubTitle = () => {
        let cont = document.getElementById('MainTitleSubContainer');
        setTimeout(() => {
            cont.getElementsByClassName('typed-cursor')[0].style.color = 'transparent';
            document.getElementById('imgAvatar').style.opacity = 1;
            this.props.mountMainPage();
        }, 1000);
    };

    render() {
        let comps = [
            <React.Fragment key="AboutMeScroll">
                <ScrollableCard idx={0} pageName="AboutMe" cardIdToShow={this.props.cardIdToShow}>
                    <WelcomeSection state={this.state} props={this.props} flip={this.flip} />
                </ScrollableCard>
                <ScrollableCard idx={1} pageName="AboutMe" cardIdToShow={this.props.cardIdToShow}>
                    <IntroSection props={this.props} />
                </ScrollableCard>
                <ScrollableCard idx={2} pageName="AboutMe" cardIdToShow={this.props.cardIdToShow}>
                    <FullStackSection props={this.props} />
                </ScrollableCard>
                <div id="footer">
                    <span>You are the 1423th visitor on this page</span>
                    <span>{this.props.t('sections.AboutMe.footer.cr')}</span>
                </div>
            </React.Fragment>,
        ];

        return <div id="AboutMe">{comps}</div>;
    }
}

function WelcomeSection(params) {
    let mounted = params.props.mainPageMounted();
    return (
        <React.Fragment>
            <div id="MainTitleContainer">
                {mounted ? (
                    <span id="MainTitle">{params.props.t('sections.AboutMe.Title')}</span>
                ) : (
                    <span id="MainTitle" />
                )}
            </div>
            <div id="avatarContainer">
                <img
                    id="imgAvatar"
                    className={!mounted ? 'hide' : ''}
                    src={avatar}
                    alt=""
                    draggable="false"
                    onDragStart={(e) => {
                        e.preventDefault();
                    }}
                />
            </div>
            <div id="MainTitleSubContainer">
                {mounted ? (
                    <span id="MainTitleSub">{params.props.t('sections.AboutMe.TitleSub')}</span>
                ) : (
                    <span id="MainTitleSub" />
                )}
            </div>
        </React.Fragment>
    );
}

function IntroSection(params) {
    return (
        <React.Fragment>
            <img
                id="imgIntro"
                src={akuImg}
                alt=""
                draggable="false"
                onDragStart={(e) => {
                    e.preventDefault();
                }}
            />
            <div id="introTextContainer">
                <p>{params.props.t('sections.AboutMe.welcome')}</p>
                <p>{params.props.t('sections.AboutMe.welcome2')}</p>
                <p>{params.props.t('sections.AboutMe.welcome3')}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: params.props.t('sections.AboutMe.welcome4', {
                            interpolation: { escapeValue: false },
                        }),
                    }}
                />
            </div>
        </React.Fragment>
    );
}

function FullStackSection(params) {
    return (
        <React.Fragment>
            <div id="fullStackContainer">
                <p>{params.props.t('sections.AboutMe.DevProfile')}</p>
            </div>
            {/* <img id="fullStackImg" src={fullStack} alt="" draggable="false" onDragStart={(e) => {e.preventDefault()}} /> */}
            <div id="mainSkillsContainer">
                <MainSkills props={params.props} />
            </div>
        </React.Fragment>
    );
}

function MainSkills() {
    return (
        <React.Fragment>
            <div id="frontEndSkills" className="skillClassContainer">
                <img src={skillIcons.javascript} alt="" />
                <i className="devicon-react-original colored"></i>
                <i className="devicon-sass-original colored"></i>
            </div>
            <div id="backEndSkills" className="skillClassContainer">
                <img src={skillIcons.nodejs} alt="" />
                <img src={skillIcons.python} alt="" />
                <i className="devicon-go-original-wordmark colored"></i>
            </div>
            <div id="dbSkills" className="skillClassContainer">
                <img src={skillIcons.mongodb} alt="" />
                <i className="devicon-postgresql-plain colored"></i>
                <img src={skillIcons.cos} alt="" />
            </div>
            <div id="containerSkills" className="skillClassContainer">
                <img src={skillIcons.docker} alt="" />
                <i className="devicon-kubernetes-plain colored"></i>
                <img src={skillIcons.aks} alt="" />
            </div>
            <div id="cloudSkills" className="skillClassContainer">
                <img src={skillIcons.openshift} alt="" />
                <img src={skillIcons.azdevops} alt="" />
                <img src={skillIcons.ibmcloud} alt="" />
            </div>
        </React.Fragment>
    );
}
