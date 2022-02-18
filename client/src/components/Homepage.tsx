import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import '../styles/Homepage.scss';

export default function Homepage() {

    return (
        <>
          <main>
            <h2>Welcome to the homepage!</h2>
            <div className="btnContainer">
              <Link to="/login">
                <Button variant="primary">Log in</Button>
              </Link>
            </div>
          </main>
        </>
    );
  }