import {
  CSSObject,
  Interpolation,
  InterpolationFunction,
  ThemedStyledProps,
} from 'styled-components';

export const BreakPoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};

export function screenUp(minWidth: keyof typeof BreakPoints, props?: any) {
  return function (
    style:
      | string
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<ThemedStyledProps<any, any>>,
    ...args: Array<Interpolation<ThemedStyledProps<any, any>>>
  ) {
    let css = '';
    if (Array.isArray(style)) {
      css = style
        .map((part, i) => {
          const arg = args[i];
          if (typeof arg === 'string') {
            return part + arg;
          }

          if (typeof arg === 'function') {
            return part + arg.call(null, props);
          }

          return part;
        })
        .join('');
    } else {
      css = style.toString();
    }
    return `@media screen and (min-width: ${BreakPoints[minWidth]}) {` + css + '}';
  };
}
