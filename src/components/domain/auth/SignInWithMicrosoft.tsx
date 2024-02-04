import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useAuth } from '~/lib/firebase';
import MicrosoftLogo from '~/assets/illustrations/microsoft.svg';

// #TODO: It's not DRY. It should be refactored.
const SignInWithMicrosoft = () => {
  const auth = useAuth();

  const handleClick = useCallback(() => {
    const provider = new OAuthProvider('microsoft.com');
    signInWithPopup(auth, provider);
  }, [auth]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-outline normal-case gap-3 justify-start px-6">
      <img src={MicrosoftLogo} />
      Entrar com Microsoft
    </button>
  );
};

export default React.memo(SignInWithMicrosoft);
