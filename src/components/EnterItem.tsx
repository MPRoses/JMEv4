import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import anime from "animejs";
// @ts-ignore
import $ from "jquery";

interface ScrollAnimeProps {
    enterAt: number; // ScrollTop at which the animation should start
    exitAt: number;  // ScrollTop at which the animation should reverse
    targets: string | string[]; // Anime.js target(s)
    animationProps: anime.AnimeParams; // Anime.js animation configuration
    reverseAnimationProps?: anime.AnimeParams; // Optional reverse animation configuration
}

const ScrollAnime: React.FC<ScrollAnimeProps> = ({
                                                     enterAt,
                                                     exitAt,
                                                     targets,
                                                     animationProps,
                                                     reverseAnimationProps,
                                                 }) => {
    const [hasRun, setHasRun] = useState(false); // Flag to track if animation has been run

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = $(window).scrollTop();

            // Trigger animation when `scrollTop` exceeds `enterAt`
            if (scrollTop > enterAt && !hasRun) {
                anime({
                    targets,
                    ...animationProps,
                });
                setHasRun(true);
            }

            // Reverse animation when `scrollTop` drops below `exitAt`
            if (scrollTop < exitAt && hasRun) {
                if (reverseAnimationProps) {
                    anime({
                        targets,
                        ...reverseAnimationProps,
                    });
                }
                setHasRun(false);
            }
        };

        // Attach scroll event listener
        $(window).on("scroll", handleScroll);

        // Cleanup event listener on unmount
        return () => {
            $(window).off("scroll", handleScroll);
        };
    }, [enterAt, exitAt, targets, animationProps, reverseAnimationProps, hasRun]);

    return null; // This component does not render anything
};

export default ScrollAnime;
