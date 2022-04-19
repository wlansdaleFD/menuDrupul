import React, { useState , useEffect, useLayoutEffect} from 'react';
import {getNav} from './services/getNav'

import {Nav, NavDropdown, Navbar} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import './App.css';

const ExampleNavBar = ({ menuItems }) => {
  const [show, toggleShow] = useState(true);

  const navBar = Object.entries(menuItems).map((value) => {
    if(value[1].children.length) {
      const children =   value[1].children.map((child) => <NavDropdown.Item href={child.attributes.url}>{child.attributes.title}</NavDropdown.Item> )
      return  ( <NavDropdown title={value[1].parent.attributes.title} id="collasible-nav-dropdown">
                  {children}
                  </NavDropdown>)
    } else {
      return ( <Nav.Link href={value[1].parent.attributes.url}>{value[1].parent.attributes.title}</Nav.Link>)
    }
  })

  return (
    <>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">FanDuel</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      {navBar}
{/*       
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>

  </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  );
};

const App = () => {

  const [mentList, setMenuList] = useState({});
  let menu = {}

  useEffect(() => {
  
    getNav()
      .then(items => {

      
        for (const item of items) {
          if(item.attributes.parent) {
            let {children} = menu[item.attributes.parent]
            children = children.concat(item)
            
            menu[item.attributes.parent] = {...menu[item.attributes.parent], children}

          } else {
            menu[item.id] = {children: [], parent: item }
          }
          // console.log(menu)
          
        }
      
        setMenuList(menu)
      
      })

  }, [])
  
  useLayoutEffect(() => {
    // do something
  }, [])
  
  return (
  
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">

      <ExampleNavBar  menuItems={mentList}>

        <span role="img" aria-label="tada">
          🎉
        </span>
      </ExampleNavBar>
      <h1 className="header">Welcome To FanDuel</h1>
    </Container>
  </Container>
)};

export default App;
