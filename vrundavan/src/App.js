// import logo from './logo.svg';
// import { Link } from 'react-router-dom';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';

// App Routes
import Header  from './components/Header';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Products from './components/Products';
import Footer from './components/Footer';
import Error from './components/Error';
// Admin Routes
import AdminLogin from './admin/Adminlog';
import Deshbord from './admin/Deshbord';
import AdminHeader from './admin/AdminHeader';
import AdminFooter from './admin/AdminFooter';
import AdminProduct from './admin/AdminProduct';
import AdminFeedback from './admin/Feedback';
import AdminOrder from './admin/AdminOrder';
import Billing from './admin/Billing';

function PrivateRoute ({ children }) {
    const isAdminAuthenticted = Boolean(localStorage.getItem('adminToken'));
    return isAdminAuthenticted ? children : <Navigate to="/login" replace>;</Navigate>
}

function App() {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideLayout = location.pathname === '/404' || location.pathname === '/*';

  return (
    <>
      <div>
        {!hideLayout && (isAdminRoute ? <AdminHeader /> : <Header />)}
        <div className="main-content ">
          <div className="mt-4">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />

              <Route path="*" element={<Error />} />

              <Route path="/Login" element={<AdminLogin />} />

              
                  <Route path="/admin/deshbord" element={<PrivateRoute><Deshbord /></PrivateRoute>} />
                  <Route path="/admin/product" element={<PrivateRoute><AdminProduct /></PrivateRoute>} />
                  <Route path="/admin/product/:id" element={<PrivateRoute><AdminProduct /></PrivateRoute>} />
                  <Route path="/admin/feedback" element={<PrivateRoute><AdminFeedback /></PrivateRoute>} />
                  <Route path="/admin/Order" element={<PrivateRoute><AdminOrder /></PrivateRoute>} />
                  <Route path="/admin/billing" element={<PrivateRoute><Billing /></PrivateRoute>} />
          </Routes>      
          </div>
        </div>
        {!hideLayout && (isAdminRoute ? <AdminFooter /> : <Footer />)}
      </div>
    </>
  );
}

export default App;
