import gradient from "gradient-string";

const COLORS = {
    reset: "\x1b[0m",
    info: "\x1b[36m",
    warn: "\x1b[33m",
    error: "\x1b[31m",
    debug: "\x1b[90m",
    success: "\x1b[32m"
};

const PALETTES = [
    ['#ff9292', '#9e1818'],
    ['#da7a7a', '#7e1212'],
    ['#ba6767', '#650e0e'],
    ['#da7a7a', '#7e1212'],
];

export class LogUtils {
    private static tick = 0;

    static get prefix() {
        const text = "Errogger ❯❯❯❯";
        let colored = '';
        const len = text.length;

        for (let i = 0; i < len; i++) {
            const palette = PALETTES[(i + LogUtils.tick) % PALETTES.length];
            const grad = gradient(palette);
            colored += grad(text[i]);
        }

        LogUtils.tick++;
        return colored;
    }

    static info(message: string) {
        console.log(`${this.prefix} ${COLORS.info}[INFO] ${message} ${COLORS.reset}`);
    }

    static warn(message: string) {
        console.warn(`${this.prefix} ${COLORS.warn}[WARN] ${message} ${COLORS.reset}`);
    }

    static error(message: string) {
        console.error(`${this.prefix} ${COLORS.error}[ERROR] ${message} ${COLORS.reset}`);
    }

    static debug(message: string) {
        console.debug(`${this.prefix} ${COLORS.debug}[DEBUG] ${message} ${COLORS.reset}`);
    }

    static success(message: string) {
        console.log(`${this.prefix} ${COLORS.success}[SUCCESS] ${message} ${COLORS.reset}`);
    }
}