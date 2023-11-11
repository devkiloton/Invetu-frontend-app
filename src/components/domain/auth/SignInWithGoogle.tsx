import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '~/lib/firebase';

export const SignInWithGoogle = () => {
  const handleClick = () => {
    const provider = new GoogleAuthProvider();
    const auth = useAuth();
    // @see https://firebase.google.com/docs/auth/web/google-signin
    auth.languageCode = 'ja';

    signInWithPopup(auth, provider);
  };

  return (
    <button onClick={handleClick} type="button" className="btn btn-primary normal-case min-w-60">
      Sign In With Google
    </button>
  );
};
