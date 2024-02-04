import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useAuth } from '~/lib/firebase';
import GithubLogo from '~/assets/illustrations/github.svg';

// #TODO: It's not DRY. It should be refactored.
const SignInWithGitHub = () => {
  const auth = useAuth();

  const handleClick = useCallback(() => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider);
  }, [auth]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-outline normal-case gap-3  justify-start px-6">
      <img src={GithubLogo} />
      Entrar com GitHub
    </button>
  );
};

export default React.memo(SignInWithGitHub);
