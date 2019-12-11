interface IReqOptions {
  uri?: string
  query?: object | null
  data?: { [key: string]: any }
}

interface IResponse {
  status: number
  statusText: string
  data: { message: string; [key: string]: any }
}

export { IReqOptions, IResponse }
