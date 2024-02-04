import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useAuth } from '~/lib/firebase';
import FacebookLogo from '~/assets/illustrations/facebook.svg';

// #TODO: It's not DRY. It should be refactored.
const SignInWithFacebook = () => {
  const auth = useAuth();

  const handleClick = useCallback(() => {
    const provider = new FacebookAuthProvider();

    signInWithPopup(auth, provider);
  }, [auth]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-outline normal-case gap-3  justify-start px-6">
      <img src={FacebookLogo} />
      Entrar com Facebook
    </button>
  );
};

export default React.memo(SignInWithFacebook);
