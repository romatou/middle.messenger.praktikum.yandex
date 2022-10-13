import { FormModel } from '../types/FormModel'

export const formatFormData = (data: FormData) => {
  const queryData: FormModel = {}

  data.forEach((value: FormDataEntryValue, key: string): void => {
    queryData[key] = value as string
  })

  return queryData
}
