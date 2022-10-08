import BASE_URL from '../consts/BASE_URL'
import queryStringify from '../utils/queryStringify'

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  headers?: Record<string, string>
  data?: any
  method?: Methods
  timeout?: number
}

class HTTPTransport {
  private _baseURL = BASE_URL
  public _defaultHeader = { 'content-type': 'application/json' }

  public get<Response>(url: string, options?: Options): Promise<Response> {
    return this.request(
      options?.data
        ? `${this._baseURL}${url}?${queryStringify(options.data)}`
        : `${this._baseURL}${url}`,
      {
        ...options,
        method: Methods.GET,
      }
    )
  }

  public post<Response>(url: string, options?: Options): Promise<Response> {
    return this.request(`${this._baseURL}${url}`, {
      ...options,
      method: Methods.POST,
    })
  }

  public put<Response>(url: string, options?: Options): Promise<Response> {
    return this.request(`${this._baseURL}${url}`, {
      ...options,
      method: Methods.PUT,
    })
  }

  public delete<Response>(url: string, options?: Options): Promise<Response> {
    return this.request(`${this._baseURL}${url}`, {
      ...options,
      method: Methods.DELETE,
    })
  }

  private request<Response>(url: string, options: Options): Promise<Response> {
    const {
      headers = this._defaultHeader,
      timeout = 5000,
      method,
      data = {},
    } = options

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('Не указан метод')
        return
      }

      const xhr: any = new XMLHttpRequest()
      xhr.open(method, url)

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = function() {
        resolve(xhr)
      }

      xhr.withCredentials = true

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (!data) {
        xhr.send()
      } else if (headers && headers['content-type'] === 'application/json') {
        xhr.send(JSON.stringify(data))
      } else {
        xhr.send(data)
      }
    })
  }
}

export default HTTPTransport
