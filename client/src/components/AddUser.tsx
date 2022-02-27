import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../useAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface AddUserInputs {
  firstName: string;
  lastName:string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export default function AddUser() {
  const { register, handleSubmit, reset } = useForm<AddUserInputs>();
  const { addUser, loading, error } = useAuth();

  const onSubmit: SubmitHandler<AddUserInputs> = async ({ firstName, lastName, email, password, isAdmin }) => {
    addUser(firstName, lastName, email, password, isAdmin);
  };

  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
      <main>
        <h2>Add User Page</h2>
        <Form onSubmit={ handleSubmit(onSubmit) } >
          <Form.Group className='mb-3'>
            <Form.Label>First Name</Form.Label>
            <Form.Control type='text' {...register('firstName',  { required: true })} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' {...register('lastName',  { required: true })} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' {...register('email',  { required: true })} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' {...register('password',  { required: true })} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Is this user an Admin</Form.Label>
            <Form.Check {...register('isAdmin',  { required: true })}
              type='switch'
              label='isAdmin'
            />
          </Form.Group>
          <Button disabled={loading} variant='primary' type='submit'>
            Submit
          </Button>
        </Form>

      </main>
    </>
  );
}