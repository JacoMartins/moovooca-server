export function format_datetime(data) {
  const today_date = new Date(data)
  const date = `${today_date.getHours() < 10 ? "0" + today_date.getHours() : today_date.getHours()}:${today_date.getMinutes() < 10? "0" + today_date.getMinutes() : today_date.getMinutes()}`

  return date
}