class Logger {
    log(...message: unknown[]) {
        console.log(...message);
    }
    error(...message: unknown[]) {
        console.log('Error:', ...message);
    }
}
export const logger = new Logger();