import { useNavigate } from 'react-router-dom';
import { useAuthState } from '~/components/contexts/UserContext';

export default function AuthHandler() {
    const { state } = useAuthState();
    const navigate = useNavigate();
  return state.state === 'SIGNED_IN' ? navigate('/home') : navigate('/');
}
