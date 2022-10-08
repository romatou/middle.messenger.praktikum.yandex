import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon'
import HTTPTransport from './HTTPTransport'
import { expect } from 'chai'

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic
  let instance: HTTPTransport
  const requests: SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest()

    instance = new HTTPTransport()

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }
  })

  afterEach(() => {
    requests.length = 0
  })

  it('Проверяем метод get()', () => {
    instance
      .get(`https://ya-praktikum.tech/api/v2/user/419`)
      .then(response => expect(response).to.have.property('id').and.equal(419))
  })

  it('Проверяем метод post()', () => {
    instance
      .post(`https://ya-praktikum.tech/api/v2/user/search`, {
        headers: { 'content-type': 'application/json' },
        data: { id: 419 },
      })
      .then(response => expect(response).to.have.property('id').and.equal(419))
  })
})
