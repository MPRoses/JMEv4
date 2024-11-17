import './App.css';
import Background from './components/Background.tsx';
import Tape from './components/Tape.tsx';
import Cursor from './components/Cursor.tsx';
import LandingCTA from './components/LandingCTA.tsx';
import $ from 'jquery';

function App() {

    /*CODE FOR MOVING ANIMATION OF BACKGROUND AND TAPE DEPENDENT ON CURSOR'S POSITION*/
    $(() => {
        // Clear existing event listeners by replacing elements with their clones
        const $ex1Layer = $("#tape-movement");
        const $ex2Layer = $(".background");

        const $ex1Clone = $ex1Layer.clone();
        const $ex2Clone = $ex2Layer.clone();
        $ex1Layer.replaceWith($ex1Clone);
        $ex2Layer.replaceWith($ex2Clone);

        let constrain = 50;
        let isEnabled = true;
        let lastKnownPos = [0, 0];

        function transforms(x, y, $el) {
            let box = $el[0].getBoundingClientRect(); // Use the DOM node from jQuery object
            let calcX = -(y - box.y - box.height / 2) / constrain;
            let calcY = (x - box.x - box.width / 2) / constrain;
            return `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
        }

        function transformElement($el, xyEl) {
            $el.css("transform", transforms.apply(null, xyEl.concat([$el])));
        }

        function transformMain(xy) {
            if (isEnabled) {
                let position = xy.concat([$ex1Clone]);
                window.requestAnimationFrame(() => {
                    transformElement($ex1Clone, position);
                    transformElement($ex2Clone, position);
                });
            }
        }

        $("body").on("mousemove", function (e) {
            lastKnownPos = [e.clientX, e.clientY];
            transformMain(lastKnownPos);
            $("#custom-cursor").css({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            });
        });

        $(document).on("scroll", function () {
            transformMain(lastKnownPos);
        });

    });

    $(document).ready(function() {
        $(window).on('scroll', function() {
            // Get the current scroll position as a percentage of 0vh to 50vh
            const scrollTop = $(window).scrollTop();
            const maxScroll = $(document).height() * 0.5; // 50vh (50% of the document height)

            // Calculate the ratio based on the scroll position
            const ratio = Math.min(scrollTop / maxScroll, 1); // Clamp between 0 and 1

            // Calculate the intermediate values based on the ratio
            const borderRadius = 50 * ratio; // border-radius from 0px to 25px
            const left = 150 * ratio; // left from 0px to 75px
            const width = `calc(100vw - ${300 * ratio}px)`; // width from 100vw to 100vw - 150px

            // Apply the calculated values to the Hero element
            $('.Hero').css({
                'border-radius': `${borderRadius}px`,
                'left': `${left}px`,
                'width': width
            });
        });
    });


    return (
        <div className="App">
            <Cursor/>
            <div className="Hero">
                <div className="HeroBackground"></div>
                <Background/>
                <Tape/>
            </div>
            <LandingCTA/>
        </div>
    );
}

export default App;