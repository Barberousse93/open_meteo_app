export function dateFormat(props) {
  const date = new Date(props)
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }
  const dateFormat = date.toLocaleDateString('fr-FR', options)

  return dateFormat
}

export function timeFormat(props) {
  const date = new Date(props)
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }
  const timeFormat = date.toLocaleTimeString('fr-FR', options)

  return timeFormat
}

export function dateIsYesterday(PropsDate) {
  const dateAVerifier = new Date(PropsDate)
  let today = new Date()
  let yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (
    dateAVerifier.getDate() === yesterday.getDate() &&
    dateAVerifier.getMonth() === yesterday.getMonth() &&
    dateAVerifier.getFullYear() === yesterday.getFullYear()
  ) {
    return true
  } else {
    return false
  }
}

export function dateIsToday(PropsDate) {
  const dateAVerifier = new Date(PropsDate)
  let today = new Date()

  if (
    dateAVerifier.getDate() === today.getDate() &&
    dateAVerifier.getMonth() === today.getMonth() &&
    dateAVerifier.getFullYear() === today.getFullYear()
  ) {
    return true
  } else {
    return false
  }
}

export function convertDay(PropsDate) {
  const weekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const dateAConvertir = new Date(PropsDate)
  const dayOfWeek = dateAConvertir.getDay()

  return weekDays[dayOfWeek]
}
