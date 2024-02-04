import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useAuth } from '~/lib/firebase';
import Yahoo from '~/assets/illustrations/yahoo.svg';

// #TODO: It's not DRY. It should be refactored.
const SignInWithYahoo = () => {
  const auth = useAuth();

  const handleClick = useCallback(() => {
    const provider = new OAuthProvider('yahoo.com');

    signInWithPopup(auth, provider);
  }, [auth]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-outline normal-case gap-3  justify-start px-6">
      <img className="h-6 w-6" src={Yahoo} />
      Entrar com Yahoo
    </button>
  );
};

export default React.memo(SignInWithYahoo);
