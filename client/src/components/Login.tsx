import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../useAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


type Inputs = {
  email: string,
  password: string
};

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const { login, loading, error } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    login(data.email, data.password);
  };

  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
      <main>
        <h2>Login Page</h2>
        <Form onSubmit={ handleSubmit(onSubmit) } >
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' {...register('email',  { required: true })} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' {...register('password',  { required: true })} />
          </Form.Group>
          <Button disabled={loading} variant='primary' type='submit'>
            Submit
          </Button>
          {error && <p>Bad login/password</p>}
        </Form>

      </main>
    </>
  );
}