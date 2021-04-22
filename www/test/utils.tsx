import {render} from '@testing-library/react';
import {StylesProvider} from '@/styles';

export function renderStyled(
  ui: Parameters<typeof render>[0],
  options?: Parameters<typeof render>[1]
) {
  return render(ui, {
    ...options,
    wrapper: ({children}) => <StylesProvider>{children}</StylesProvider>,
  });
}
