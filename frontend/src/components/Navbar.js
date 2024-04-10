import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart3 } from 'react-bootstrap-icons';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { XCircle } from 'react-bootstrap-icons';
import { useCart } from '../Hooks/CartContext';
import Badge from 'react-bootstrap/Badge';
import { Navigate } from 'react-router-dom';


export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { cart } = useCart();
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const closeSignup = () => {
    setShowSignup(false);
  };

  const getTotal = (order) => {
    return order?.reduce((total, item) => {
      const { mealQuantity, addOns } = item;
      const { todaysSpecialSweet = 0, moongDalHalwa = 0, gulabJamoon = 0, } = addOns;

      const subtotal = (todaysSpecialSweet + moongDalHalwa + gulabJamoon) + mealQuantity;

      return total + subtotal;
    }, 0);
  };
  const redirectPage = () => {
    window.location.href = '/';
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <div>
              <Link className="navbar-brand fs-3 fst-italic" to="/" onMouseEnter={(e) => e.target.style.color = 'red'} onMouseLeave={(e) => e.target.style.color = 'white'}>CaterOrange</Link>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}  onMouseEnter={(e) => e.target.style.color = 'red'} onMouseLeave={(e) => e.target.style.color = 'white'}>HOME</Link>
            </div>
            <div><Link to="/cart" style={{ textDecoration: 'none' }}><Cart3 style={{ color: 'white' }}  onMouseEnter={(e) => e.target.style.color = 'red'} onMouseLeave={(e) => e.target.style.color = 'white'}/> {<Badge pill bg="danger"> {getTotal(cart)} </Badge>}</Link></div>
            <div style={{ color: 'white', display: 'flex', gap: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
              <Link onClick={toggleLogin} style={{ textDecoration: 'none', color: 'white' }}  onMouseEnter={(e) => e.target.style.color = 'red'} onMouseLeave={(e) => e.target.style.color = 'white'}>Login</Link>&nbsp;/&nbsp;<Link onClick={toggleSignup} style={{ textDecoration: 'none', color: 'white' }}  onMouseEnter={(e) => e.target.style.color = 'red'} onMouseLeave={(e) => e.target.style.color = 'white'}>Register</Link>
              </div>
              <button onClick={redirectPage} style={{ border: 'none', backgroundColor: 'yellow', color: 'red', height: '2.5rem', width: '9rem', fontWeight: 'bold' }}>Order Now</button>
            </div>
          </div>
        </nav>
      </div>
      {showLogin && (
        <div className="login-overlay" style={{ position: 'fixed', top: 0, left: 0, zIndex: 4, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
          <div>
            <XCircle onClick={closeLogin} style={{ height: '40px', width: '40px', color: 'white', zIndex: '5', backgroundColor: 'red', position: 'absolute', top: 0, right: 0, borderRadius: '100%' }} />
          </div>
          <div style={{ backgroundColor: 'white', padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoginScreen />
          </div>
        </div>
      )}
      {showSignup && (
        <div className="login-overlay" style={{ position: 'fixed', top: 0, left: 0, zIndex: 4, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
          {/* Your login form or component goes here */}
          <div>
            <XCircle onClick={closeSignup} style={{ height: '40px', width: '40px', color: 'white', zIndex: '5', backgroundColor: 'red', position: 'absolute', top: 0, right: 0, borderRadius: '100%' }} />
          </div>
          <div style={{ backgroundColor: 'white', padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <SignupScreen />
          </div>
        </div>
      )}
    </>
  );
}
