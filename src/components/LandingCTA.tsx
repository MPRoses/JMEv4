import React, { useEffect } from "react";
// @ts-ignore
import $ from "jquery";
import './../styles/LandingCTA.css';
// @ts-ignore
import anime from "animejs";


function LandingCTA() {

    useEffect(() => {
        let ran = 0;
        // Scroll event handler
        const handleScroll = () => {
            const scrollTop = $(window).scrollTop(); // Current scroll position
            const vh = $(window).height(); // Viewport height

            // Scroll range between 15vh and 150vh
            const startScroll = 0.15 * vh;
            const endScroll = 1.5 * vh;

            // Normalize scroll position to [0, 1] in the specified range
            const progress = Math.min(Math.max((scrollTop - startScroll) / (endScroll - startScroll), 0), 1);

            // Calculate translateX values for each paragraph
            const p1Translate = -50 + progress * (100 - -50); // From -50px to 100px
            const p2Translate = 50 + progress * (-100 - 50); // From 50px to -100px

            // Apply styles dynamically
            $(".LandingCTA p:nth-child(1):not(.FindOutHowCTA p)").css("transform", `translateX(${p1Translate}px)`);
            $(".LandingCTA p:nth-child(2):not(.FindOutHowCTA p)").css("transform", `translateX(${p2Translate}px)`);


            if (scrollTop > 0.3 * $(window).height() && ran === 0) {
                ran++;
                anime({
                    targets: ".textable .word, .FindOutHowCTA",
                    opacity: [0, 1],
                    translateY: ["10px", "0px"],
                    easing: "cubicBezier(.2,.81,.35,.98)",
                    filter: ["blur(10px)", "blur(0px)"],
                    duration: 300,
                    delay: anime.stagger(125)
                })
            } else if (scrollTop < 0.2 * $(window).height() && ran > 0) {
                anime({
                    targets: ".textable .word, .FindOutHowCTA",
                    opacity: [0],
                    translateY: ["0px"],
                    easing: "cubicBezier(.2,.81,.35,.98)",
                    filter: ["blur(0px)"],
                    duration: 0
                })
                ran = 0
            }
        };

        $(".LandingCTA p").on("mouseenter", () => {
           $(".word-shifts").css("transform", "rotate(3deg)");
        }).on("mouseleave", () => {
            $(".word-shifts").css("transform", "rotate(0deg)");
        });

        $(".FindOutHowCTA").on("mouseenter", function (e : MouseEvent) {
            console.log(e.clientX);
            if (e.clientX > 0.5 * $(window).width()) {
                $(".CTA-circle").css({"left": "250px", "transform": "scale(15)"});
            } else {
                $(".CTA-circle").css({"left": "-50px", "transform": "scale(15)"});
            }
            $(".FindOutHowCTA p").css("color", "white");
            //$(".CTA-circle");
        }).on("mouseleave", function () {
            $(".CTA-circle").css("transform", "scale(0)");
            $(".FindOutHowCTA p").css("color", "#0c0c0c");
        })

        // Attach scroll event listener
        $(window).on("scroll", handleScroll);

        // Cleanup on component unmount
        return () => {
            $(window).off("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="LandingCTA">
            <p className="textable">
                <span className="word">
                    I
                </span>
                &nbsp;
                <span className="word">
                    create
                </span>
                &nbsp;
                <span className="word">
                    digital
                </span>
                &nbsp;
                <span className="word">
                    experiences
                </span>
                &nbsp;
                <span className="word">
                    with
                </span>
            </p>
            <p className="textable">
                <span className="word">
                    creativity
                </span>
                &nbsp;
                <span className="word">
                    that
                </span>
                &nbsp;
                <span className="word word-shifts">
                    shifts
                </span>
                &nbsp;
                <span className="word">
                    perspectives
                </span>
            </p>
            <div className="FindOutHowCTA clickable">
                <div className="CTA-circle"></div>
                <p>FIND OUT HOW</p>
            </div>
        </div>
    );
}

export default LandingCTA;