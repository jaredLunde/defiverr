import {GetStaticProps} from 'next';
import Head from 'next/head';
import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {Button} from '@/components/button';
import {GigCard} from '@/components/gig-card';
import {Hero} from '@/components/hero';
import {withUrqlClient} from '@/graphql/client';
import {cluster, column, grid} from '@/styles/layout';
import {text} from '@/styles/text';
import {useViewer} from '@/viewer';

export default withUrqlClient(Home);

function Home() {
  const fetching = useViewer((state) => state.fetching);
  const loggedIn = useViewer((state) => !!state.data);

  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Hero>
        <div
          className={column({
            maxWidth: {min: '100vw', md: 640},
            gap: 'xl',
            pad: ['sm', 'none', '2xl'],
          })}
        >
          <div className={column({gap: 'md'})}>
            <h1
              className={text({
                size: {min: '4xl', sm: '5xl', md: '6xl'},
                color: 'blueGray900',
                tracking: 'tighter',
                leading: 'tight',
                weight: '600',
                align: 'center',
              })}
            >
              Hire the best freelance talent in the world
            </h1>

            <h2
              className={text({
                color: 'blueGray900',
                size: 'xl',
                align: 'center',
                weight: '500',
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
                Get paid in crypto
              </Button>
            </div>
          </div>
        </div>
      </Hero>

      <div
        className={grid({cols: 5, gap: 'xl', pad: 'lg'})}
        style={{marginTop: -140}}
        itemProp='itemList'
        itemScope
        itemType='http://schema.org/ItemList'
      >
        <GigCard
          title='I will create a design system'
          src='https://cdn.dribbble.com/users/2742725/screenshots/15539570/media/da01c61717c75c58e4e37535abf9d6bb.png?compress=1&resize=1200x900'
          style={{paddingTop: '6em'}}
        />
        <GigCard
          title='I will design your app'
          src='https://cdn.dribbble.com/users/26642/screenshots/15538892/media/7b40e63f290a35390b25473fa498b7ba.png?compress=1&resize=1600x1200'
          style={{paddingTop: '2em'}}
        />
        <GigCard
          title='I will create a stellar logo for you'
          src='https://cdn.dribbble.com/users/1090926/screenshots/15540338/media/dad5612d427e6bd59fa9e9cce9dcd3b6.png?compress=1&resize=800x600'
        />
        <GigCard
          title='I will turbocharge your Wordpress site'
          src='https://cdn.dribbble.com/users/2185469/screenshots/15539564/media/7a1f4f7d8de60ca3ebe0ea265e3e193f.png?compress=1&resize=1600x1200'
          style={{paddingTop: '2em'}}
        />
        <GigCard
          title='I will create an iOS screen'
          src='https://cdn.dribbble.com/users/2019185/screenshots/15544933/media/4058cdf74ef4c5b6d1fe7da677ac1a4e.jpg?compress=1&resize=1600x1200'
          style={{paddingTop: '6em'}}
        />
      </div>
    </main>
  );
}

export const getServerSideProps: GetStaticProps = async (cxt) => {
  return {
    props: {
      locale: cxt.locale,
      defaultLocale: cxt.defaultLocale,
      localeMessages: await require('@/i18n').load(cxt),
    },
  };
};
