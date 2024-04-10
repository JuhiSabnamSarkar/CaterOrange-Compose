import HomeContent from "./pages/HomeContent.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  link
} from "react-router-dom"

import Cart from "./pages/Cart.js"
import Loginpage from "./screens/LoginScreen.js";
import SignupPage from "./screens/SignupScreen.js";
import Layout from "./layout/Layout.js";


function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Layout children={<HomeContent />}/>} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<Layout children={<Cart />}/>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
