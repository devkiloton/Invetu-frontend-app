import { TwitterAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/lib/firebase';

// #TODO: It's not DRY. It should be refactored.
export const SignInWithX = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const provider = new TwitterAuthProvider();

    const auth = useAuth();

    await signInWithPopup(auth, provider);

    navigate('/home');
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-outline normal-case gap-3  justify-start px-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        className="w-6 h-6 fill-current"
        viewBox="0 0 512 462.799">
        <path
          fillRule="nonzero"
          d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
        />
      </svg>
      Entrar com X
    </button>
  );
};
