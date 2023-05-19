
let sessionName = null;

export function cookieSet(CookieName) {
  sessionName = CookieName
  return sessionName;
}

export function cookieGet(){
  return sessionName;
}