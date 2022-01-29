export default class AppError extends Error {
    constructor(name: string, message: string, stack?: string) {
        super(name);
        this.message = message;
        this.stack = stack;
    }
}
