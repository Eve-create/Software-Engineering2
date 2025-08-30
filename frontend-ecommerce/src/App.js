import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginRegister from './Pages/LoginRegister';
import Home from './Pages/Home';
import CulturalVideos from "./Pages/CulturalVideos";
import CulturalImages from "./Pages/CulturalImages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginRegister/>}></Route>
        <Route path='/register' element={<LoginRegister/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path="/cultural-videos" element={<CulturalVideos />}></Route>
        <Route path="/cultural-images" element={<CulturalImages />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
