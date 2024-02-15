export function useSearch () {
  const basicSearch = ({ array, searchChange } : {array: Array<object>, searchChange: string}) => {
    return array.filter((row) =>
      Object.values(row).some(
        (value) => value && typeof value === 'string' && value.toLocaleLowerCase().includes(searchChange.toLocaleLowerCase())
      )
    )
  }
  return { basicSearch }
}
