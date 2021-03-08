import chalk from 'chalk';

export default function register (name: string) {
  console.log(chalk.blue(`[Logger] Registered new module ${name}.`));
  return {
    log: (...data: any[]) => console.log(`[I:${name.toUpperCase()}]`, ...data),
    warn: (...data: any[]) => console.warn(chalk.yellowBright(`[W:${name.toUpperCase()}]`, ...data)),
    error: (...data: any[]) => console.error(chalk.bgRedBright(`[E:${name.toUpperCase()}]`, ...data)),
    success: (...data: any[]) => console.log(chalk.greenBright(`[S:${name.toUpperCase()}]`,...data)),
  }
}