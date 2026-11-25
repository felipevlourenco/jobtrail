import { describe, expect, it } from 'vitest';
import boardReducer, { type BoardItem } from './boardReducer';

const item = (id: number, state: BoardItem['state'] = 'applied'): BoardItem => ({
    id,
    company: `Company ${id}`,
    role: `Role ${id}`,
    state,
});

const ids = (items: BoardItem[]) => items.map((i) => i.id);

describe('boardReducer', () => {
    describe('add', () => {
        it('appends the item', () => {
            const result = boardReducer({ items: [item(1)] }, { type: 'add', payload: item(2) });

            expect(ids(result.items)).toEqual([1, 2]);
        });

        it('does not mutate the previous state', () => {
            const state = { items: [item(1)] };

            boardReducer(state, { type: 'add', payload: item(2) });

            expect(ids(state.items)).toEqual([1]);
        });
    });

    describe('edit', () => {
        it('replaces the item with the same id', () => {
            const state = { items: [item(1), item(2)] };
            const edited = { ...item(2), company: 'New name' };

            const result = boardReducer(state, { type: 'edit', payload: edited });

            expect(result.items[1].company).toBe('New name');
            expect(result.items[0]).toBe(state.items[0]);
        });
    });

    describe('remove', () => {
        it('removes the item with the given id', () => {
            const state = { items: [item(1), item(2), item(3)] };

            const result = boardReducer(state, { type: 'remove', payload: item(2) });

            expect(ids(result.items)).toEqual([1, 3]);
        });
    });

    describe('move', () => {
        const state = { items: [item(1), item(2), item(3), item(4)] };
        const move = (id: number, beforeId?: number | null, to: BoardItem['state'] = 'done') =>
            boardReducer(state, {
                type: 'move',
                payload: { ...item(id), state: to },
                beforeId,
            });

        it('changes the item state', () => {
            const result = move(2);

            expect(result.items.find((i) => i.id === 2)?.state).toBe('done');
        });

        it('moves to the end when beforeId is null or missing', () => {
            expect(ids(move(1, null).items)).toEqual([2, 3, 4, 1]);
            expect(ids(move(1).items)).toEqual([2, 3, 4, 1]);
        });

        it('inserts before the given item', () => {
            expect(ids(move(4, 2).items)).toEqual([1, 4, 2, 3]);
        });

        it('inserts at the top when beforeId is the first item', () => {
            expect(ids(move(3, 1).items)).toEqual([3, 1, 2, 4]);
        });

        it('falls back to the end when beforeId does not exist', () => {
            expect(ids(move(1, 99).items)).toEqual([2, 3, 4, 1]);
        });

        it('returns the same state when dropped before itself', () => {
            expect(move(2, 2)).toBe(state);
        });

        it('never duplicates or loses items', () => {
            expect(move(2, 4).items).toHaveLength(4);
        });
    });

    it('returns the same state for an unknown action', () => {
        const state = { items: [item(1)] };

        // @ts-expect-error: testing the default branch with an invalid type
        expect(boardReducer(state, { type: 'nope', payload: item(1) })).toBe(state);
    });
});
