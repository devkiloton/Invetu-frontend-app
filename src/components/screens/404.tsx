import { Head } from '~/components/shared/Head';

function Page404() {
  return (
    <>
      <Head title="Página não encontrada" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content text-3xl font-bold">
          <div>
            <h1>Página não encontrada.</h1>
            <div className="mt-4">
              <a href="/" className="link-primary">
                Voltar ao início
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page404;
