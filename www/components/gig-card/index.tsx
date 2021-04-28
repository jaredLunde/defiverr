import clsx from 'clsx';
import * as React from 'react';
import {Avatar} from '@/components/avatar';
import {badge} from '@/components/badge';
import {Icon} from '@/components/icon';
import {mq, styles} from '@/styles';
import {column, layer, row} from '@/styles/layout';
import {text} from '@/styles/text';

export function GigCard({style, title, src}: any) {
  return (
    <div
      className={gigCard()}
      style={style}
      itemProp='itemListElement'
      itemScope
      itemType='http://schema.org/ListItem'
    >
      <meta content={title} itemProp='name' />
      <meta content={String(3 /*index*/)} itemProp='position' />
      <meta content='https://foo.bar' itemProp='url' />
      <div>
        <img src={src} itemProp='image' aria-hidden />
        <div
          className={clsx(
            'favorite',
            layer({
              pad: ['none', 'xs'],
              radius: 'primary',
              bg: 'white',
              placement: 'topRight',
              offset: 8,
              border: ['hairline', 'accent'],
            }),
            row({align: 'center', distribute: 'center', gap: 'sm'})
          )}
        >
          <Icon src='/icons/heart.svg' role='img' />
          <span>56</span>
        </div>
      </div>

      <div className={column({gap: 'sm'})}>
        <div className={text({size: 'base'})}>
          <div
            className={row({
              width: '100%',
              distribute: 'between',
              align: 'end',
            })}
          >
            <div className={column({align: 'start'})}>
              <div
                className={clsx(
                  row({gap: 'xs', align: 'center'}),
                  text({
                    size: 'sm',
                    color: 'primary',
                  })
                )}
              >
                <Icon
                  src='/icons/star.svg'
                  aria-label='Rated 4.63 out of 5 stars with 92 reviews'
                  role='img'
                />
                <span aria-hidden>4.63</span>
                <span
                  className={text({
                    color: 'textAccentLight',
                  })}
                >
                  <span aria-hidden>(92)</span> &middot;{' '}
                  <span aria-label={`Created by Jeet Kheera`}>Jeet Kheera</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <h3 className={text({size: 'lg', leading: 'snug'})}>{title}</h3>
        <h4 className={clsx(text({size: 'sm', leading: 'normal'}))}>
          for <b className={text({weight: '600'})}>2.00 ETH</b>
        </h4>
      </div>
    </div>
  );
}

const gigCard = styles.one(
  mq({
    default: (t) => ({
      fontWeight: 400,

      'h3,h4': {
        fontWeight: 400,
      },

      '> div > img': {
        borderRadius: t.radius.primary,
        border: `${t.borderWidth.hairline} solid ${t.color.accent}`,
      },

      '> * + *': {
        marginTop: t.gap.md,
      },
    }),
    hover: {
      '&:hover': {},
    },
  })
);
