export function tryLocalStorage(callback: () => void) {
  try {
    if (localStorage) {
      callback()
    }
  }
  catch {
    console.error('localStorage is not defined')
  }
}
