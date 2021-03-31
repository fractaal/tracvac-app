import { Notify } from 'quasar'

const options = {
  timeout: 2500
}

export default {
  positive: (message: string) => Notify.create({ message, type: 'positive', ...options }),
  negative: (message: string) => Notify.create({ message, type: 'negative', ...options }),
  info: (message: string) => Notify.create({ message, ...options })
}
