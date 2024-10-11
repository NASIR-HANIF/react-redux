import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Cmp/Home';
import Images from './Cmp/Images';
//import Layout from './Cmp/Layout';
import NotFound from './Cmp/NotFound';
import Login from './Cmp/Login';
import Profile from './Cmp/Profile';
import Protected from './Protected';
import Products from './Cmp/Products';
import 'animate.css';
import Post from './Cmp/Post';
import Layout from './Cmp/Layout/index2';
import Cart from './Cmp/Cart/Cart';


function App() {
  return (
    <Router>

      
        <Routes>
          <Route path="/"
            element={<Layout><Home /></Layout>}
          />
          <Route path="/images"
            element={<Layout><Images /></Layout> }
          />
          <Route path="/login"
            element={<Layout><Login /></Layout> }
          />
          <Route path="/products"
            element={<Layout><Products /></Layout> }
          />
          
         
          <Route element={<Protected />}>
            <Route path="/profile" element={<Layout><Profile /></Layout>}/>
            <Route path="/post" element={<Layout><Post /></Layout>}/>
            <Route path="/cart" element={<Layout><Cart /></Layout> }
          />
           
          </Route>
          <Route path="/*"
            element={<Layout><NotFound /></Layout>}
          />
        </Routes>
   

    </Router>
  );
}


// layout handle with single Layout compunent
/* 
function App() {
  return (
    <Router>

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/images" element={<Images />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>

    </Router>
  );
}
*/


export default App;
