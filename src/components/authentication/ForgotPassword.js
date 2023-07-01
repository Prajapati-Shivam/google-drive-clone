import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='shadow-lg rounded-md px-4 py-8 sm:px-16 sm:py-10 text-lg'>
        <h2 className='text-4xl text-center font-semibold mb-4'>Reset Password</h2>
        <p className='text-center mb-6'>Enter your email address to reset your password</p>
        {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-2' role='alert'>{error}</div>}
        {message && <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-2' role='alert'>{message}</div>}
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input type="email" ref={emailRef} id="email" className='w-full border-2 rounded px-4 py-2 mt-2 mb-4 hover:border-blue-300 focus:outline-none focus:border-blue-500' />
        </div>
        
        <button disabled={loading} type='submit' className='px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 w-full text-center'>Reset Password</button>
        <div className='text-blue-500 hover:text-blue-600 mt-4 text-center'>
          <Link to='/login'>Login</Link>
        </div>
      </form>
      <p className='mt-4 text-center'>
        Don't have an account? <Link to='/signup' className='text-blue-500 hover:text-blue-600'>Sign up</Link>
      </p>
    </>
  )
}
