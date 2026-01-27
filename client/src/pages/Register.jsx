import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import Loader from '../components/Loader';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError(null);

    // Normalize email for consistent lookups
    const lowerEmail = email.toLowerCase();

    setTimeout(() => {
      // 1. Get the existing users list from storage (Mock Database)
      const existingUsers = JSON.parse(localStorage.getItem('users_list') || '[]');

      // 2. Check if the email is already taken
      const userExists = existingUsers.find((u) => u.email === lowerEmail);
      if (userExists) {
        setLocalError("An account with this email already exists.");
        setIsLoading(false);
        return;
      }

      // 3. Create new user object
      const newUser = {
        _id: Date.now().toString(),
        name,
        email: lowerEmail,
        password, // In mock mode, we store plain text (don't do this in production!)
        isAdmin: false,
        token: 'mock-token-' + Math.random().toString(36).substr(2)
      };

      // 4. Update the "Database"
      existingUsers.push(newUser);
      localStorage.setItem('users_list', JSON.stringify(existingUsers));

      // 5. Log them in and redirect
      dispatch(setCredentials(newUser));
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="text-center mb-10">
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Join Us</h2>
          <p className="text-gray-400 mt-3 font-medium uppercase tracking-widest text-[10px]">Create your swift account</p>
        </div>

        {localError && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-2">
            <span className="bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px]">!</span>
            {localError}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="John Doe" 
              className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="name@example.com" 
              className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button 
            disabled={isLoading}
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-gray-100 active:scale-95 flex justify-center items-center gap-3 disabled:bg-gray-400"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-sm font-medium">
            Already a member?{' '}
            <Link to="/login" className="text-black font-black hover:text-blue-600 transition-colors ml-1 underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;