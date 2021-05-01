/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import store from './store';
import { Notify } from 'quasar';

export async function getConfig() {
  try {
    const response = await store.axios.get('/admin/setup');
    store.serverConfig = Object.assign({}, store.serverConfig, response.data);
    return response.data;
  } catch (e) {
    Notify.create({message: `Configuration load from server failed: ${e}`, type: 'negative'})
  }
}


export async function setConfig(newConfig: Record<string,any>) {
  delete newConfig.isConfigured;
  
  try {
    const response = await store.axios.post('/admin/setup', newConfig);
    if (response.data.result) {
      Notify.create({message: 'Configuration saved!', type: 'positive'});
      await getConfig();
    } else {
      Notify.create({message: `Configuration save failed - ${response.data.message}`, type: 'negative'});
    }
  } catch (e) {
    Notify.create({message: `Configuration save failed - ${e}`, type: 'negative'});
  }
}