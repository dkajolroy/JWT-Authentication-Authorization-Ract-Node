import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBars from './Components/Common/NavBars';
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Admin from './Pages/Admin'
import Footer from './Components/Common/Footer';

function App() {
  return (
    <BrowserRouter>
      <NavBars />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
