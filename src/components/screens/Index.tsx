import { useAuthState } from '~/components/contexts/UserContext';
import { SignInWithGoogle } from '~/components/domain/auth/SignInWithGoogle';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { SignInWithMicrosoft } from '~/components/domain/auth/SignInWithMicrosoft';
import { SignInWithGitHub } from '~/components/domain/auth/SignInWithGithub';

function Index() {
  const { state } = useAuthState();
  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content">
          <div>
            <div className="mt-4 grid gap-2">
              {state.state === 'UNKNOWN' ? null : state.state === 'SIGNED_OUT' ? <>
                <SignInWithGoogle />
                <SignInWithMicrosoft />
                <SignInWithGitHub />
              </> : <SignOutButton />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
