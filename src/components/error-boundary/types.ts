import { ReactNode } from 'react';
import { FallbackProps } from 'react-error-boundary';

export interface SErrorBoundaryTypes {
  children?: ReactNode;
  fallbackRender?: (props: FallbackProps) => ReactNode;
}
