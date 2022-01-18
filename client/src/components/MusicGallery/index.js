import React, { Component } from 'react';

import './MusicGallery.css';
import tracks from '../../resources/music.json';

import appleSvg from '../../resources/img/apple.svg';
import youtubeSvg from '../../resources/img/youtube.svg';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iframes: null,
        };
    }

    componentDidMount() {
        this.iframes();
    }

    iframes = () => {
        let a = [];
        tracks.forEach((track) => {
            a.push(
                <div key={track.title} className="iframe-container">
                    <iframe
                        className="music-embed"
                        title={track.title}
                        src={track.url.spotify}
                        width="50%"
                        height="380"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    />
                    <div className="track-links">
                        {track.url.youtube !== '' ? <YoutubeLink track={track} /> : null}
                        {track.url.apple !== '' ? <AppleLink track={track} /> : null}
                    </div>
                </div>,
            );
        });
        this.setState({ iframes: a });
    };

    render() {
        return <div className="music-gallery">{this.state.iframes}</div>;
    }
}

function YoutubeLink(params) {
    return (
        <a className="track-link" href={params.track.url.youtube} target="_blank" rel="noreferrer">
            <img src={youtubeSvg} alt="" />
        </a>
    );
}

function AppleLink(params) {
    return (
        <a className="track-link" href={params.track.url.apple} target="_blank" rel="noreferrer">
            <img src={appleSvg} alt="" />
        </a>
    );
}
