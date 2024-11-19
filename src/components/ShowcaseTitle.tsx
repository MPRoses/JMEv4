import { useEffect } from 'react';
// @ts-ignore
import $ from 'jquery';
// @ts-ignore
import gsap from 'gsap';
import './../styles/ShowcaseTitle.css';
import React from 'react';

const Title: React.FC = () => {
    useEffect(() => {
        const normalSpeed = 120;

        // GSAP timelines
        let tlMain = gsap.timeline({
            repeat: -1,
            defaults: {
                duration: 30,
                ease: "none"
            }
        });

        let tlTop = gsap.timeline({
            repeat: -1,
            defaults: {
                duration: normalSpeed,
                ease: "none"
            }
        });

        let tlBottom = gsap.timeline({
            repeat: -1,
            defaults: {
                duration: normalSpeed,
                ease: "none"
            }
        });

        // Animations
        tlMain.fromTo(".title-main",
            { x: "-2690px" },
            {
                x: "0",
                onStart: function () {
                    gsap.set(".title-main", { x: "-2690px" });
                }
            }
        );

        tlTop.fromTo(".title-topfade",
            { x: "0" },
            {
                x: "-2690px",
                onStart: function () {
                    gsap.set(".title-topfade", { x: "0" });
                }
            }
        );

        tlBottom.fromTo(".title-bottomfade",
            { x: "-2690px" },
            {
                x: "0",
                onStart: function () {
                    gsap.set(".title-bottomfade", { x: "-2690px" });
                }
            }
        );

        // Throttle function
        const throttle = (func: (...args: any[]) => void, limit: number) => {
            let inThrottle: boolean;
            return function (...args: any[]) {
                if (!inThrottle) {
                    func(...args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };

        // Scroll handler with throttling
        const handleScroll = throttle(() => {
            gsap.to([tlMain, tlTop, tlBottom], { timeScale: 3, duration: 0.15 });
            setTimeout(() => {
                gsap.to([tlMain, tlTop, tlBottom], { timeScale: 1, duration: 0.15 });
            }, 300);
        }, 200); // Adjust throttle delay as needed (200ms is a good starting point)

        // Attach throttled scroll handler
        $(window).off("scroll");
        $(window).on("scroll", handleScroll);

        // Cleanup on unmount
        return () => {
            $(window).off("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="title-container">
            <div></div>
            <div></div>
            <p className="title-main">PROJECTS ○ PROJECTS ○ PROJECTS ○ PROJECTS ○ PROJECTS ○ PROJECTS ○|</p>
            <p className="title-topfade">PROJECTS ○ PROJECTS ○ PROJECTS ○ PROJECTS ○ PROJECTS ○ PROJECTS ○</p>
            <p className="title-bottomfade">PROJECTS ○ PROJECTS ○ PROJECTS ○ PROJECTS ○ PROJECTS ○ PROJECTS ○</p>
        </div>
    );
};

export default Title;
