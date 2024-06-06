import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Otobusler from './components/Otobus';
import InsertOtobus from './components/InsertOtobus'
import UpdateOtobus from './components/UpdateOtobus';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';




function App() {
  return (
    <div className="App">
      <Navbar title="Bukrek Otonom Arac Sistemi" about="About"></Navbar>

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Otobusler" element={<Otobusler />} />
          <Route path="/insertotobus" element={<InsertOtobus />} />
          <Route path="/updateotobus/:id" element={<UpdateOtobus />} />
          <Route path="/about" element={<About />} />

        </Routes>

      </Router>


    </div>
  );
}

export default App;
