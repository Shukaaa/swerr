export type Action<T extends unknown[] = unknown[]> = (...args: T) => void;
export interface ErroggerCommand<T extends unknown[] = unknown[]> {
    command: string;
    description: string;
    action: Action<T>;
}