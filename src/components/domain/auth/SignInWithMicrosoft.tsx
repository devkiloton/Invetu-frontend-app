import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '~/lib/firebase';

export const SignInWithMicrosoft = () => {
  const handleClick = () => {
    const provider = new OAuthProvider('microsoft.com');
    const auth = useAuth();

    signInWithPopup(auth, provider);
  };

  return (
    <button onClick={handleClick} type="button" className="btn btn-primary normal-case min-w-60">
      Sign In With Microsoft
    </button>
  );
};
