export type LoadingSizeType = 'small' | 'middle' | 'large';

export interface SLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: LoadingSizeType;
  className?: string;
}
