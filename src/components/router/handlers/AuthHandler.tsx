import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '~/components/contexts/UserContext';

export default function AuthHandler() {
  const { state } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.state === 'SIGNED_IN') {
      return;
    }
    navigate('/')
  }, [state.state]);
}
