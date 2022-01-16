import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BeastieLand } from '../BeastieLand/BeastieLand';
import { GodService } from '../GodService/GodService';
import { useState, createContext } from 'react';

const AppContext = createContext();
function App() {
  const [temp, setTemp] = useState(
    JSON.parse(localStorage.getItem('currentTemp')) || 11
  );
  const value = { temp, setTemp };
  return (
    <BrowserRouter>
      <AppContext.Provider value={value}>
        <Routes>
          <Route exact path='/' element={<BeastieLand />}></Route>
          <Route exact path='/godservice' element={<GodService />}></Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export { App, AppContext };
