import { MutableRefObject, useEffect, useRef, useState } from 'react';

/**
 * @param ref MutableRefObj 目标元素
 * @param imgNumber number 总帧数（序列图总数）
 * @param direction "vertical"|"horizontal" 绘制帧方向 默认"vertical"
 * @param frameNumber number 1s内帧数 默认60帧
 * @returns setDispatch<"in"|"out"> 设置鼠标移入还是移出
 */
interface UseFrameAnimationProps {
  ref: MutableRefObject<HTMLElement | null>;
  imgNumber: number;
  direction?: 'vertical' | 'horizontal';
  frameNumber?: number;
}

function useFrameAnimation(props: UseFrameAnimationProps) {
  const { ref, imgNumber, direction = 'vertical', frameNumber = 60 } = props;

  // 一帧跨越的高度 数值
  const [frameHeight, setFrameHeight] = useState<number>(0);
  // 一帧跨越的高度 单位
  const [frameHeightUnit, setFrameHeightUnit] = useState<string>('px');

  const handleResize = () => {
    const heightString =
      (ref?.current && window.getComputedStyle(ref.current).height) || '0';
    const height = parseInt(heightString);
    setFrameHeight(height);
    setFrameHeightUnit(heightString.replace(height.toString(), ''));
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  const [type, setType] = useState<'in' | 'out' | undefined>();

  // 间隔多少秒后绘制一帧
  const [frameTime, setFrameTime] = useState(1000 / (frameNumber - 1));

  useEffect(() => {
    setFrameTime(1000 / (frameNumber - 1));
  }, [frameNumber]);

  // 处理到第几帧画面
  const frameImage = useRef<number>(0);
  // 上次绘制帧的时间
  const enterTiming = useRef<number>(0);
  // requestAnimationFrame flag
  const requestFlag = useRef<number | null>(null);

  const animationFunc = (type = 'in') => {
    // 获取当前时间 与 enterTiming对比 超过frameTime则绘制下一帧
    const nowTime = Date.now();

    if (nowTime - enterTiming.current >= frameTime) {
      enterTiming.current = nowTime;
      // 通过离散地移动backgroundPosition跳到下一帧
      if (direction === 'horizontal') {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        ref.current &&
          (ref.current.style.backgroundPosition = `-${
            frameImage.current * frameHeight
          }${frameHeightUnit} 0`);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        ref.current &&
          (ref.current.style.backgroundPosition = `0 -${
            frameImage.current * frameHeight
          }${frameHeightUnit}`);
      }
      // 判断是否中断绘制，或已绘制到最后一张
      if (type === 'in') {
        frameImage.current += 1;

        if (frameImage.current >= imgNumber) {
          return;
        }
      } else {
        if (frameImage.current <= 0) {
          return;
        }
        frameImage.current -= 1;
      }
    }
    // 继续绘制
    requestFlag.current = requestAnimationFrame(() => animationFunc(type));
  };

  useEffect(
    () => () => {
      if (requestFlag.current) {
        cancelAnimationFrame(requestFlag.current);
      }
    },
    [],
  );

  // type变更则开始绘制
  useEffect(() => {
    if (!type) {
      return;
    }
    // 终止上次绘制
    if (requestFlag.current) {
      cancelAnimationFrame(requestFlag.current);
    }

    if (frameImage.current === imgNumber) {
      frameImage.current -= 1;
    }

    enterTiming.current = Date.now();
    requestFlag.current = requestAnimationFrame(() => animationFunc(type));
  }, [type]);

  return setType;
}

export default useFrameAnimation;
