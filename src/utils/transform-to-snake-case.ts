import toSnakeCase from '@/utils/to-snake-case'

export default function transformToSnakeCase(props: string[]) {
  return (options: AnyObject) => {
    props.forEach((prop: string) => {
      if (prop in options) {
        options[toSnakeCase(prop)] = options[prop]
        options[prop] = undefined
      }
    })
    return options
  }
}
