import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    // Used to store the recaptcha verifier instance
    recaptchaVerifier: RecaptchaVerifier;
    // Used to store the confirmation result from the auth provider, in this case email link
    confirmationResult: ConfirmationResult;
  }
}
