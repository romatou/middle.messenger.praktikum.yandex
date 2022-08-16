import queryStringify from '../utils/queryStringify'

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
  method: string
  headers?: Record<string, string>
  data?: Record<string, string>
  timeout?: number
}

export default class HTTPTransport {
  public get = async (url: string, options: Options) => {
    return await this.request(url, { ...options, method: Methods.GET })
  }

  public post = async (url: string, options: Options) => {
    return await this.request(url, { ...options, method: Methods.POST })
  }

  public put = async (url: string, options: Options) => {
    return await this.request(url, { ...options, method: Methods.PUT })
  }

  public delete = async (url: string, options: Options) => {
    return await this.request(url, { ...options, method: Methods.DELETE })
  }

  private readonly request = async (url: string, options: Options) => {
    const { headers = {}, timeout = 5000, method, data } = options

    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, data != null ? `${url}${queryStringify(data)}` : url)

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = () => resolve(xhr)

      xhr.onabort = reject

      xhr.onerror = () => {
        return reject
      }

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (data != null) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}
