// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

it('calls the callback once, after the delay, with the last arguments', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 300));

    result.current('a');
    vi.advanceTimersByTime(200);
    result.current('ab');
    vi.advanceTimersByTime(299);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalledExactlyOnceWith('ab');
});

it('does not call the callback after unmount', () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => useDebounce(callback));

    result.current();
    unmount();
    vi.runAllTimers();

    expect(callback).not.toHaveBeenCalled();
});
