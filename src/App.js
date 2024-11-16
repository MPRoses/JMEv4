import './App.css';
import Background from './components/Background.tsx';

function App() {
  return (
    <div className="App">
      {/*App is divided into background items; ones which regularly appear over multiple pages and ones that are not reused and made for a part*/}
      {/*BACKGROUND ITEMS*/}
      <Background/>

    </div>
  );
}

export default App;
