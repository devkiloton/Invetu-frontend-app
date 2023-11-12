
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';

export const SignOutButton = () => {
  const navigate = useNavigate();
  const auth = useAuth;

  async function handleClick() {
    await auth().signOut();
    navigate('/');
  };
  
  return (
    <a onClick={handleClick}  className="btn btn-outline btn-error btn-sm">Sign out</a>
  )
};
