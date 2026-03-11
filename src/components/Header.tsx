import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="sm" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Pizza Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">All Pizza</Nav.Link>
            <Nav.Link href="/kosar">Kosár</Nav.Link>
            <Nav.Link href="/create">Létrehozás</Nav.Link>
            <Nav.Link href="/login">Bejelentkezés</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
