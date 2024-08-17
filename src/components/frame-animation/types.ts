export interface FrameAnimationProps {
  // 帧动画方向
  direction?: 'vertical' | 'horizontal';
  // 图片的数量
  imgNumber: number;
  // 一秒钟的动画量默认为60
  frameNumber?: number;
  width: React.CSSProperties['width'];
  height: React.CSSProperties['height'];
  // icon地址
  icon: string;
  style?: React.CSSProperties;
}
