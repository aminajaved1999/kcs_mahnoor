import './App.css';
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import Login from './Login';
import Nav from './Nav';
import Main from './Main';
import { library } from '@fortawesome/fontawesome-svg-core';
import{BrowserRouter,Route, Routes} from 'react-router-dom';
import { fas } from '@fortawesome/free-solid-svg-icons';
import "primereact/resources/themes/md-light-indigo/theme.css";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './Footer';
import Dispatch from './Dispatch';

library.add(fas);

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route exact path='/' element={[<Login/>]}/>
      <Route path='/bookings' element={[<Nav/>,<Main/>,<Footer/>]}/>
      <Route path='/dispatch' element={[<Nav/>,<Dispatch/>,<Footer/>]}/>
     
      
      </Routes>
    </BrowserRouter>
 
      
    </>
  );
}

export default App;
