import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import '../styles/Homepage.scss';
import useAuth from '../useAuth';



export default function Header() {

    const { user, logout } = useAuth();
    
    return (
        <>
            <header>
                <Navbar bg='light' expand='lg'>
                <Container>
                    <Navbar.Brand href='/dashboard'>KardiAssist</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                        { user ? <Nav.Link href='/studies'>Studies</Nav.Link> : null}
                        { user && user.isAdmin ? <Nav.Link href='user/addUser'>Add User</Nav.Link> : null }
                        { !user ? <Nav.Link href='/login'>Log in</Nav.Link> : <Nav.Link href='/' onClick={() => { logout(); }}>Log out</Nav.Link> }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </header>
        </>
    );
}