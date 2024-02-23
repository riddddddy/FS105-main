import './App.css';
import './style.css';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upload from './pages/Upload';
import ForgotPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Error from './pages/Error';
import Faqs from './pages/Faqs';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import SingleProduct from './pages/SingleProduct';
import Welcome from './pages/Welcome';
import { useContext, useEffect, useState } from 'react';
import { allData } from './context/AppContext';
import UserManagementPage from './pages/UserManagementPage';
import Wishlist from './pages/Wishlist';
import ReviewPage from './pages/ReviewPage';
import UpdateUser from './pages/UpdateUser';
import SuccessPayment from './pages/SuccessPayment';

function App() {


  const [token, setToken] = useState('');
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const { shouldFetch, setShouldFetch, user } = useContext(allData);

  


  useEffect(() => {
    const existingTokenString = localStorage.getItem('user') || null
    const existingToken = JSON.parse(existingTokenString);

    if (existingToken && existingToken.token) {
      console.log(existingToken.token);
    } else {
      console.log('Token not found or invalid.');
    }

    if (existingToken) {
      setToken(existingToken.token)
      setRole(existingToken.user.role)
      setShouldFetch(false)
    }

  }, [shouldFetch])

  // useEffect(() => {
  //   // Simulate an API call
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  // if(loading){
  //   return(<div>Loading</div>)
  // }

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/register" element={!user ? <Register /> : <Home />} />
        <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to='/' />} />
        <Route path="/reset-password/:token" element={!user ? <ResetPassword /> : <Navigate to='/' />} />
        
        {token && role === 'admin' ? <>

          <Route path="/upload" element={<Upload />} />
          <Route path="/admin" element={<Admin />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element = {<Wishlist />} />
          <Route path="/update/:user_id" element={<UpdateUser />} />



        </> : <></>}

        {token && role === 'user' ? <>
          <Route path='/userdetails' element={<UserManagementPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element = {<Wishlist />} />
          <Route path='/successpayment' element={<SuccessPayment />} />
          {/* <Route path='/payment' element = {<Payment />} />
          <Route path='/completion' element = {<Completion />} /> */}
        </>:<></>
        }

        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path='*' element={<Error />} />
        <Route path='/faqs' element={<Faqs />} />
        <Route path='products/product/:bagName' element={<SingleProduct />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/reviews/:bagName' element = {<ReviewPage />} />
        
        
  
      </Routes>
      <Footer />
    </Router>


  );
}

export default App;
