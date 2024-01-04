import { Router } from '~/components/router/Router';
import { setupFirebase, emailLinkCheck } from '~/lib/firebase';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSignIn, useSignOut } from '~/components/contexts/UserContext';
import { useFetchCriticalData } from '~/hooks/use-fetch-critical-data';

function Main() {
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();
  const fetchCriticalData = useFetchCriticalData()
  useEffect(() => {
    setupFirebase();
    const auth = getAuth();
    emailLinkCheck();
    const state = onAuthStateChanged(auth, user => {
      if (user) {
        signIn(user);
        fetchCriticalData()
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
    </main>
  );
}

export default Main;
