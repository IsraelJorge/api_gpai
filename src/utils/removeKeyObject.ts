export function removeKeyObject<T, K extends keyof T>(obj: T, key: K) {
  const newObj = { ...obj } as Partial<Pick<T, K>> & Omit<T, K>

  delete newObj[key]

  return newObj
}
