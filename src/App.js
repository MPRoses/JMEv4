import './App.css';
import Background from './components/Background.tsx';
import Tape from './components/Tape.tsx'
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

        // Rest of your code (without event listeners)
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
        });

        $(document).on("scroll", function () {
            transformMain(lastKnownPos);
        });



});


  return (
    <div className="App">
      {/*App is divided into background items; ones which regularly appear over multiple pages and ones that are not reused and made for a part*/}
      {/*BACKGROUND ITEMS*/}
      <Background/>
        {/*HERO PARTS*/}
        <div>
            <Tape/>
        </div>
    </div>
  );
}

export default App;
