import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
const navstyle={
  backgroundColor: '#333',
  color:'#fff',
  padding:'10px',
  fontWeight: 'bold',
  textAlign:'center',
  fontSize:'20px',
};

  return (
    <div ><nav style={navstyle}>
      <ul>
        <li>LIBRARY MANAGEMENT SYSTEM</li></ul>
    </nav>
      {/* <Navbar  expand="lg" className="bg-body-tertiary ">
    <Container  >
      <Navbar.Brand>Brand text</Navbar.Brand>
    </Container>
  </Navbar> */}
  </div>
  )
}

export default Header