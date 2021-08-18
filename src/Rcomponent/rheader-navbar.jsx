import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import Logo from '../Rimage/Vector.png'
import search from '../Rimage/search.png'
import Fav from '../Rimage/favorite.png'
import hist from '../Rimage/history.png'

const Rheader = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home" font='SF UI Display' size='24px'> <img
                    alt=""
                    src={Logo}
                    width="28"
                    height="28"
                    className="d-inline-block align-top"
                />{'  '}ImageStock</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets"><img
                            alt=""
                            src={ search }
                            width="20"
                            height="20"
                            className="d-inline-block align-top"
                        />{'  '} Поиск</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes"><img
                            alt=""
                            src={ Fav }
                            width="21"
                            height="21"
                            className="d-inline-block align-top"
                        />{'  '}
                            Избранное
                        </Nav.Link>
                        <Nav.Link href="#deets"> <img
                            alt=""
                            src={ hist }
                            width="21"
                            height="21"
                            className="d-inline-block align-top"
                        />{'  '}История поиска</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Rheader;