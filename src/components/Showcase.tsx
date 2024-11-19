import * as React from 'react';
import { useEffect } from 'react';
import './../styles/Showcase.css';
// @ts-ignore
import ThreeImageEffect from "./ThreeIMG.tsx";
// @ts-ignore
import $ from 'jquery';
// @ts-ignore
import FWW from "./../img/FWW.png"
// @ts-ignore
import FURALL from "./../img/FURALL.png";
// @ts-ignore
import PORTFOLIO from "./../img/PORTFOLIO.png";
// @ts-ignore
import ScrollAnime from "./EnterItem.tsx";
// @ts-ignore
import anime from "animejs";


const Cursor: React.FC = () => {
    const enterItem = (element: HTMLElement) => {
        const name = $(element).children().eq(0).html();
        const tag = $(".ShowcaseTag");

        tag.addClass("active");
        tag.html(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`);
    };


    useEffect(() => {
        let flag = false; // Prevent simultaneous animations
        let leaveCompleted = true; // Track if the `mouseleave` animation has completed

        const handleMouseEnter = (e: any) => {
            if (flag) return; // Prevent entering if animation is ongoing
            flag = true;
            leaveCompleted = false; // `mouseleave` animation is no longer complete

            const name = $(e.currentTarget).children().eq(0).html();
            const tag = $(".ShowcaseTag");

            tag.addClass("active");
            tag.html(`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`);
        };

        const handleMouseLeave = () => {
            const tag = $(".ShowcaseTag");
            tag.removeClass("active");

            setTimeout(() => {
                leaveCompleted = true; // Mark that `mouseleave` animation is complete
                flag = false; // Allow new `mouseenter` animations
            }, 500); // Matches the animation duration
        };

        const handleMouseMove = (e: any) => {
            if (!leaveCompleted || $(".ShowcaseTag").hasClass("active")) return; // Skip if `mouseleave` hasn't completed or already active
            enterItem(e.currentTarget); // Trigger enterItem only if allowed
        };

        $(".ShowcaseItem")
            .on("mouseenter", handleMouseEnter)
            .on("mouseleave", handleMouseLeave)
            .on("mousemove", handleMouseMove);

        // Cleanup on unmount
        return () => {
            $(".ShowcaseItem")
                .off("mouseenter", handleMouseEnter)
                .off("mouseleave", handleMouseLeave)
                .off("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div>
            {/* ScrollAnime Wrapper */}

            <ScrollAnime
                enterAt={1.1 * window.innerHeight}  // Items 1 and 2 enter at 90% of viewport height
                exitAt={0.7 * window.innerHeight}   // Reverse animation when below 40% of viewport height
                targets={".SItem-1, .title-container"} // Target Item 1 and 2
                animationProps={{
                    opacity: [0, 1],
                    translateY: ["50px", "0px"],
                    easing: "cubicBezier(.6,.31,.23,.98)",
                    filter: ["blur(10px)", "blur(0px)"],
                    duration: 1000,
                    delay: anime.stagger(250),
                }}
                reverseAnimationProps={{
                    opacity: [1, 0],
                    translateY: ["0px", "50px"],
                    easing: "cubicBezier(.2,.81,.35,.98)",
                    filter: ["blur(0px)", "blur(10px)"],
                    duration: 500,
                }}
            />

            <ScrollAnime
                enterAt={.4 * window.innerHeight}  // Items 1 and 2 enter at 90% of viewport height
                exitAt={0.1 * window.innerHeight}   // Reverse animation when below 40% of viewport height
                targets={".word, .FindOutHowCTA"} // Target Item 1 and 2
                animationProps={{
                    opacity: [0, 1],
                    translateY: ["10px", "0px"],
                    easing: "cubicBezier(.6,.31,.23,.98)",
                    filter: ["blur(10px)", "blur(0px)"],
                    duration: 250,
                    delay: anime.stagger(75),
                }}
                reverseAnimationProps={{
                    opacity: [1, 0],
                    translateY: ["0px", "10px"],
                    easing: "cubicBezier(.2,.81,.35,.98)",
                    filter: ["blur(0px)", "blur(10px)"],
                    duration: 100,
                }}
            />

            <ScrollAnime
                enterAt={3 * window.innerHeight}  // Items 1 and 2 enter at 90% of viewport height
                exitAt={2.5 * window.innerHeight}   // Reverse animation when below 40% of viewport height
                targets={".SItem-2"} // Target Item 1 and 2
                animationProps={{
                    opacity: [0, 1],
                    translateY: ["150px", "0px"],
                    easing: "cubicBezier(.6,.31,.23,.98)",
                    filter: ["blur(10px)", "blur(0px)"],
                    duration: 1000,
                    delay: anime.stagger(250),
                }}
                reverseAnimationProps={{
                    opacity: [1, 0],
                    translateY: ["0px", "150px"],
                    easing: "cubicBezier(.2,.81,.35,.98)",
                    filter: ["blur(0px)", "blur(10px)"],
                    duration: 500,
                }}
            />

            {/* Showcase Container with Items */}
            <div className="ShowcaseContainer">
                <div className="ShowcaseItem SItem-1 clickable">
                    <p>Furall</p>
                    <ThreeImageEffect imageUrl={FURALL} />
                </div>
                <div className="ShowcaseItem SItem-1 clickable">
                    <p>Franse Werkwoorden</p>
                    <ThreeImageEffect imageUrl={FWW} />
                </div>
                <div className="ShowcaseItem SItem-2 clickable">
                    <p>Portfolio</p>
                    <ThreeImageEffect imageUrl={PORTFOLIO} />
                </div>
                <div className="ShowcaseTag">
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TEST&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                </div>
            </div>
        </div>
    );
};

export default Cursor;