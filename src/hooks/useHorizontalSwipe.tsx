import { TouchEvent, useState } from 'react';

export interface UseHorizontalSwipe {
  isRightSwipe?: boolean;
  minSwipeDistancePercentage?: number;
}

export const useHorizontalSwipe = <E extends HTMLElement>(
  callback: () => void,
  config?: UseHorizontalSwipe
) => {
  const { isRightSwipe = false, minSwipeDistancePercentage = 30 } =
    config ?? {};

  const [touchStart, setTouchStart] = useState<number>();
  const [touchEnd, setTouchEnd] = useState<number>();

  const minSwipeDistance =
    typeof window !== 'undefined'
      ? (minSwipeDistancePercentage * window.innerWidth) / 100
      : 100;

  const onTouchStart = (e: TouchEvent<E>) => {
    setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches.item(0).clientX);
  };

  const onTouchMove = (e: TouchEvent<E>) =>
    setTouchEnd(e.targetTouches.item(0).clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;

    let isSwipe = false;

    isSwipe = distance > minSwipeDistance;

    if (isRightSwipe) {
      isSwipe = distance < -minSwipeDistance;
    }

    if (isSwipe) {
      callback();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};
