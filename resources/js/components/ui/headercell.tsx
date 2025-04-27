import { ArrowDown, ArrowUp } from 'lucide-react';
import { FiltersData } from './datatable';

export function HeaderCell({
    label,
    columnKey,
    filters,
    handleSort,
}: {
    label: string;
    columnKey: string;
    filters: FiltersData;
    handleSort: (column: string) => void;
}) {
    return (
        <button onClick={() => handleSort(columnKey)}>
            {label}
            {filters.sort.column === columnKey && (filters.sort.order === 'asc' ? <ArrowUp /> : <ArrowDown />)}
        </button>
    );
}
