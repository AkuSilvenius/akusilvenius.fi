import React, { Component } from 'react';

import './Hobby.css';
import ScrollableCard from '../ScrollableCard';
import MusicGallery from '../MusicGallery';

import cyclingImg from '../../resources/img/cycling.webp';
import coffeeImg from '../../resources/img/coffee.webp';

export default class index extends Component {
    render() {
        let comps = [
            <div key="HobbyScroll" id="scroll">
                <ScrollableCard idx={0} pageName="Hobby">
                    <MusicSection props={this.props} />
                </ScrollableCard>
                <ScrollableCard idx={1} pageName="Hobby">
                    <CoffeeSection props={this.props} />
                </ScrollableCard>
                <ScrollableCard idx={2} pageName="Hobby">
                    <CyclingSection props={this.props} />
                </ScrollableCard>
                <div id="scrollBottomPadding" />
            </div>,
        ];

        return <div id="Hobby">{comps}</div>;
    }
}

function CyclingSection(props) {
    console.log(props);
    return (
        <React.Fragment>
            <img
                id="cyclingImg"
                src={cyclingImg}
                alt=""
                draggable="false"
                onDragStart={(e) => {
                    e.preventDefault();
                }}
            />
        </React.Fragment>
    );
}

function CoffeeSection(props) {
    console.log(props);
    return (
        <React.Fragment>
            <img
                id="coffeeImg"
                src={coffeeImg}
                alt=""
                draggable="false"
                onDragStart={(e) => {
                    e.preventDefault();
                }}
            />
        </React.Fragment>
    );
}

function MusicSection(props) {
    console.log(props);
    return (
        <React.Fragment>
            <h4>Music that I'm probably listening to right now</h4>
            <MusicGallery />
        </React.Fragment>
    );
}
