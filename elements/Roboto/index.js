export const Roboto = () => (
  <>
    <link rel='preload' href='/fonts/Roboto/Roboto-Regular.ttf' as='font' crossOrigin='anonymous' />
    {/* eslint-disable-next-line react/no-danger */}
    <style dangerouslySetInnerHTML={{
      __html: `
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          unicode-range: U+000-5FF;
          src: local('Roboto-Regular'),
            url('/fonts/Roboto/Roboto-Regular.ttf') format('ttf');
        }
      `,
    }}
    />
  </>
);