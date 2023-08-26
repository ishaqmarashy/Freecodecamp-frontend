import './App.css';
import Random_Quote_Machine from './components/Random_Quote_Machine';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='nav'> Nav here</div>
        <div className='proj-container'>
        <Random_Quote_Machine></Random_Quote_Machine>
        </div>
      </header>
    </div>
  );
}

export default App;
