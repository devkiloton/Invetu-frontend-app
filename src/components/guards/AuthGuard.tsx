/* eslint-disable no-undef */
import { Navigate } from 'react-router-dom';
import { useAuthState } from '../contexts/UserContext';
import React from 'react';

function AuthGuard({
  element,
  pathToRedirect,
}: {
  element: JSX.Element;
  pathToRedirect: string;
  redirectWhenAuthenticated?: boolean;
}) {
  const { state } = useAuthState();
  return state.state === 'SIGNED_IN' ? (
    element
  ) : (
    <Navigate to={pathToRedirect} replace />
  );
}

export default React.memo(AuthGuard);
