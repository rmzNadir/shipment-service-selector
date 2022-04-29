import { act, renderHook } from '@testing-library/react-hooks';
import { TouchEvent } from 'react';

import { useHorizontalSwipe } from '@/hooks/useHorizontalSwipe';

const mockStartTouch = {
  clientX: 1000,
} as Touch;

const mockEndTouch = {
  clientX: 500,
} as Touch;

const mockStartEvent = {
  targetTouches: {
    item: () => mockStartTouch,
    length: 10,
    identifiedTouch: () => mockStartTouch,
  },
} as unknown as TouchEvent<HTMLDivElement>;

const mockEndEvent = {
  targetTouches: {
    item: () => mockEndTouch,
    length: 10,
    identifiedTouch: () => mockEndTouch,
  },
} as unknown as TouchEvent<HTMLDivElement>;

describe('useHorizontalSwipe', () => {
  it('Should return the correct values', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useHorizontalSwipe(callback));

    act(() => {
      result.current.onTouchStart(mockStartEvent);
      result.current.onTouchMove(mockEndEvent);
    });

    act(() => {
      result.current.onTouchEnd();
    });

    expect(result.current).toHaveProperty('onTouchStart');
    expect(result.current).toHaveProperty('onTouchMove');
    expect(result.current).toHaveProperty('onTouchEnd');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('Should fire the callback if the event is a valid swipe', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useHorizontalSwipe(callback));

    act(() => {
      result.current.onTouchStart(mockStartEvent);
      result.current.onTouchMove(mockEndEvent);
    });

    act(() => {
      result.current.onTouchEnd();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("Shouldn't fire the callback if the event isn't a valid swipe", () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useHorizontalSwipe(callback, { minSwipeDistancePercentage: 100 })
    );

    act(() => {
      result.current.onTouchStart(mockStartEvent);
      result.current.onTouchMove(mockEndEvent);
    });

    act(() => {
      result.current.onTouchEnd();
    });

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
