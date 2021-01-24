export default function toSnakeCase(str: string): string {
  if (!str) {
    return ''
  }
  const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  return (
    str
      .match(regex)
      ?.map((s) => s.toLowerCase())
      .join('_') || str
  )
}
