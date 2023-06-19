export interface Todo {
    id: number | null;
    title?: string;
    description?: string;
    complete?: boolean
    priority?: string
}

export interface Priority {
    name: string,
    code: string
}
