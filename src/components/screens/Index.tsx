import { SignInWithGoogle } from '~/components/domain/auth/SignInWithGoogle';
import { Head } from '~/components/shared/Head';
import { SignInWithMicrosoft } from '~/components/domain/auth/SignInWithMicrosoft';
import { SignInWithGitHub } from '~/components/domain/auth/SignInWithGithub';
import CoupleTouchingSaturn from '~/assets/illustrations/couple-touching-saturn.svg';
import { SignInWithX } from '../domain/auth/SignInWithX';
import { SignInWithFacebook } from '../domain/auth/SignInWithFacebook';

const Index = () => {
  return (
    <>
      <Head title="Login" />
      <div className="hero" style={{ height: 'calc(100vh - 80px)' }}>
        <div className="text-center h-full w-full hero-content justify-evenly flex-col-reverse md:flex-row">
          <div className="mt-4 grid gap-2">
            <span className="font-semibold mb-3">Como você deseja entrar?</span>
            <SignInWithGoogle />
            <SignInWithMicrosoft />
            <SignInWithFacebook />
            <SignInWithX />
            <SignInWithGitHub />
            <p className="text-xs text-center mt-8">
              Ao entrar, você concorda com
              <br /> nossos{' '}
              <a className="text-blue-600" href="/#">
                termos de serviço
              </a>{' '}
              e{' '}
              <a className="text-blue-600" href="/#">
                privacidade
              </a>
              .
            </p>
          </div>
          <div className="divider divider-horizontal" />

          <div>
            <h1 className="text-4xl font-bold leading-9 text-start px-4">
              Alcance o impossível <br /> com a{' '}
              <span className="text-primary">Invetu</span>
            </h1>
            <img
              className="max-w-120"
              src={CoupleTouchingSaturn}
              alt="Casal tocando saturno"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
