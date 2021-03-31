import { Log } from './logs'
import { User } from './user'
import { MenuItem } from 'src/api/menu'
import { Notification } from 'src/api/notification'

export const store = {
  userInfo: {} as unknown as User | null,
  logs: [] as Log[],
  recentlyViewed: {} as MenuItem,
  activeRoute: '',
  notifications: [] as Notification[],
  serverInfo: {} as Record<string, string>
}
