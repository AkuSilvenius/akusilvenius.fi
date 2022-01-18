import React, { Component } from 'react';

import './TechSkills.css';

import ScrollableCard from '../ScrollableCard';

export default class index extends Component {
    render() {
        let comps = [
            <div key="TechSkillsScroll" id="scroll">
                <ScrollableCard
                    idx={0}
                    pageName="TechSkills"
                    subComp={<FrontEndSkills props={this.props} />}
                />
            </div>,
        ];

        return <div id="TechSkills">{comps}</div>;
    }
}

function FrontEndSkills(params) {
    return (
        <div id="FrontEndSkills">
            <div className="skillStrengths">
                <div className="SkillTitle">
                    <span>💪🏼 Strengths</span>
                </div>
                <div className="SkillContent"></div>
            </div>
            <div className="skillFamiliar">
                <div className="TitleSkill">
                    <span>👍🏼 Familiar with</span>
                </div>
                <div className="ContentSkill"></div>
            </div>
            <div className="skillCurious">
                <div className="SkillTitle">
                    <span>👀 Curious to learn more</span>
                </div>
                <div className="SkillContent"></div>
            </div>
        </div>
    );
}
