import Logger from './logger'

const logger = Logger("Insight")

// const loaders: (() => Promise<[string, string, Record<string,any>]>)[] = []

interface InsightLoader {
	loader: () => Promise<Record<string,any>>
	section: string,
	name: string
}

const loaders: InsightLoader[] = []

export function addInsightLoader(loader: () => Promise<Record<string,any>>, section: string, name: string) {
	logger.log(`Insight loader ${section} - ${name} added`)
	loaders.push({loader, section, name})
}

export const getInsightLoaders = () => loaders