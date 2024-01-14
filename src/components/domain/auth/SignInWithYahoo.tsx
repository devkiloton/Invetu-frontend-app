import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useAuth } from '~/lib/firebase';

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 512 512"
        fill="#fff">
        <rect width="512" height="512" rx="15%" fill="#5300b5" />
        <circle cx="334" cy="389" r="20" />
        <path d="m347 103-103 175 2 129c-15-4-29-4-42 0l3-129-104-175 5 2c13 3 26 3 38 0h3c11 22 76 129 76 129l77-129h3c21 6 42-2 42-2zm1 245-7-3-8 1 22-218c4-36 48-21 39 6z" />
      </svg>
      Entrar com Yahoo
    </button>
  );
};

export default React.memo(SignInWithYahoo);
