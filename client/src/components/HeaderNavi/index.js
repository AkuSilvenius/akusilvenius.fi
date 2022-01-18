import React, { Component } from 'react';

import { Cyclist32, Report32, Code32, Identification32, Email32 } from '@carbon/icons-react';
import { withTranslation } from 'react-i18next';
import './HeaderNavi.css';

import AboutMe from '../AboutMe';
import Resume from '../Resume';
import TechSkills from '../TechSkills';
import Hobby from '../Hobby';
import ContactModal from '../ContactModal';

const AboutMeComp = withTranslation()(AboutMe);
const ResumeComp = withTranslation()(Resume);
const TechSkillsComp = withTranslation()(TechSkills);
const HobbyComp = withTranslation()(Hobby);

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false,
            modalVisible: false,
            sections: [],
            cardIdToShow: this.props.cardIdToShow
        };
    }

    componentDidMount() {
        // let mobileTest = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        // this.setState({ isMobile: mobileTest })
        this.setup();
    }

    setup = async () => {
        await this.injectSections();

        // let's set the bio page as default
        this.props.setSubPage(this.state.sections[0].component, this.state.sections[0].name);
    };

    injectSections = async () => {
        let s = [
            {
                name: 'Bio',
                title: 'About',
                icon: <Identification32 />,
                component: (
                    <AboutMeComp
                        mainPageMounted={this.props.mainPageMounted}
                        mountMainPage={this.props.mountMainPage}
                        cardIdToShow={this.props.cardIdToShow}
                    />
                ),
            },
            {
                name: 'Resume',
                title: 'Resume',
                icon: <Report32 />,
                component: (
                    <ResumeComp
                        mainPageMounted={this.props.mainPageMounted}
                        mountMainPage={this.props.mountMainPage}
                        cardIdToShow={this.state.cardIdToShow}
                    />
                ),
            },
            {
                name: 'TechSkills',
                title: 'TechSkills',
                icon: <Code32 />,
                component: (
                    <TechSkillsComp
                        mainPageMounted={this.props.mainPageMounted}
                        mountMainPage={this.props.mountMainPage}
                        cardIdToShow={this.state.cardIdToShow}
                    />
                ),
            },
            {
                name: 'Hobby',
                title: 'Hobbies',
                icon: <Cyclist32 />,
                component: (
                    <HobbyComp
                        mainPageMounted={this.props.mainPageMounted}
                        mountMainPage={this.props.mountMainPage}
                        cardIdToShow={this.state.cardIdToShow}
                    />
                ),
            },
        ];
        this.setState({ sections: s });
    };

    toggleModal = () => this.setState({ modalVisible: !this.state.modalVisible });

    headerNaviElements = () => {
        let e = [];
        this.state.sections.forEach((s, idx) => {
            e.push(this.getHeaderNaviElement(s, idx));
        });
        e.push(this.contactInfoBtn());
        return e;
    };

    contactInfoBtn = () => {
        return (
            <React.Fragment key="headerNaviContact">
                <input
                    defaultChecked={false}
                    className="menu_input"
                    id="headerNaviContact"
                    name="menu"
                    type="radio"
                />
                <label
                    onClick={this.toggleModal}
                    className="menu_label"
                    htmlFor="headerNaviContact"
                >
                    <div className="fa">
                        <Email32 />
                    </div>
                    <span className="menu_text">Contact</span>
                </label>
            </React.Fragment>
        );
    };

    getHeaderNaviElement = (el, idx) => {
        let key = `headernavi.buttons.${el.name}`;
        return (
            <React.Fragment key={`headerNavi${el.name}`}>
                <input
                    defaultChecked={idx === 0}
                    className="menu_input"
                    id={`headerNavi${el.name}`}
                    name="menu"
                    type="radio"
                />
                <label
                    onClick={() => this.props.setSubPage(el.component, el.name)}
                    className="menu_label"
                    htmlFor={`headerNavi${el.name}`}
                >
                    <div className="fa">{el.icon}</div>
                    <span className="menu_text">{this.props.t(key)}</span>
                </label>
            </React.Fragment>
        );
    };

    render() {
        return (
            <React.Fragment>
                {this.state.modalVisible ? (
                    <ContactModal
                        visible={this.state.modalVisible}
                        toggleModal={this.toggleModal}
                    />
                ) : null}
                <div
                    className={`${this.state.isMobile ? 'menu-mobile' : 'menu'} ${
                        !this.props.mainPageMounted() ? 'hide' : ''
                    }`}
                >
                    {this.headerNaviElements()}
                </div>
            </React.Fragment>
        );
    }
}
