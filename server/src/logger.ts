import chalk from 'chalk';
import cluster from 'cluster';

export default function register (name: string) {
  const clusterName = cluster.isWorker ? `#${cluster.worker.id}` : `MAIN`;

  if (process.env.VERBOSE == '1') console.log(chalk.blue(`[${clusterName}|LOGGER] Registered new module ${name}.`));

  return {
    log: (...data: any[]) => {
      if (process.env.VERBOSE == '1' && process.env.NODE_ENV !== "TEST") {
        console.log(`[${clusterName}|I:${name.toUpperCase()}]`, ...data)
      }
    },
    warn: (...data: any[]) => {
      if (process.env.NODE_ENV === "TEST") return
      console.warn(chalk.yellowBright(`[${clusterName}|W:${name.toUpperCase()}]`, ...data))
    },
    error: (...data: any[]) => {
      if (process.env.NODE_ENV === "TEST") return
      console.error(chalk.bgRedBright.black(`[${clusterName}|E:${name.toUpperCase()}]`, ...data))
    },
    success: (...data: any[]) => {
      if (process.env.NODE_ENV === "TEST") return
      console.log(chalk.greenBright(`[${clusterName}|S:${name.toUpperCase()}]`,...data))
    },
  }
}
