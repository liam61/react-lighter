interface IReqOptions {
  uri?: string
  query?: object | null
  data?: Record<string, any>
}

type resType = 'success' | 'fail' | 'info'

interface IResponse {
  status: number
  data: {
    type: resType
    message: string
    [key: string]: any
  }
}

export { IReqOptions, resType, IResponse }
