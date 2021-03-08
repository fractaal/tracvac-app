import chalk from 'chalk';

export default function register (name: string) {
  console.log(chalk.blue(`[NEW:Logger] Registered new subsystem ${name}.`));
  return {
    log: (...data: any[]) => console.log(`[INF:${name.toUpperCase()}]`, ...data),
    warn: (...data: any[]) => console.warn(chalk.yellowBright(`[WRN:${name.toUpperCase()}]`, ...data)),
    error: (...data: any[]) => console.error(chalk.bgRedBright(`[ERR:${name.toUpperCase()}]`, ...data)),
    success: (...data: any[]) => console.log(chalk.greenBright(`[CHK:${name.toUpperCase()}]`,...data)),
  }
}