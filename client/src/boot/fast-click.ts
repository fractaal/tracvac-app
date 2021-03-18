import FastClick from 'fastclick'
import { boot } from 'quasar/wrappers'

export default boot(() => {
  window.addEventListener('load', () => {
    (FastClick as unknown as FastClickStatic).attach(document.body)
    console.log('fastclick attached!')
  }, false)
})
