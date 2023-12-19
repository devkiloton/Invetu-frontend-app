import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth, useFirestore } from '~/lib/firebase';

export const setupOneTapGoogle = () => {
  const script = document.createElement('script');
  // loading google's GSI package
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    // Setting up identifiers
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      login_uri: import.meta.env.VITE_GOOGLE_CLIENT_URI,
      callback: (response: any) => {
        // Getting user's credentials when identified
        const token = response.credential;
        const auth = useAuth();
        // Signing with credential
        signInWithCredential(auth, GoogleAuthProvider.credential(token)).then(
          userCredential => {
            // IMPORTANT: Since Firebase's cloud functions doesn't have authentication triggers when signing in with credentials;
            // the backend can't generate the initial data, as a workaround, the front can take the time diff between the creation
            // time and the current time. If it's less than 30s, it's probably a new user, so I judge that there's no problem in
            // allow a data creation on every login in the first 30s.
            if (
              new Date().getTime() -
                new Date(userCredential.user.metadata.creationTime!).getTime() <
              30000
            ) {
              const firestore = useFirestore();
              // Configuring docs for the new user
              try {
                setDoc(doc(firestore, 'users', userCredential.user.uid), {
                  email: userCredential.user.email,
                  uid: userCredential.user.uid,
                });

                setDoc(doc(firestore, 'investments', userCredential.user.uid), {
                  investedAmount: 0,
                  stocks: [],
                  crypto: [],
                  treasuries: [],
                  companyLoans: [],
                  cash: [],
                });
              } catch (error) {
                return error;
              }
            }
          },
        );
      },
    });
    window.google.accounts.id.prompt();
  };
  document.body.appendChild(script);
};
