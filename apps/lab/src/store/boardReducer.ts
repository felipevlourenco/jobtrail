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
};

type BoardState = {
    items: BoardItem[];
};

function boardReducer(state: BoardState, action: BoardAction) {
    const { type, payload } = action;

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
        case 'move':
            return {
                items: state.items.map((item) =>
                    item.id === payload.id ? payload : item,
                ),
            };
        default:
            return state;
    }
}

export default boardReducer;
