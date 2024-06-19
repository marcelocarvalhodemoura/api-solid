export class MaxNumberOfCheckInError extends Error {
    constructor() {
        super('The maximum number of check-ins has been reached.');
    }
}