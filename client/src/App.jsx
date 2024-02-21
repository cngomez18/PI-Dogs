import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home'
 
function App() {



  
  return (
    <div className="App">

      <h1>Henry Dogs</h1>

      <Router>
        <Routes>
          
          <Route path="/" element={<Landing />} />

          <Route path="/home" element={<Home />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
