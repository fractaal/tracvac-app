import chalk from 'chalk';

export default function register (name: string) {
  console.log(`[INFO Logger] Registered new subsystem ${name}.`);
  return {
    log: (...data: any[]) => console.log(`[INFO ${name}]`, ...data),
    warn: (...data: any[]) => console.warn(chalk.yellowBright(`[WARN ${name}]`, ...data)),
    error: (...data: any[]) => console.error(chalk.bgRedBright(`[ERR ${name}]`, ...data)),
    success: (...data: any[]) => console.log(chalk.greenBright(`[SUCCESS ${name}]`,...data)),
  }
}