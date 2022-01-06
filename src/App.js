import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Container from './components/layout/Container';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';

function App() {
  return (
    <Router>

      <nav>
          <Link to= "/">Home</Link>
          <Link to= "/company">Company</Link>
          <Link to= "/contact">Contact</Link>
          <Link to= "/newproject">NewProject</Link>      
      </nav>

      <Container customClass="min_height">
        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/company" element={<Company/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/newproject" element={<NewProject/>}></Route>
        </Routes>
      </Container>

        <p>Footer</p>

    </Router>
  );
}

export default App;
