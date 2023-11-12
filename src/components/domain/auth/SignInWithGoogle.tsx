import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';

export const SignInWithGoogle = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = useAuth();
    // @see https://firebase.google.com/docs/auth/web/google-signin
    auth.languageCode = 'ja';

    await signInWithPopup(auth, provider);
    navigate('/home');
  };

  return (
    <button onClick={handleClick} type="button" className="btn btn-primary normal-case min-w-60">
      Sign In With Google
    </button>
  );
};
