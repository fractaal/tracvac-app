import Logger from './logger'

const logger = Logger("Insight")

const loaders: (() => Promise<[string, Record<string,any>]>)[] = []

export function addInsightLoader(loader: () => Promise<[string, Record<string,any>]>) {
	loaders.push(loader)
}

export const getInsightLoaders = () => loaders