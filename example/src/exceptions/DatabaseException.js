/**
 * Exception class with automatic naming based on the class name.
 * @error
 */
export class DatabaseException extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseException';
    }
}