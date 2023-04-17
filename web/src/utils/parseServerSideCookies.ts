export function parseServerSideCookies(cookies:string) {
  const cookie_array = cookies ? cookies.split(';') : []

  let cookie_obj = {}

  cookie_array.forEach(cookie => {
    const key = cookie.split('=')[0].replace(' ', '')
    const value = cookie.split('=')[1]
    
    cookie_obj[key] = value
  })

  return cookie_obj
}