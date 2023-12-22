import { Router } from '~/components/router/Router';
import { setupFirebase, emailLinkCheck } from '~/lib/firebase';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSignIn, useSignOut } from '~/components/contexts/UserContext';
import { useDispatch } from 'react-redux';
import { fetchInvestments } from '~/features/investments/investments-slice';
import { fetchAllInvestmentsData } from '~/features/investments-data/investments-data-slice';

function Main() {
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();
  const dispatch = useDispatch();
  useEffect(() => {
    setupFirebase();
    const auth = getAuth();
    emailLinkCheck();
    const state = onAuthStateChanged(auth, user => {
      if (user) {
        signIn(user);
        // Async thunks to fetch investments and investments data
        dispatch(fetchInvestments());
        dispatch(fetchAllInvestmentsData());
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
