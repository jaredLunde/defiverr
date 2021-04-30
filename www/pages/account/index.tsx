import {yupResolver} from '@hookform/resolvers/yup';
import clsx from 'clsx';
import {GetStaticProps} from 'next';
import Head from 'next/head';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Button} from '@/components/button';
import {Divider} from '@/components/divider';
import {Fieldset} from '@/components/fieldset';
import {Input} from '@/components/input';
import {Select} from '@/components/select';
import {Switch} from '@/components/switch';
import {Textarea} from '@/components/textarea';
import {toast} from '@/components/toast';
import {YupError, yupMessage} from '@/components/yup-error';
import {withUrqlClient} from '@/graphql/client';
import {useUpdateProfileMutation} from '@/graphql/hooks';
import {responsiveStyles} from '@/styles';
import {box, cluster, column, grid, row} from '@/styles/layout';
import {text} from '@/styles/text';
import {useViewer} from '@/viewer';

export default withUrqlClient(Account);

function Account() {
  const viewer = useViewer((state) => state.data);
  const refetchViewer = useViewer((state) => state.refetch);
  const [updateProfileResult, updateProfile] = useUpdateProfileMutation();
  const {register, handleSubmit, errors} = useForm<{
    name: string;
    shortBio: string;
    website: string;
    location: string;
  }>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  React.useEffect(() => {
    if (updateProfileResult.data) {
      toast({
        subject: 'Saved',
        message: 'Your personal information was updated',
        variant: 'success',
      });
    }
  }, [updateProfileResult.data]);

  return (
    <main>
      <Head>
        <title>My account / defiverr</title>
      </Head>

      <div
        className={column({
          width: '80ch',
          pad: ['xl', 'lg'],
          gap: {min: 'lg', sm: 'xl'},
          maxWidth: '100%',
        })}
        style={{margin: '0 auto'}}
      >
        <div>
          <h1
            className={text({
              size: {min: '2xl', sm: '4xl'},
              weight: '600',
              color: 'text',
              leading: 'snug',
            })}
          >
            Account
          </h1>
          <p className={text({color: 'textAccent', size: 'lg'})}>
            Tailor your experience on defiverr
          </p>
        </div>

        <Divider />

        <Fieldset variant='row'>
          <Fieldset.Legend>
            <h2>Introduce yourself</h2>
            <p>Let others know who you are and how to refer to you</p>
          </Fieldset.Legend>

          <div className={column({gap: 'lg', pad: ['sm', 'none']})}>
            <Input
              type='text'
              autoComplete='name'
              name='name'
              placeholder='Name'
            />
            <div
              className={clsx(
                inputGroup(),
                grid({cols: ['min-content', 'auto']})
              )}
            >
              <div
                className={clsx(
                  row({
                    bg: 'accent',
                    radius: 'primary',
                    align: 'center',
                    pad: ['none', 'sm'],
                  }),
                  text({color: 'textAccent'})
                )}
              >
                @
              </div>
              <Input
                type='text'
                autoComplete='username'
                name='username'
                placeholder='Username'
              />
            </div>
            <Textarea name='bio' placeholder='Bio' rows={3} />
            <Input
              type='text'
              autoComplete='address-level2'
              name='location'
              placeholder='Location'
            />
            <Input type='url' name='homepage' placeholder='Website' />

            <Button variant='secondary'>Save</Button>
          </div>
        </Fieldset>

        <Divider />

        <Fieldset variant='row'>
          <Fieldset.Legend>
            <h2>Notifications</h2>
            <p>How can we notify you when someone wants to work with you?</p>
          </Fieldset.Legend>

          <div className={column({gap: 'lg', pad: ['sm', 'none']})}>
            <Input type='email' name='email' placeholder='Email address' />
            <Input
              type='text'
              name='languages'
              placeholder='Add a spoken language'
            />

            <Button variant='secondary'>Save</Button>
          </div>
        </Fieldset>
        <Divider />

        <Fieldset variant='row'>
          <Fieldset.Legend>
            <h2>Skill set</h2>
            <p>Tell everyone what you can do</p>
          </Fieldset.Legend>

          <div className={column({gap: 'lg', pad: ['sm', 'none']})}>
            <Input type='text' name='skills' placeholder='Add a skill' />
            <Input
              type='text'
              name='languages'
              placeholder='Add a spoken language'
            />
          </div>
        </Fieldset>

        <Divider decorative />
      </div>
    </main>
  );
}

const inputGroup = responsiveStyles({
  default: {
    '> * + *': {
      borderTopLeftRadius: '0!important',
      borderBottomLeftRadius: '0!important',
    },
    '> *:first-child': {
      borderTopRightRadius: '0!important',
      borderBottomRightRadius: '0!important',
    },
  },
});

const schema = yup.object().shape({
  name: yup.string().max(120, yupMessage.max),
  shortBio: yup.string().max(280, yupMessage.max),
  homepage: yup.string().url(yupMessage.url('Website')),
  location: yup.string().max(120, yupMessage.max),
});

export const getServerSideProps: GetStaticProps = async (cxt) => {
  return {
    props: {
      locale: cxt.locale,
      defaultLocale: cxt.defaultLocale,
      localeMessages: await require('@/i18n').load(cxt),
    },
  };
};
