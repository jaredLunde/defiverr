import Head from 'next/head';
import {GetStaticProps} from 'next';
import {FormattedMessage} from 'react-intl';
import {text} from '@/components/text';
import {Hero} from '@/components/hero';
import {Button} from '@/components/button';
import {cluster, column, layer, row} from '@/styles/layout';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header
        className={row({
          align: 'center',
          distribute: 'between',
          bg: 'white',
          pad: ['sm', 'md'],
        })}
      >
        <h1
          className={text({
            font: 'brand',
            size: '3xl',
            color: 'blueGray900',
            tracking: 'tighter',
            leading: 'normal',
            weight: '700',
          })}
        >
          defiverr
        </h1>

        <div className={layer({placement: 'center'})}>
          <div className={row({gap: 'xl'})}>
            <a
              className={text({
                leading: 'none',
                weight: '600',
                color: 'textAccent',
              })}
              href='/'
            >
              Earn crypto
            </a>
            <a
              className={text({
                leading: 'none',
                weight: '600',
                color: 'textAccent',
              })}
              href='/'
            >
              Hire freelancers
            </a>
            <a
              className={text({
                leading: 'none',
                weight: '600',
                color: 'textAccent',
              })}
              href='/'
            >
              About
            </a>
          </div>
        </div>

        <Button>Get started</Button>
      </header>

      <Hero>
        <div
          className={column({
            width: {min: '100vw', md: 640},
            gap: 'xl',
            pad: 'xl',
          })}
        >
          <div
            className={column({gap: 'md'})}
            style={{mixBlendMode: 'hard-light'}}
          >
            <h1
              className={text({
                size: {min: '4xl', sm: '5xl', md: '6xl'},
                color: 'blueGray900',
                tracking: 'tighter',
                leading: 'tight',
                weight: '700',
                align: 'center',
              })}
            >
              Hire the best freelance talent in the world
            </h1>

            <h2
              className={text({
                color: 'blueGray900',
                size: 'xl',
                leading: 'normal',
                align: 'center',
              })}
            >
              The easiest way to hire the world&apos;s top designers, digital
              marketers, and developers who want to get paid in cryptocurrency
            </h2>
          </div>

          <div>
            <div className={cluster({gap: 'lg', distribute: 'center'})}>
              <Button size='md'>Find a professional</Button>
              <Button size='md' variant='secondary'>
                Sell your craft for crypto
              </Button>
            </div>
          </div>
        </div>
      </Hero>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (cxt) => {
  return {
    props: {
      locale: cxt.locale,
      defaultLocale: cxt.defaultLocale,
      localeMessages: await require('@/i18n').load(cxt),
    },
  };
};
