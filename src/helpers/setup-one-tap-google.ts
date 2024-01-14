import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useAuth } from '~/lib/firebase';
import { initialEntitiesFactory } from './initial-entities-factory';

export const setupOneTapGoogle = () => {
  const script = document.createElement('script');
  // loading google's GSI package
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = () => {
    // Setting up identifiers
    window.google.accounts.id.initialize({
      client_id: import.meta.env['VITE_GOOGLE_CLIENT_ID'],
      login_uri: import.meta.env['VITE_GOOGLE_CLIENT_URI'],
      callback: (response: any) => {
        // Getting user's credentials when identified
        const token = response.credential;
        const auth = useAuth();
        // Signing with credential
        signInWithCredential(auth, GoogleAuthProvider.credential(token)).then(
          initialEntitiesFactory,
        );
      },
    });
    window.google.accounts.id.prompt();
  };
  document.body.appendChild(script);
};
