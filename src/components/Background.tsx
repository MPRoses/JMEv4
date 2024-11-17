// @ts-ignore
import $ from "jquery";
import "./../styles/Background.css";
import React from "react";

function Background(): JSX.Element {
    // Define the type for the color themes array
    const colorthemes: string[][] = [
        ["#FC8E00", "#798A9A", "#E6BD69", "#254562", "#F60000"],
        ["#D9B800", "#ADB9C1", "#D6CC98", "#00709E", "#D90000"],
        ["#267AD9", "#86786B", "#335497", "#C5A993", "#26D9D9"],
        ["#FFD19C", "#C9DDEF", "#FFD681", "#BCE1FF", "#FFC9C9"],
        ["#9D9D9D", "#868686", "#C1C1C1", "#3C3C3C", "#4C4C4C"],
    ];

    let currentThemeCounter = 0;

    // Update Background with Async Support
    async function updateBackground(): Promise<void> {
        if (currentThemeCounter === 5) {
            currentThemeCounter = 0;
        }

        const currentTheme = colorthemes[currentThemeCounter];

        $(".out-top").css("fill", currentTheme[0]);
        $(".in-top").css("fill", currentTheme[1]);
        $(".out-bottom").css("fill", currentTheme[2]);
        $(".in-bottom").css("fill", currentTheme[3]);
        $(".background, body").css("background-color", currentTheme[4]);

        currentThemeCounter++;
    }

    // Trigger background updates at intervals
    setInterval(updateBackground, 15000);

    // Function to handle the initial background setup
    function enterBackground(): void {
        setTimeout(() => {
            $(".svgTop, .svgBottom").css({
                left: 0,
                top: 0,
            });

            $("#tape-container").css("animation", "dropIn 1.5s forwards ease 1s");

            currentThemeCounter = Math.floor(Math.random() * 4);
            updateBackground();

            setTimeout(() => {
                $(".out-top, .in-top, .out-bottom, .in-bottom").css(
                    "transition",
                    "fill 15s cubic-bezier(.83,-0.01,.36,1.02)"
                );
                $(".background").css(
                    "transition",
                    "background-color 15s cubic-bezier(.83,-0.01,.36,1.02), transform 1s cubic-bezier(0.16, 0.69, 0.26, 0.88), opacity 1s ease-in-out .25s"
                );
                $("body").css(
                    "transition",
                    "background-color 15s cubic-bezier(.83,-0.01,.36,1.02), opacity 1s ease-in-out .25s"
                );
            }, 2000);
        }, 250);
    }

    // Run enterBackground on DOM ready
    $(() => {
        enterBackground();
    });

    // JSX structure
    return (
        <div className="fixedbg">
            <div className="background">
                <svg
                    className="svgTop"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    viewBox="0 0 100 100"
                >
                    <path
                        fill="#FC8E00"
                        className="out-top"
                        d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
                    />
                    <path
                        fill="#798A9A"
                        className="in-top"
                        d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
                    />
                </svg>
                <svg
                    className="svgBottom"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    viewBox="0 0 100 100"
                >
                    <path
                        fill="#E6BD69"
                        className="out-bottom"
                        d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
                    />
                    <path
                        fill="#254562"
                        className="in-bottom"
                        d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
                    />
                </svg>
            </div>
        </div>
    );
}

export default Background;