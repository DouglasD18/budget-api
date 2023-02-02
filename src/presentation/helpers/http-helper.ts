import { HttpResponse } from "../protocols/http";
import { ServerError } from '../errors/server-error';

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const ok = (result: any): HttpResponse => {
  return {
    statusCode: 200,
    body: result
  }
}

export const created = (result: any): HttpResponse => {
  return {
    statusCode: 201,
    body: result
  }
}
