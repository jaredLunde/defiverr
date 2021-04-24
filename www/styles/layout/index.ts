import type {DashTokens} from '@dash-ui/styles';
import {styles, responsiveStyles, compoundStyles} from '@/styles';
import {unit} from '@/utils/unit';

/**
 * A layout style for adding size, padding, position, color, and more
 * using tokens from your CSS variable theme.
 *
 * @example
 * <div className={box({size: 300, bg: {sm: 'red', md: 'blue'}})} />
 */
export const box = compoundStyles({
  /**
   * Sets a `display` CSS property on your component
   */
  display: responsiveStyles({
    flex: {display: 'flex'},
    inlineFlex: {display: 'inline-flex'},
    block: {display: 'block'},
    inlineBlock: {display: 'inline-block'},
    inline: {display: 'inline'},
    none: {display: 'none'},
  }),
  /**
   * Sets a `position` CSS property on your component
   */
  position: responsiveStyles({
    relative: {position: 'relative'},
    absolute: {position: 'absolute'},
    sticky: {position: 'sticky'},
    fixed: {position: 'fixed'},
  }),
  /**
   * Sets a `width` CSS property on your component
   */
  width: responsiveStyles.lazy((width: number | string) => ({width})),
  /**
   * Sets a `height` CSS property on your component
   */
  height: responsiveStyles.lazy((height: number | string) => ({height})),
  /**
   * Sets a `max-width` CSS property on your component
   */
  maxWidth: responsiveStyles.lazy((maxWidth: number | string) => ({maxWidth})),
  /**
   * Sets a `max-height` CSS property on your component
   */
  maxHeight: responsiveStyles.lazy((maxHeight: number | string) => ({
    maxHeight,
  })),
  /**
   * Sets a `width` and `height` CSS property on your component
   */
  size: responsiveStyles.lazy((size: number | string) => ({
    width: size,
    height: size,
  })),
  /**
   * Sets a `padding` CSS property on your component using the "pad"
   * token in your theme
   */
  pad: responsiveStyles.lazy(
    (
      value:
        | Extract<keyof DashTokens['pad'], string | number>
        | Extract<keyof DashTokens['pad'], string | number>[]
    ) => ({pad}) => ({
      padding: Array.isArray(value)
        ? value.map((k) => pad[k]).join(' ')
        : pad[value],
    })
  ),
  /**
   * Sets a `background-color` CSS property on your component using the "color"
   * token in your theme
   */
  bg: responsiveStyles.lazy(
    (bg: Extract<keyof DashTokens['color'], string | number>) => ({color}) => ({
      backgroundColor: color[bg],
    })
  ),
  /**
   * Sets a `border-color` CSS property on your component using the "color"
   * token in your theme and a `border-width` property using the "borderWidth"
   * token
   */
  border: responsiveStyles.lazy(
    ([width, borderColor]: [
      Extract<keyof DashTokens['borderWidth'], string | number>,
      Extract<keyof DashTokens['color'], string | number>
    ]) => ({borderWidth, color}) => ({
      borderWidth: borderWidth[width],
      borderStyle: 'solid',
      borderColor: color[borderColor],
    })
  ),
  /**
   * Sets a `box-shadow` CSS property on your component using the "shadow"
   * token in your theme
   */
  shadow: responsiveStyles.lazy(
    (value: Extract<keyof DashTokens['shadow'], string | number>) => ({
      shadow,
    }) => ({boxShadow: shadow[value]})
  ),
  /**
   * Sets a `border-radius` CSS property on your component using the "radius"
   * token in your theme
   */
  radius: responsiveStyles.lazy(
    (
      value:
        | Extract<keyof DashTokens['radius'], string | number>
        | Extract<keyof DashTokens['radius'], string | number>[]
    ) => ({radius}) => ({
      borderRadius: Array.isArray(value)
        ? value.map((k) => radius[k]).join(' ')
        : radius[value],
    })
  ),
  /**
   * Sets the top, right, bottom, left position of the element
   */
  inset: responsiveStyles.lazy(
    (value: string | number | (string | number)[]) => {
      if (Array.isArray(value)) {
        return {
          top: value[0],
          right: value[1] ?? value[0],
          bottom: value[2] ?? value[0],
          left: value[3] ?? value[1] ?? value[0],
        };
      }

      return {top: value, right: value, bottom: value, left: value};
    }
  ),
  /**
   * Sets a `z-index` CSS property on your component
   */
  z: responsiveStyles.lazy(
    (value: number | Extract<keyof DashTokens['zIndex'], string | number>) => ({
      zIndex,
    }) => ({
      zIndex: typeof value === 'number' ? value : zIndex[value],
    })
  ),
});

export const alignItems = responsiveStyles({
  start: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'flex-end',
  },
  baseline: {
    alignItems: 'baseline',
  },
  stretch: {
    alignItems: 'stretch',
  },
});

export const justifyItems = responsiveStyles({
  start: {
    justifyItems: 'flex-start',
  },
  center: {
    justifyItems: 'center',
  },
  end: {
    justifyItems: 'flex-end',
  },
  baseline: {
    justifyItems: 'baseline',
  },
  stretch: {
    justifyItems: 'stretch',
  },
});

export const justifyContent = responsiveStyles({
  start: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  around: {
    justifyContent: 'space-around',
  },
  between: {
    justifyContent: 'space-between',
  },
  evenly: {
    justifyContent: 'space-evenly',
  },
  baseline: {
    justifyContent: 'baseline',
  },
  stretch: {
    justifyContent: 'stretch',
  },
});

export const alignContent = responsiveStyles({
  start: {
    alignContent: 'flex-start',
  },
  center: {
    alignContent: 'center',
  },
  end: {
    alignContent: 'flex-end',
  },
  around: {
    alignContent: 'space-around',
  },
  between: {
    alignContent: 'space-between',
  },
  evenly: {
    alignContent: 'space-evenly',
  },
  baseline: {
    alignContent: 'baseline',
  },
  stretch: {
    alignContent: 'stretch',
  },
});

export const alignSelf = responsiveStyles({
  start: {
    alignSelf: 'flex-start',
  },
  center: {
    alignSelf: 'center',
  },
  end: {
    alignSelf: 'flex-end',
  },
  baseline: {
    alignSelf: 'baseline',
  },
  stretch: {
    alignSelf: 'stretch',
  },
});

export const justifySelf = responsiveStyles({
  start: {
    justifySelf: 'flex-start',
  },
  center: {
    justifySelf: 'center',
  },
  end: {
    justifySelf: 'flex-end',
  },
  around: {
    justifySelf: 'space-around',
  },
  between: {
    justifySelf: 'space-between',
  },
  evenly: {
    justifySelf: 'space-evenly',
  },
  baseline: {
    justifySelf: 'baseline',
  },
  stretch: {
    justifySelf: 'stretch',
  },
});

/**
 * A row directional layout style that distributes its items in a cluster
 * like so:
 *
 * ```
 * ☐☐☐☐☐
 * ☐☐☐☐☐☐
 * ☐☐☐☐☐
 * ☐☐☐
 * ```
 *
 * or
 * ```
 *  ☐☐☐☐☐
 * ☐☐☐☐☐☐
 *  ☐☐☐☐☐
 *    ☐☐☐
 * ```
 *
 * Some use cases include input chips and tags.
 *
 * @example
 * <div className={cluster({gap: 'sm})}>
 *   <Item/>
 *   <Item/>
 * </div>
 */
export const cluster = compoundStyles({
  default: styles.one({
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexShrink: 0,
    },
  }),
  /**
   * Sets a vertical and horizontal gap between the child elements in the
   * cluster using the "gap" token in your theme
   */
  gap: responsiveStyles.lazy(
    (value: Extract<keyof DashTokens['gap'], string | number>) => ({gap}) => ({
      marginTop: `calc(-1 * ${gap[value]})!important`,
      marginLeft: `calc(-1 * ${gap[value]})!important`,
      '& > *': {
        marginTop: `${gap[value]}!important`,
        marginLeft: `${gap[value]}!important`,
      },
    })
  ),
  /**
   * Distributed alignment properties on the x-axis using `justify-content`
   */
  distribute: justifyContent,
  /**
   * Positional alignment for its child items on the y-axis using `align-items`
   */
  align: alignItems,
  ...box.styles,
});

/**
 * A layout style that distributes its items in a column without wrapping
 * like so:
 *
 * ```
 * ☐
 * ☐
 * ☐
 * ☐
 * ```
 *
 * @example
 * <div className={column({gap: 'sm'})}>
 *   <Item/>
 *   <Item/>
 * </div>
 */
export const column = compoundStyles({
  default: styles.one({
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      flexShrink: 0,
    },
  }),
  /**
   * Sets a vertical gap between the child elements in the cluster using the "gap"
   * token in your theme
   */
  gap: responsiveStyles.lazy(
    (value: Extract<keyof DashTokens['gap'], string | number>) => ({gap}) => ({
      '& > * + *': {
        marginTop: `${gap[value]}!important`,
      },
    })
  ),
  /**
   * Distributed alignment properties on the y-axis using `justify-content`
   */
  distribute: justifyContent,
  /**
   * Positional alignment for its child items on the y-axis using `align-items`
   */
  align: alignItems,
  ...box.styles,
});

const sharedGrid = compoundStyles({
  default: styles.one({
    display: 'grid',
  }),
  /**
   * Makes the component display as an `inline-grid` rather than `grid`
   */
  inline: styles.one({
    display: 'inline-grid',
  }),
  /**
   * Sets a `justify-items` CSS property on your component
   */
  alignX: justifyItems,
  /**
   * Sets an `align-items` CSS property on your component
   */
  alignY: alignItems,
  /**
   * Sets a `justify-content` CSS property on your component
   */
  distributeX: justifyContent,
  /**
   * Sets an `align-content` CSS property on your component
   */
  distributeY: alignContent,
  /**
   * Sets a horizontal and vertical gap between the child elements in the row
   * using the "gap" token in your theme
   */
  gap: responsiveStyles.lazy(
    (
      value:
        | Extract<keyof DashTokens['gap'], number | string>
        | [
            Extract<keyof DashTokens['gap'], number | string>,
            Extract<keyof DashTokens['gap'], number | string>
          ]
    ) => ({gap}) => ({
      gridGap: Array.isArray(value)
        ? value.map((p) => gap[p]).join(' ')
        : gap[value] + ' ' + gap[value],
    })
  ),
  /**
   * Sets a `grid-template-rows` CSS property on your component
   */
  rows: responsiveStyles.lazy((value: number | (number | string)[]) => {
    let rows: (number | string)[];
    if (Array.isArray(value)) rows = value;
    // ie doesn't have repeat
    else rows = new Array(value).fill('1fr');
    return {gridTemplateRows: rows.map((row) => unit(row)).join(' ')};
  }),
});

/**
 * A layout style that distributes its children in a grid like so:
 *
 * ```
 * ☐ ☐ ☐
 * ☐ ☐ ☐
 * ☐ ☐ ☐
 * ```
 *
 * @example
 * <div className={grid({rows: 2, cols: 2})}>
 *   <GridItem/>
 *   <GridItem/>
 *   <GridItem/>
 *   <GridItem/>
 * </div>
 */
export const grid = compoundStyles({
  /**
   * Sets a `grid-template-columns` CSS property on your component
   */
  cols: responsiveStyles.lazy((value: number | (number | string)[]) => {
    let columns: (number | string)[];
    if (Array.isArray(value)) columns = value;
    // ie doesn't have repeat
    else columns = new Array(value).fill('1fr');
    return {gridTemplateColumns: columns.map((col) => unit(col)).join(' ')};
  }),
  ...sharedGrid.styles,
  ...box.styles,
});

/**
 * A layout style that can add positioning properties to itself inside
 * of a `<Grid>` component.
 *
 * @example
 * <div className={grid({cols: 2, rows: 2})}>
 *   // Occupies 2 columns
 *   <div className={gridItem({colStart: 1, colEnd: 2})} />
 *   <div/>
 *   <div/>
 * </div>
 */
export const gridItem = compoundStyles({
  /**
   * Sets a `justify-self` CSS property on your component
   */
  distribute: justifySelf,
  /**
   * Sets an `align-self` CSS property on your component
   */
  align: alignSelf,
  /**
   * Sets a `grid-column-start` CSS property on your component
   */
  colStart: responsiveStyles.lazy((gridColumnStart: number | string) => ({
    gridColumnStart,
  })),
  /**
   * Sets a `grid-column-end` CSS property on your component
   */
  colEnd: responsiveStyles.lazy((gridColumnEnd: number | string) => ({
    gridColumnEnd,
  })),
  /**
   * Sets a `grid-row-start` CSS property on your component
   */
  rowStart: responsiveStyles.lazy((gridRowStart: number | string) => ({
    gridRowStart,
  })),
  /**
   * Sets a `grid-row-end` CSS property on your component
   */
  rowEnd: responsiveStyles.lazy((gridRowEnd: number | string) => ({
    gridRowEnd,
  })),
  ...box.styles,
});

/**
 * A grid that automatically chooses a number of columns based on a preferred
 * minimum grid item width. The items will grow to fit snugly within the grid
 * container, like with flex wrapping, but no item will grow larger than the
 * column size, unlike flex wrapping.
 *
 * ☐ ☐ ☐
 * ☐ ☐ ☐
 * ☐ ☐
 */
export const autoGrid = compoundStyles({
  /**
   * The minimum width of a grid item
   */
  itemWidth: responsiveStyles.lazy((itemWidth: number | string) => ({
    gridTemplateColumns: `repeat(auto-fit, minmax(${unit(itemWidth)}, 1fr))`,
  })),
  ...sharedGrid.styles,
});

/**
 * A layout style than positions itself absolutely inside of its
 * container in whichever placement you decide.
 *
 * @example
 * <div className={layer({placement: 'bottomRight', offset: 24})} />
 */
export const layer = compoundStyles({
  default: styles.one({
    position: 'absolute',
  }),
  /**
   * Sets a `margin` between the edges of the layer item's container
   */
  offset: responsiveStyles.lazy((margin: number | string) => ({margin})),
  /**
   * Sets the placement of your layer item relative to its container
   */
  placement: responsiveStyles.lazy(
    (
      value:
        | 'top'
        | 'right'
        | 'bottom'
        | 'left'
        | 'center'
        | 'topLeft'
        | 'topRight'
        | 'bottomRight'
        | 'bottomLeft'
    ) => {
      if (value === 'center') {
        return {top: '50%', left: '50%', transform: 'translate(-50%, -50%)'};
      }

      const lValue = value.toLowerCase();
      const yProp =
        lValue.indexOf('top') > -1
          ? 'top'
          : lValue.indexOf('bottom') > -1
          ? 'bottom'
          : void 0;

      const xProp =
        lValue.indexOf('left') > -1
          ? 'left'
          : lValue.indexOf('right') > -1
          ? 'right'
          : void 0;

      const styles: Record<string, string | number> = {};

      if (yProp) {
        styles[yProp] = 0;
      }

      if (xProp) {
        styles[xProp] = 0;
      }

      if (value === 'left' || value === 'right') {
        styles.top = '50%';
        styles.transform = 'translateY(-50%)';
      }

      if (value === 'bottom' || value === 'top') {
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
      }

      return styles;
    }
  ),
  ...box.styles,
});

/**
 * A layout style that distributes its items in a row without wrapping
 * like so:
 *
 * ```
 * ☐ ☐ ☐ ☐ ☐ ☐ ☐
 * ```
 *
 * @example
 * <div className={row({gap: 'sm'})}>
 *   <Item/>
 *   <Item/>
 * </div>
 */
export const row = compoundStyles({
  default: styles.one({
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      flexShrink: 0,
    },
  }),
  /**
   * Sets a horizontal gap between the child elements in the cluster using the "gap"
   * token in your theme
   */
  gap: responsiveStyles.lazy(
    (value: Extract<keyof DashTokens['gap'], string | number>) => ({gap}) => ({
      '& > * + *': {
        marginLeft: `${gap[value]}!important`,
      },
    })
  ),
  /**
   * Distributed alignment properties on the y-axis using `justify-content`
   */
  distribute: justifyContent,
  /**
   * Positional alignment for its child items on the x-axis using `align-items`
   */
  align: alignItems,
  ...box.styles,
});
