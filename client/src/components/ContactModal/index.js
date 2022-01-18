import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useTranslation } from 'react-i18next';
import { Email32, LogoGithub32, LogoLinkedin32 } from '@carbon/icons-react';

import './ContactModal.css';
import memojiFb from '../../resources/img/memoji_fb.jpg';

const BG_ID = 'modal-bg';

function ContactModal(props) {
    const [clickedId, modalClick] = useState(null);
    const { t, _ } = useTranslation();
    const op = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
    });

    useEffect(() => {
        if (clickedId === BG_ID) props.toggleModal();
    });

    return (
        <animated.div
            id="modal-cont"
            style={op}
            onClick={(e) => modalClick(e.target.getAttribute('id'))}
        >
            <div id={BG_ID} className="modal-bgd">
                <div className="md">
                    <div className="modal-logo-container">
                        <h4>&lt;IBM_LOGO_HERE&gt;</h4>
                    </div>
                    <div className="modal-info-container">
                        <div>
                            <h3>
                                <strong>Aku</strong>
                            </h3>
                            <h3>Silvenius</h3>
                        </div>
                        <div>
                            <h4>Application Developer</h4>
                            <h4>Helsinki, Finland</h4>
                            <h4>
                                <a
                                    title="akusilve@gmail.com"
                                    href="mailto:akusilve@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Mail
                                </a>
                            </h4>
                            <h4>
                                <a
                                    title="https://linkedin.com/in/silvenius"
                                    href="https://linkedin.com/in/silvenius"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </h4>
                            <h4>
                                <a
                                    title="https://github.com/AkuSilvenius"
                                    href="https://github.com/AkuSilvenius"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub
                                </a>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    );
}

export default ContactModal;
