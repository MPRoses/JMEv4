import './App.css';
import { useEffect } from 'react';
import Background from './components/Background.tsx';
import Tape from './components/Tape.tsx';
import Cursor from './components/Cursor.tsx';
import LandingCTA from './components/LandingCTA.tsx';
import Showcase from './components/Showcase.tsx';
import ShowcaseTitle from './components/ShowcaseTitle.tsx';

function App() {
    useEffect(() => {
        const tapeLayer = document.querySelector("#tape-movement");
        const backgroundLayer = document.querySelector(".background");

        // Cloning elements to clear previous event listeners
        const tapeClone = tapeLayer?.cloneNode(true);
        const backgroundClone = backgroundLayer?.cloneNode(true);
        tapeLayer?.replaceWith(tapeClone);
        backgroundLayer?.replaceWith(backgroundClone);

        const constrain = 50;
        let isEnabled = true;
        let lastKnownPos = [0, 0];

        function transforms(x, y, element) {
            const box = element.getBoundingClientRect();
            const calcX = -(y - box.y - box.height / 2) / constrain;
            const calcY = (x - box.x - box.width / 2) / constrain;
            return `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
        }

        function transformElement(element, xy) {
            if (!element) return;
            element.style.transform = transforms(...xy, element);
        }

        function transformMain(xy) {
            if (isEnabled && tapeClone && backgroundClone) {
                window.requestAnimationFrame(() => {
                    transformElement(tapeClone, xy);
                    transformElement(backgroundClone, xy);
                });
            }
        }

        const handleMouseMove = (e) => {
            lastKnownPos = [e.clientX, e.clientY];
            transformMain(lastKnownPos);

            // Move custom cursor and showcase tags
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

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        return () => {
            // Cleanup event listeners
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="App">
            <Cursor />
            <div className="Hero">
                <div className="HeroBackground"></div>
                <Background />
                <Tape />
            </div>
            <LandingCTA />
            <ShowcaseTitle />
            <Showcase />
        </div>
    );
}

export default App;