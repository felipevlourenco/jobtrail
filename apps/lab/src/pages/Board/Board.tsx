import { Card, Dialog, useDialog } from '@jobtrail/ui';
import { useReducer, useRef, useState, type DragEvent } from 'react';
import { flushSync } from 'react-dom';
import ApplicationForm from '../../Application/ApplicationForm';
import boardReducer, {
    type BoardItem,
    type ItemState,
} from '../../store/boardReducer';
import './Board.css';

const testItems: BoardItem[] = [
    {
        id: 1,
        company: 'Northstar',
        role: 'Frontend Engineer',
        state: 'done',
    },
    {
        id: 2,
        company: 'Brightside',
        role: 'Product Designer',
        state: 'done',
    },
    {
        id: 3,
        company: 'Acme',
        role: 'Full Stack Developer',
        state: 'in_progress',
    },
    {
        id: 4,
        company: 'Greenfield Labs',
        role: 'Software Engineer',
        state: 'in_progress',
    },
    {
        id: 5,
        company: 'Orbit',
        role: 'Backend Engineer',
        state: 'applied',
    },
    {
        id: 6,
        company: 'Paperplane',
        role: 'QA Engineer',
        state: 'applied',
    },
    {
        id: 7,
        company: 'Atlas',
        role: 'UX Researcher',
        state: 'applied',
    },
    {
        id: 8,
        company: 'Juniper',
        role: 'Technical Writer',
        state: 'done',
    },
    {
        id: 9,
        company: 'Cloudline',
        role: 'Platform Engineer',
        state: 'in_progress',
    },
];

function Form({
    onSubmit,
}: {
    onSubmit: (item: { company: string; role: string }) => void;
}) {
    const { setOpen } = useDialog();

    return (
        <ApplicationForm
            onSubmit={(item: { company: string; role: string }) => {
                onSubmit(item);
                setOpen(false);
            }}
        />
    );
}

// Id of the card the pointer is above (drop BEFORE it), or null for the end.
const getBeforeId = (column: HTMLElement, clientY: number): number | null => {
    const cards = column.querySelectorAll<HTMLElement>('li[data-id]:not(.grab)');

    for (const card of cards) {
        const { top, height } = card.getBoundingClientRect();

        if (clientY < top + height / 2) {
            return Number(card.dataset.id);
        }
    }

    return null;
};

function Board() {
    const [state, dispatch] = useReducer(boardReducer, { items: testItems });
    // Where the held card would land: in `column`, before card `beforeId`
    // (null = at the end). Used to open a gap while dragging.
    const [dropTarget, setDropTarget] = useState<{
        column: ItemState;
        beforeId: number | null;
    } | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const applied = state.items.filter((item) => item.state === 'applied');
    const inProgress = state.items.filter(
        (item) => item.state === 'in_progress',
    );
    const done = state.items.filter((item) => item.state === 'done');

    const readDraggedId = (dataTransfer: DataTransfer): number | null => {
        const rawId = dataTransfer.getData('id');

        if (!rawId) {
            return null;
        }

        const id = Number(rawId);

        return Number.isInteger(id) ? id : null;
    };

    const addItemHandler = (item: { company: string; role: string }) => {
        // Array order changes when cards are moved, so use the highest id.
        const lastId = Math.max(0, ...state.items.map((item) => item.id));
        dispatch({
            type: 'add',
            payload: {
                ...item,
                id: lastId + 1,
                state: 'applied',
            },
        });
    };

    const handleDragStart = (event: DragEvent, id: number) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('id', String(id));
        event.currentTarget.classList.add('grab');

        // The gap that opens must be as tall as the card being held.
        contentRef.current?.style.setProperty(
            '--drop-gap',
            `${event.currentTarget.getBoundingClientRect().height}px`,
        );
    };

    const handleDragEnd = (event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';

        // The drag may end outside any column, so clear every hover.
        document
            .querySelectorAll('.board--column.hover')
            .forEach((column) => column.classList.remove('hover'));
        setDropTarget(null);

        event.currentTarget.classList.remove('grab');
    };

    const handleDragOver = (event: DragEvent, column: ItemState) => {
        event.preventDefault();

        const beforeId = getBeforeId(
            event.currentTarget as HTMLElement,
            event.clientY,
        );

        // dragover fires constantly: only update state when it changes.
        setDropTarget((prev) =>
            prev?.column === column && prev.beforeId === beforeId
                ? prev
                : { column, beforeId },
        );
    };

    const handleDragEnter = (event: DragEvent) => {
        event.preventDefault();
        event.currentTarget.classList.add('hover');
    };

    const handleDragLeave = (event: DragEvent) => {
        // dragleave also fires when moving onto a child (a card). Only remove
        // the class when the pointer really leaves the column.
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
        }

        event.currentTarget.classList.remove('hover');
        setDropTarget(null);
    };

    const handleDrop = (event: DragEvent, targetState: ItemState) => {
        event.currentTarget.classList.remove('hover');
        setDropTarget(null);

        const draggedId = readDraggedId(event.dataTransfer);
        const item = state.items.find((item) => item.id === draggedId);

        if (draggedId && item) {
            const action = {
                type: 'move' as const,
                payload: { ...item, state: targetState },
                beforeId: getBeforeId(
                    event.currentTarget as HTMLElement,
                    event.clientY,
                ),
            };

            // Animate cards to their new positions (View Transitions API).
            // flushSync makes React update the DOM inside the callback.
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    flushSync(() => dispatch(action));
                });
            } else {
                dispatch(action);
            }
        }
    };

    // Cards from the drop point downward slide down by the held card's height.
    const itemClass = (column: ItemState, list: BoardItem[], index: number) => {
        if (dropTarget?.column !== column || dropTarget.beforeId === null) {
            return undefined;
        }

        const dropIndex = list.findIndex(
            (item) => item.id === dropTarget.beforeId,
        );

        return dropIndex !== -1 && index >= dropIndex ? 'make-room' : undefined;
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
            <div className="board--content" ref={contentRef}>
                <section>
                    <h3 className="board--title">Ready</h3>
                    <ul
                        className="board--column board--ready"
                        onDragOver={(event) => handleDragOver(event, 'applied')}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={(event) => handleDrop(event, 'applied')}
                    >
                        {applied.map((item, index) => (
                            <li
                                key={item.id}
                                data-id={item.id}
                                className={itemClass('applied', applied, index)}
                                style={{ viewTransitionName: `card-${item.id}` }}
                                draggable
                                onDragStart={(event) =>
                                    handleDragStart(event, item.id)
                                }
                                onDragEnd={(event) => handleDragEnd(event)}
                            >
                                <Card
                                    id={item.id}
                                    header={item.company}
                                    className="board--card"
                                >
                                    <span className="board--card__role">
                                        {item.role}
                                    </span>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h3 className="board--title">In Progress</h3>
                    <ul
                        className="board--column board--in-progress"
                        onDragOver={(event) => handleDragOver(event, 'in_progress')}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={(event) => handleDrop(event, 'in_progress')}
                    >
                        {inProgress.map((item, index) => (
                            <li
                                key={item.id}
                                data-id={item.id}
                                className={itemClass('in_progress', inProgress, index)}
                                style={{ viewTransitionName: `card-${item.id}` }}
                                draggable
                                onDragStart={(event) =>
                                    handleDragStart(event, item.id)
                                }
                                onDragEnd={(event) => handleDragEnd(event)}
                            >
                                <Card
                                    id={item.id}
                                    header={item.company}
                                    className="board--card"
                                >
                                    <span className="board--card__role">
                                        {item.role}
                                    </span>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h3 className="board--title">Done</h3>
                    <ul
                        className="board--column board--done"
                        onDragOver={(event) => handleDragOver(event, 'done')}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={(event) => handleDrop(event, 'done')}
                    >
                        {done.map((item, index) => (
                            <li
                                key={item.id}
                                data-id={item.id}
                                className={itemClass('done', done, index)}
                                style={{ viewTransitionName: `card-${item.id}` }}
                                draggable
                                onDragStart={(event) =>
                                    handleDragStart(event, item.id)
                                }
                                onDragEnd={(event) => handleDragEnd(event)}
                            >
                                <Card
                                    id={item.id}
                                    header={item.company}
                                    className="board--card"
                                >
                                    <span className="board--card__role">
                                        {item.role}
                                    </span>
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
