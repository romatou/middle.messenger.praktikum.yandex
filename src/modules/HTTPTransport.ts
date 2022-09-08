import BASE_URL from '../consts/BASE_URL'
import queryStringify from '../utils/queryStringify'

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  headers?: Record<unknown, string>
  method: Methods
  data?: Record<string, string>
  timeout?: number
}

class HTTPTransport {
  private _baseURL = BASE_URL

  public get = async (url: string, options?: Options) => {
    return await this.request(`${this._baseURL}${url}`, {
      ...options,
      method: Methods.GET,
    })
  }

  public post = async (url: string, options?: Options) => {
    return await this.request(`${this._baseURL}${url}`, {
      ...options,
      method: Methods.POST,
    })
  }

  public put = async (url: string, options?: Options) => {
    return await this.request(`${this._baseURL}${url}`, {
      ...options,
      method: Methods.PUT,
    })
  }

  public delete = async (url: string, options?: Options) => {
    return await this.request(`${this._baseURL}${url}`, {
      ...options,
      method: Methods.DELETE,
    })
  }

  private readonly request = async (url: string, options: Options) => {
    const { headers = {}, timeout = 5000, method, data = {} } = options

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('Не указан метод')
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === Methods.GET

      xhr.open(method, isGet && !!data ? `${url}?${queryStringify(data)}` : url)

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.withCredentials = true

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}

export default new HTTPTransport()
