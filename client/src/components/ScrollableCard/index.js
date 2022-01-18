import { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import './ScrollableCard.css';

const ScrollableCard = (props) => {
    const sectionRef = useRef(null);
    const op = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    });
    useEffect(() => {
        console.log("scrollablecard useeffect")
        console.log(props)
        if (sectionRef.current) {
            console.log("sectionref current")
        }
    }, [props.cardIdToShow]);

    return (
        <animated.section
            id={`${props.pageName}-${props.idx}`}
            style={op}
            className="scrollableCard"
        >
            {props.children}
        </animated.section>
    )
};

export default ScrollableCard;
