import './App.css';
import { useEffect, useRef } from 'react';
import Background from './components/Background.tsx';
import Tape from './components/Tape.tsx';
import Cursor from './components/Cursor.tsx';
import LandingCTA from './components/LandingCTA.tsx';
import Showcase from './components/Showcase.tsx';
import ShowcaseTitle from './components/ShowcaseTitle.tsx';

function App() {
    const tapeRef = useRef(null);
    const backgroundRef = useRef(null);

    useEffect(() => {
        const constrain = 50;
        let isEnabled = true;

        const transformElement = (element, x, y) => {
            if (!element) return;
            const box = element.getBoundingClientRect();
            const calcX = -(y - box.y - box.height / 2) / constrain;
            const calcY = (x - box.x - box.width / 2) / constrain;
            element.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
        };

        const handleMouseMove = (e) => {
            if (isEnabled) {
                transformElement(tapeRef.current, e.clientX, e.clientY);
                transformElement(backgroundRef.current, e.clientX, e.clientY);
            }

            // Move custom cursor and showcase tag
            const customCursor = document.querySelector("#custom-cursor");
            const showcaseTags = document.querySelectorAll(".ShowcaseTag");
            if (customCursor) {
                customCursor.style.left = `${e.clientX}px`;
                customCursor.style.top = `${e.clientY}px`;
            }
            showcaseTags.forEach((tag) => {
                tag.style.left = `${e.clientX}px`;
                tag.style.top = `${e.clientY}px`;
            });
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = document.body.scrollHeight * 0.5;
            const ratio = Math.min(scrollTop / maxScroll, 1);

            const borderRadius = 50 * ratio;
            const left = 150 * ratio;
            const width = `calc(100vw - ${300 * ratio}px)`;

            const hero = document.querySelector('.Hero');
            if (hero) {
                hero.style.borderRadius = `${borderRadius}px`;
                hero.style.left = `${left}px`;
                hero.style.width = width;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="App">
            <Cursor />
            <div className="Hero">
                <div className="HeroBackground"></div>
                <div ref={backgroundRef}>
                    <Background />
                </div>
                <div ref={tapeRef}>
                    <Tape />
                </div>
            </div>
            <LandingCTA />
            <ShowcaseTitle />
            <Showcase />
        </div>
    );
}

export default App;