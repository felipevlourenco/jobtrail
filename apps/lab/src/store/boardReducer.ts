export type ItemState = 'applied' | 'in_progress' | 'done';

export type BoardItem = {
    id: number;
    company: string;
    role: string;
    state: ItemState;
};

type BoardActionType = 'add' | 'edit' | 'remove' | 'move';

type BoardAction = {
    type: BoardActionType;
    payload: BoardItem;
    // 'move' only: drop the item before this id; null/undefined = end of list
    beforeId?: number | null;
};

type BoardState = {
    items: BoardItem[];
};

function boardReducer(state: BoardState, action: BoardAction) {
    const { type, payload, beforeId } = action;

    switch (type) {
        case 'add':
            return {
                items: [...state.items, payload],
            };
        case 'edit':
            return {
                items: state.items.map((item) =>
                    item.id === payload.id ? payload : item,
                ),
            };
        case 'remove':
            return {
                items: state.items.filter((item) => item.id !== payload.id),
            };
        case 'move': {
            if (beforeId === payload.id) return state;

            const items = state.items.filter((item) => item.id !== payload.id);
            const index =
                beforeId == null
                    ? -1
                    : items.findIndex((item) => item.id === beforeId);

            if (index === -1) {
                items.push(payload);
            } else {
                items.splice(index, 0, payload);
            }

            return { items };
        }
        default:
            return state;
    }
}

export default boardReducer;
