import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginRegister from './Pages/LoginRegister';
import Home from './Pages/Home';
import CulturalVideos from "./Pages/CulturalVideos";
import CulturalImages from "./Pages/CulturalImages";
import DonationPayment from "./Pages/DonationPayment";
import DonationHistory from "./Pages/DonationHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginRegister/>} />
        <Route path='/register' element={<LoginRegister/>} />
        <Route path='/home' element={<Home/>} />
        <Route path="/cultural-videos" element={<CulturalVideos />} />
        <Route path="/cultural-images" element={<CulturalImages />} />
        <Route path="/donation-payment" element={<DonationPayment />} />
        <Route path="/donation-history" element={<DonationHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
