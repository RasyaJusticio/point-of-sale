import { Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

export type ActionCellProps = {
    editRoute: string;
};

export function ActionCell({ editRoute }: ActionCellProps) {
    return (
        <div className="flex items-center gap-2">
            <Link href={editRoute}>
                <Pencil className="text-blue-500" size={16} />
            </Link>
        </div>
    );
}
