export interface HttpResquest {
  body: any,
  params?: string
}

export interface HttpResponse {
  statusCode: number,
  body: any
}