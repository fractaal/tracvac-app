import path from 'path'

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/prefer-regexp-exec */

// src/utils/external-component.js
export default function plugin (url: string) {
  return new Promise((resolve, reject) => {
    const name = url// .split('/').reverse()[0].match(/^(.*?)\.umd/)[1]
    const script = document.createElement('script')
    script.async = true
    script.addEventListener('load', () => {
      // @ts-ignore
      resolve({ [path.basename(url)]: window[path.basename(url)], init: window.init })
    })
    script.addEventListener('error', () => {
      reject(new Error(`Error loading ${url}`))
    })
    script.src = url
    document.head.appendChild(script)
  })
}
