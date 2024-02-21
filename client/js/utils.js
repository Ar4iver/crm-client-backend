export const formatDate = (data) => {
  const newDate = new Date(data)

  const correctDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }

  const resultDate = newDate.toLocaleString('ru', correctDate)

  return resultDate
}

export const formatTime = (data) => {
  const newDate = new Date(data)

  const correctDate = {
    hour: 'numeric',
    minute: 'numeric',
  }

  const resultTime = newDate.toLocaleString('ru', correctDate)

  return resultTime
}

export const debounce = (func, wait, immediate) => {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const callNow = immediate && !timeout
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
