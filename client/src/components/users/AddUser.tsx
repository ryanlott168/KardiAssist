import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../../useAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

interface AddUserInputs {
  firstName: string;
  lastName:string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export default function AddUser() {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const defaultFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false
  }

  const { register, handleSubmit, reset } = useForm<AddUserInputs>({ defaultValues: defaultFormValues});
  const { addUser, loading, error } = useAuth();

  const onSubmit: SubmitHandler<AddUserInputs> = async (data) => {
    const { firstName, lastName, email, password, isAdmin } = data;
    addUser(firstName, lastName, email, password, isAdmin);
    setFormSubmitted(true);
    reset(defaultFormValues)
  };

  return (
    <>
      <main>
        <h1>Add New User</h1>
        {!formSubmitted ? 
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
            <Form.Label>Is this user an Admin?</Form.Label>
            <Form.Check {...register('isAdmin')}
              type='switch'
            />
          </Form.Group>
          <Button disabled={loading} variant='primary' type='submit'>
            Submit
          </Button>
        </Form> :
        <div>
          <h2>New user created!</h2>
          <div className='btnContainer'>
              <Button variant='primary' onClick={() => { setFormSubmitted(false) }}>Create another user</Button>
            <Link to='/dashboard'>
              <Button variant='primary'>Return to Dashboard</Button>
            </Link>
          </div>
        </div>
        }

      </main>
    </>
  );
}