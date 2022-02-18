import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Inputs = {
  email: string,
  password: string
};

export default function Login() {

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data);
    await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => { console.log(data) })
    .catch(error => { console.log(error) });
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <main>
        <h2>Login Page</h2>
        <Form onSubmit={ handleSubmit(onSubmit) } >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" {...register('email',  { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" {...register('password',  { required: true })} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Link to="/auth/google">
                <Button variant="primary">Sign up</Button>
        </Link>
        <a href='http://localhost:5000/auth/google'>
          <Button variant="primary">Log in with Google</Button>
        </a>
      </main>
    </>
  );
}