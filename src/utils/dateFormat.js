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
