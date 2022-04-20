import React, { useState, useEffect, useLayoutEffect } from "react";
import { getNav } from "./services/getNav";

import {
  Nav,
  NavDropdown,
  Navbar,
  Col,
  Row,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";

import "./App.css";

const ExampleNavBar = ({ menuItems }) => {
  const navBar = Object.entries(menuItems).map((value) => {
    if (value[1].children.length) {
      const children = value[1].children.map((child) => (
        <NavDropdown.Item href={child.attributes.url}>
          {child.attributes.title}
        </NavDropdown.Item>
      ));
      return (
        <NavDropdown
          title={value[1].parent.attributes.title}
          id="collasible-nav-dropdown"
        >
          {children}
        </NavDropdown>
      );
    } else {
      return (
        <Nav.Link href={value[1].parent.attributes.url}>
          {value[1].parent.attributes.title}
        </Nav.Link>
      );
    }
  });

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">FanDuel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">{navBar}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const ExampleFooter = ({ menuItems }) => {
  const footer = Object.entries(menuItems).map((value) => {
    if (value[1].children.length) {
      const children = value[1].children.map((child) => (
        <ListGroupItem>
          <a
            href={child.attributes.url}
            style={{ color: "black", textDecoration: "none " }}
          >
            {child.attributes.title}
          </a>
        </ListGroupItem>
      ));
      return (
        <Card border="light" style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Title> {value[1].parent.attributes.title}</Card.Title>
            <ListGroup variant="flush">{children}</ListGroup>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card border="light" style={{ width: "15rem" }}>
          <Card.Body>
            <Card.Title> {value[1].parent.attributes.title}</Card.Title>
          </Card.Body>
        </Card>
        // <Card href={value[1].parent.attributes.url}>
        //   {value[1].parent.attributes.title}
        // </Card>
      );
    }
  });

  return (
    <>
      <Container style={{ display: "flex", flexWrap: "wrap" }}>
        {footer}
      </Container>
    </>
  );
};

const App = () => {
  const [mentList, setMenuList] = useState({});
  const [menuFooter, setMenuFooter] = useState({});
  let menu = {};
  let menuF = {};

  useEffect(() => {
    getNav("data").then((items) => {
      for (const item of items) {
        if (item.attributes.parent) {
          let { children } = menu[item.attributes.parent];
          children = children.concat(item);

          menu[item.attributes.parent] = {
            ...menu[item.attributes.parent],
            children,
          };
        } else {
          menu[item.id] = { children: [], parent: item };
        }
        // console.log(menu)
      }

      setMenuList(menu);
    });
    getNav("dataFooter").then((items) => {
      for (const item of items) {
        if (item.attributes.parent) {
          let { children } = menuF[item.attributes.parent];
          children = children.concat(item);

          menuF[item.attributes.parent] = {
            ...menuF[item.attributes.parent],
            children,
          };
        } else {
          menuF[item.id] = { children: [], parent: item };
        }
        // console.log(menu)
      }

      setMenuFooter(menuF);
    });
  }, []);

  useLayoutEffect(() => {
    // do something
  }, []);

  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <ExampleNavBar menuItems={mentList}>
          <span role="img" aria-label="tada">
            🎉
          </span>
        </ExampleNavBar>
        <Container>
          <Row>
            <Col>
              {" "}
              <Card>
                <Card.Header as="h5">Featured</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              {" "}
              <Card>
                <Card.Header as="h5">Featured</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Header as="h5">Featured</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              {" "}
              <Card>
                <Card.Header as="h5">Featured</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              {" "}
              <Card>
                <Card.Header as="h5">Featured</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
      <ExampleFooter menuItems={menuFooter} />
    </Container>
  );
};

export default App;
