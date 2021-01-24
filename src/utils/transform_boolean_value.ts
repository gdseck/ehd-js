export default function transformBooleanValue(prop: string) {
  return (options: AnyObject) => {
    if (prop in options) {
      options[prop] = options[prop] === true ? 1 : 0
    }
    return options
  }
}
