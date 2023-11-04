import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="input-form">
        <form>
          <label></label> 
          <input type="text" placeholder="search field"></input>
        </form>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
