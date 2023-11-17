import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';

export const SignInWithMicrosoft = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const provider = new OAuthProvider('microsoft.com');
    const auth = useAuth();

    await signInWithPopup(auth, provider);

    navigate('/home');
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-primary normal-case min-w-60">
      Entrar com Microsoft
    </button>
  );
};
