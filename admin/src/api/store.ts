import { AxiosInstance } from 'axios';

export default {
  usersToModify: [] as Record<string,any>[],
  axios: null as unknown as AxiosInstance,
  userShownInLogs: null as unknown as Record<string,any>,
  unreadLogsCount: 0,
  endpoint: '' as string,
  userActions: [] as Record<string,any>[],
  serverConfig: {
    isConfigured: false,
    isCorporation: false,
    secret: null,
    location: null,
    websiteUrl: null,
    httpPort: null,
    httpsPort: null,
  } as unknown as {
    isConfigured: boolean;
    isCorporation: boolean;
    secret: string;
    location: string;
    websiteUrl: string;
    httpPort: number;
    httpsPort: number;
  }
}
