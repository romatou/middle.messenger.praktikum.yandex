import queryStringify from '../utils/queryStringify'

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: string
  headers?: Record<string, string>
  data?: any
  timeout?: number
}

export default class HTTPTransport {
  public get = (url: string, options: Options) => {
    return this.request(url, {...options, method: Methods.GET})
  }

  public post = (url: string, options: Options) => {
    return this.request(url, {...options, method: Methods.POST})
  }

  public put = (url: string, options: Options) => {
    return this.request(url, {...options, method: Methods.PUT})
  }

  public delete = (url: string, options: Options) => {
    return this.request(url, {...options, method: Methods.DELETE})
  }

  private request = (url: string, options: Options) => {
    const {headers = {}, timeout = 5000, method, data} = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, data ? `${url}${queryStringify(data)}` : url)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = () => resolve(xhr)

      xhr.onabort = reject

      xhr.onerror = () => {
        return reject
      }

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (!!data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}
