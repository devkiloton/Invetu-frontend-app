import { Router } from '~/components/router/Router';
import { setupFirebase, emailLinkCheck } from '~/lib/firebase';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSignIn, useSignOut } from '~/components/contexts/UserContext';

function Main() {
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();
  useEffect(() => {
    setupFirebase();
    const auth = getAuth();
    emailLinkCheck();
    const state = onAuthStateChanged(auth, user => {
      if (user) {
        signIn(user);
      } else {
        signOut();
      }
    });

    return () => {
      state();
    };
  }, []);

  return (
    <main>
      <Router />
      {/* This div is for reCAPTCHA */}
      <div id="recaptcha-container" className="justify-center flex" />
    </main>
  );
}

export default Main;
