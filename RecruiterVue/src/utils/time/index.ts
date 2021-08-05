export function when (timestamp: number) {
  const delta = (new Date().getTime() - timestamp) / 1000
  const date = new Date(timestamp)
  if (delta > 3600 * 24 * 7) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  } else if (delta > 3600 * 24 * 2) {
    return `${Math.floor(delta / (3600 * 24))} days ago`
  } else if (delta > 3600 * 24) {
    return 'yesterday'
  } else if (delta > 3600) {
    return `${Math.floor(delta / 3600)} hour${Math.floor(delta / 3600) == 1 ? '' : 's'} ago`
  } else if (delta > 60) {
    return `${Math.floor(delta / 60)} minute${Math.floor(delta / 60) == 1 ? '' : 's'} ago`
  } else if (delta > 0) {
    return `${Math.floor(delta)} second${delta == 1 ? '' : 's'} ago`
  }
}


export function date (timestamp: number) {
  const date = new Date(timestamp)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export function datetime (timestamp: number) {
  const date = new Date(timestamp)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
}

export function duration (timestamp: number) {
  const date = new Date(timestamp)
  return [
    date.getFullYear() - 1970,
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ]
}
