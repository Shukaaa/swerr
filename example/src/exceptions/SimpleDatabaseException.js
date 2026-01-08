/**
 * Exception class with naming based on the error property.
 * @error ThisIsASimpleDatabaseError
 */
export class SimpleDatabaseException extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseException';
    }
}