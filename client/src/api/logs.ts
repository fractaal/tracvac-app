import { api } from './server'
import { store } from './store'
import notify from 'src/api/notify'

interface LogsResponse {
  result: boolean;
  logs: {
    results: Log[],
    total: number
  }
}

export interface Log {
  id: number;
  userId: number;
  fever: boolean;
  abdominalPain: boolean;
  chills: boolean;
  cough: boolean;
  diarrhea: boolean;
  difficultyBreathing: boolean;
  headache: boolean;
  soreThroat: boolean;
  nauseaOrVomiting: boolean;
  createdAt?: string;
  updatedAt?: any;
  others: string;
  [x: string]: string|number|boolean|undefined;
}

export const displayNameMappings = {
  fever: 'Fever',
  abdominalPain: 'Abdominal Pain',
  chills: 'Chills',
  cough: 'Cough',
  diarrhea: 'Diarrhea',
  difficultyBreathing: 'Difficulty Breathing',
  headache: 'Headache',
  soreThroat: 'Sore Throat',
  nauseaOrVomiting: 'Nausea or Vomiting'
} as const

export function resetLogs () {
  store.logs = []
}

export async function getLogs (index: number) {
  try {
    const response = await (await api.get(`/log/${index}`)).data as LogsResponse

    console.log(response)
    if (response.result) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      store.logs.push(...response.logs.results)
      return [true, response.logs.results.length === 0]
    } else {
      notify.negative('Getting logs failed.')
      return [false]
    }
  } catch (err) {
    notify.negative(`Getting logs failed: ${err.message}`)
    return [false]
  }
}

export async function postLog (logData: Log) {
  console.log(logData)
  try {
    const response = await (await api.post('/log', logData)).data as {result: boolean; message?: string}

    if (response.result) {
      notify.positive('Log posted!')
      return true
    } else {
      notify.negative('Log post failed!')
      return false
    }
  } catch (err) {
    notify.negative('Log post failed!')
    return false
  }
}

export async function deleteLog (id: number) {
  try {
    const response = await (await api.delete(`/log/${id}`)).data

    if (response.result) {
      notify.positive('Log deleted!')
      return true
    } else {
      notify.negative(`Log delete failed: ${response.message}`)
      return false
    }
  } catch (err) {
    notify.negative(`Log delete failed: ${err}`)
    return false
  }
}
