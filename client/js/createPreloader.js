import { preloader } from './svg.js'

export const createPreloader = () => {
  const preloaderElem = document.createElement('div')
  const preloaderCircle = document.createElement('span')
  preloaderCircle.classList.add('preloader__spinner')

  preloaderElem.classList.add('preloader')
  preloaderCircle.id = 'preloader'

  preloaderCircle.innerHTML = preloader

  preloaderElem.append(preloaderCircle)

  return preloaderElem
}
