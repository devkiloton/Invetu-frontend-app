import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';

export const SignInWithGitHub = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const provider = new GithubAuthProvider();

    const auth = useAuth();

    await signInWithPopup(auth, provider);

    navigate('/home');
  };

  return (
    <button onClick={handleClick} type="button" className="btn btn-primary normal-case min-w-60">
      Sign In With GitHub
    </button>
  );
};
