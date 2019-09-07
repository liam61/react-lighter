interface IReqOptions {
  uri?: string
  query?: object | null
  data?: { [key: string]: any }
}

type resType = 'success' | 'fail' | 'info'

interface IResponse {
  status: number
  statusText: string
  data: { type: resType; message: string; [key: string]: any }
}

export { IReqOptions, resType, IResponse }
