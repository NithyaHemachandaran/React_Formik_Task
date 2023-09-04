import { useState } from 'react'
import './App.css'
import Header from './component/Header';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import Books from './pages/Books';
import Authors from './pages/Authors'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header></Header>
    <Router>
      <div className="App">      
        <aside>
          <nav>
            <ul>
              <li>
                <Link to="/books">Books</Link>
              </li>
              <li>
                <Link to ="/authors">Authors</Link>
              </li>
              </ul>
          </nav>
        </aside>
        
        <main>
        <div className='content'>WELCOME TO LIBRARY</div>
          <Routes>
          <Route path="/books"  element ={<Books/>}/>
          <Route  path= "/authors"  element={<Authors/>}/>
          </Routes>
        </main>
        
      </div>
    </Router>
    
    </>
  );
}

export default App
