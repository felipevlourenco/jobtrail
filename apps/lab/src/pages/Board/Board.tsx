import { Card, Dialog, useDialog } from '@jobtrail/ui';
import { useReducer } from 'react';
import ApplicationForm from '../../Application/ApplicationForm';
import boardReducer, { type BoardItem } from '../../store/boardReducer';
import './Board.css';

const testItems: BoardItem[] = [
    {
        id: 1,
        title: 'Set up project',
        content: 'Initialize the project structure and configure dependencies.',
        state: 'done',
    },
    {
        id: 2,
        title: 'Design dashboard',
        content:
            'Create the initial dashboard layout and define the component structure.',
        state: 'done',
    },
    {
        id: 3,
        title: 'Implement authentication',
        content: 'Add user login, registration, and session management.',
        state: 'in_progress',
    },
    {
        id: 4,
        title: 'Build kanban board',
        content:
            'Implement drag-and-drop functionality for moving items between columns.',
        state: 'in_progress',
    },
    {
        id: 5,
        title: 'Add API integration',
        content:
            'Connect the frontend to the backend API and handle responses.',
        state: 'ready',
    },
    {
        id: 6,
        title: 'Write unit tests',
        content: 'Add unit tests for the main components and business logic.',
        state: 'ready',
    },
    {
        id: 7,
        title: 'Improve accessibility',
        content:
            'Review keyboard navigation, screen reader support, and contrast.',
        state: 'ready',
    },
    {
        id: 8,
        title: 'Update documentation',
        content:
            'Document the application architecture and setup instructions.',
        state: 'done',
    },
    {
        id: 9,
        title: 'Optimize performance',
        content:
            'Identify rendering bottlenecks and improve application performance.',
        state: 'in_progress',
    },
];

function Form({
    onSubmit,
}: {
    onSubmit: (item: { title: string; content: string }) => void;
}) {
    const { setOpen } = useDialog();

    return (
        <ApplicationForm
            onSubmit={(item: { title: string; content: string }) => {
                onSubmit(item);
                setOpen(false);
            }}
        />
    );
}

function Board() {
    const [state, dispatch] = useReducer(boardReducer, { items: testItems });

    const ready = state.items.filter((item) => item.state === 'ready');
    const inProgress = state.items.filter(
        (item) => item.state === 'in_progress',
    );
    const done = state.items.filter((item) => item.state === 'done');

    const addItemHandler = (item: { title: string; content: string }) => {
        const lastId =
            state.items.length > 0 ? state.items[state.items.length - 1].id : 0;
        dispatch({
            type: 'add',
            payload: {
                ...item,
                id: lastId + 1,
                state: 'ready',
            },
        });
    };

    return (
        <div className="board--wrapper">
            <Dialog>
                <Dialog.Trigger>Add new Item</Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Title>Add new Item</Dialog.Title>
                    <Form onSubmit={addItemHandler} />
                </Dialog.Content>
            </Dialog>
            <div className="board--content">
                <section>
                    <h3 className="board--title">Ready</h3>
                    <ul className="board--column board--ready">
                        {ready.map((item) => (
                            <li key={item.id}>
                                <Card id={item.id} header={item.title}>
                                    {item.content}
                                </Card>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h3 className="board--title">In Progress</h3>
                    <ul className="board--column board--in-progress">
                        {inProgress.map((item) => (
                            <li key={item.id}>
                                <Card id={item.id} header={item.title}>
                                    {item.content}
                                </Card>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h3 className="board--title">Done</h3>
                    <ul className="board--column board--done">
                        {done.map((item) => (
                            <li key={item.id}>
                                <Card id={item.id} header={item.title}>
                                    {item.content}
                                </Card>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default Board;
