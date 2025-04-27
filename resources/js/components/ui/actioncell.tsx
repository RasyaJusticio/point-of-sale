import { Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { DeleteDialog } from './delete-dialog';

export type ActionCellProps = {
    editRoute: string;
    deleteRoute: string;
};

export function ActionCell({ editRoute, deleteRoute }: ActionCellProps) {
    return (
        <div className="flex items-center gap-2">
            {editRoute && (
                <Link href={editRoute}>
                    <Pencil className="text-blue-500" size={16} />
                </Link>
            )}
            {deleteRoute && <DeleteDialog onDeleteRoute={deleteRoute} />}
        </div>
    );
}
