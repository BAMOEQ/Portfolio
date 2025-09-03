//import logo from './public/ProfilePic.jpg';
import './App.css';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header /> 
      </header>
      <div className='App-body'>
        <main>
          <h1>BAMOEQ Portfolio</h1>
          <img src="/ProfilePic.jpg" className="App-logo" alt="logo" />
        </main>
      </div>
      
    </div>
  );
}

export default App;
