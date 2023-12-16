import { SignInWithGoogle } from '~/components/domain/auth/SignInWithGoogle';
import { Head } from '~/components/shared/Head';
import { SignInWithMicrosoft } from '~/components/domain/auth/SignInWithMicrosoft';
import { SignInWithGitHub } from '~/components/domain/auth/SignInWithGithub';

function Index() {
  return (
    <>
      <Head title="Login" />
      <div className="hero" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="text-center hero-content">
          <div>
            <div className="mt-4 grid gap-2">
              <SignInWithGoogle />
              <SignInWithMicrosoft />
              <SignInWithGitHub />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
