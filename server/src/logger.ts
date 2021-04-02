import chalk from 'chalk';
import cluster from 'cluster';

export default function register (name: string) {
  console.log(chalk.blue(`[Logger] Registered new module ${name}.`));
  const clusterName = cluster.isWorker ? `#${cluster.worker.id}` : `MAIN`;

  return {
    log: (...data: any[]) => console.log(`[${clusterName} I:${name.toUpperCase()}]`, ...data),
    warn: (...data: any[]) => console.warn(chalk.yellowBright(`[${clusterName} W:${name.toUpperCase()}]`, ...data)),
    error: (...data: any[]) => console.error(chalk.bgRedBright(`[${clusterName} E:${name.toUpperCase()}]`, ...data)),
    success: (...data: any[]) => console.log(chalk.greenBright(`[${clusterName} S:${name.toUpperCase()}]`,...data)),
  }
}
