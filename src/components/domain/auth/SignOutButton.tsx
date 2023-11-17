import { useNavigate } from 'react-router-dom';
import { useAuthState } from '~/components/contexts/UserContext';
import { useAuth } from '~/lib/firebase';

export const SignOutButton = () => {
  const navigate = useNavigate();
  const auth = useAuth;
  const { state } = useAuthState();

  async function handleClick() {
    await auth().signOut();
    navigate('/');
  }

  return (
    <>
      {state.state === 'SIGNED_IN' ? (
        <a onClick={handleClick} className="btn btn-outline btn-error btn-sm">
          Sair
        </a>
      ) : (
        <></>
      )}
    </>
  );
};
