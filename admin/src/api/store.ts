import { AxiosInstance } from 'axios';

export default {
  usersToModify: [] as Record<string,any>[],
  axios: null as unknown as AxiosInstance,
  userShownInLogs: null as unknown as Record<string,any>,
  serverConfig: {
    isConfigured: false,
    secret: null,
    location: null,
    lguUrl: null,
    httpPort: null,
    httpsPort: null,
  } as unknown as {
    isConfigured: boolean;
    secret: string;
    location: string;
    lguUrl: string;
    httpPort: number;
    httpsPort: number;
  }
}
