import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useAuth } from '~/lib/firebase';
import GoogleLogo from '~/assets/illustrations/google.svg';

// #TODO: It's not DRY. It should be refactored.
const SignInWithGoogle = () => {
  const auth = useAuth();

  const handleClick = useCallback(() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }, [auth]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-outline  normal-case gap-3  justify-start px-6">
      <img src={GoogleLogo} />
      Entrar com Google
    </button>
  );
};

export default React.memo(SignInWithGoogle);
