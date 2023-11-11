import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';

export const SignOutButton = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const signOut = () => auth.signOut().then(() => { 
    navigate('/');
  });

  return (
    <a onClick={signOut} className="btn btn-outline btn-error btn-sm">Sign out</a>
  )
};
