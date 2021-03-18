import { api } from './server'
import { store } from './store'
import { Notify } from 'quasar'

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
      Notify.create({ message: 'Getting logs failed.', type: 'negative' })
      return false
    }
  } catch (err) {
    Notify.create({ message: `Getting logs failed: ${err.message}`, type: 'negative' })
    return false
  }
}

export async function postLog (logData: Log) {
  console.log(logData)
  try {
    const response = await (await api.post('/log', logData)).data as {result: boolean; message?: string}

    if (response.result) {
      Notify.create({ message: 'Log posted!', type: 'positive', position: 'center' })
      return true
    } else {
      Notify.create({ message: 'Log post failed!', type: 'negative', position: 'center' })
      return false
    }
  } catch (err) {
    Notify.create({ message: 'Log post failed!', type: 'negative', position: 'center' })
    return false
  }
}
