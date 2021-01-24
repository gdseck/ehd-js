export default function transformSymbols(
  options: AnyObject & { symbols?: string | string[] }
) {
  if (options.symbols || Array.isArray(options.symbols)) {
    options.symbols = (options.symbols as string[]).join(',')
  }

  if (options.s || Array.isArray(options.s)) {
    options.s = (options.s as string[]).join(',')
  }

  return options
}
