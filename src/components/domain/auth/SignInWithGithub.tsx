import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '~/lib/firebase';

export const SignInWithGitHub = () => {
  const handleClick = () => {
    const provider = new GithubAuthProvider();

    const auth = useAuth();

    signInWithPopup(auth, provider);
  };

  return (
    <button onClick={handleClick} type="button" className="btn btn-primary normal-case min-w-60">
      Sign In With GitHub
    </button>
  );
};
