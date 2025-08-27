import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginRegister from './Pages/LoginRegister';
import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginRegister/>}></Route>
        <Route path='/register' element={<LoginRegister/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
