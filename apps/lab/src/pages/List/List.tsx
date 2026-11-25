import { Badge, type BadgeVariant } from '@jobtrail/ui';
import type { BoardItem, ItemState } from '../../store/boardReducer';
import './List.css';

const STATUS: Record<ItemState, { label: string; variant: BadgeVariant }> = {
    applied: { label: 'Ready', variant: 'neutral' },
    in_progress: { label: 'In Progress', variant: 'warning' },
    done: { label: 'Done', variant: 'success' },
};

function List({ items }: { items: BoardItem[] }) {
    if (items.length === 0) {
        return <p className="list--empty">No items yet.</p>;
    }

    return (
        <ul className="list">
            {items.map((item) => (
                <li key={item.id} className="list--item">
                    <div>
                        <strong>{item.company}</strong>
                        <div>{item.role}</div>
                    </div>
                    <Badge variant={STATUS[item.state].variant}>
                        {STATUS[item.state].label}
                    </Badge>
                </li>
            ))}
        </ul>
    );
}

export default List;
