import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';

// #TODO: It's not DRY. It should be refactored.
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
      className="btn btn-outline normal-case gap-3 justify-start px-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="24"
        height="24">
        <path d="M0 0h15.206v15.206H0z" fill="#f25022" />
        <path d="M16.794 0H32v15.206H16.794z" fill="#7fba00" />
        <path d="M0 16.794h15.206V32H0z" fill="#00a4ef" />
        <path d="M16.794 16.794H32V32H16.794z" fill="#ffb900" />
      </svg>
      Entrar com Microsoft
    </button>
  );
};
