export type PaginationLinks = {
    label: string;
    url: string | null;
    active: boolean;
}

export type PaginationData<T> = {
    data: T[];
    total: number;
    from: number;
    to: number;
    current_page: number;
    last_page: number;
    per_page: number;
    path: string;
    prev_page_url: string | null;
    next_page_url: string | null;
    first_page_url: string;
    last_page_url: string;
    links: PaginationLinks[];
}