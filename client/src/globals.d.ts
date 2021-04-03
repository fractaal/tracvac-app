/* eslint-disable no-var */
declare module 'http-proxy-middleware';

interface Window {
  NavigationBar: NavigationBar,
  BackgroundFetch: any,
}

interface NavigationBar {
  isVisible: boolean;
  backgroundColorByName: (colorname: string, lightNavigationBar: boolean) => void;
  backgroundColorByHexString: (hexString: string, lightNavigationBar: boolean) => void;
  hide: () => void;
  show: () => void;
}

declare var NavigationBar: NavigationBar
