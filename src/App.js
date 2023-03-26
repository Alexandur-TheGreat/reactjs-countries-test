import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CountriesMenu from './components/CountriesMenu';
import SelectedCountry from './components/SelectedCountry';

function App() {
  return (
  <BrowserRouter> 
    <Routes>
      <Route exact path='/' Component={CountriesMenu} />
      <Route exact path="/:name" Component={SelectedCountry} ></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
