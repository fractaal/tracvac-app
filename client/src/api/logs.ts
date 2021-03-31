import { api } from './server'
import { store } from './store'
import notify from 'src/api/notify'

interface LogsResponse {
  result: boolean;
  logs: Log[];
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
} as Record<string, any>

export async function getLogs () {
  try {
    const response = await (await api.get('/log')).data as LogsResponse

    if (response.result) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      store.logs = response.logs
      return true
    } else {
      notify.negative('Getting logs failed.')
      return false
    }
  } catch (err) {
    notify.negative(`Getting logs failed: ${err.message}`)
    return false
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
