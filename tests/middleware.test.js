const axios = require('axios')
const cut = require('../utils/middleware')
const MockExpressResponse = require('mock-express-response')
const MockExpressRequest = require('mock-express-request')

const response = new MockExpressResponse()
const response2 = new MockExpressResponse()
const response3 = new MockExpressResponse()
const response4 = new MockExpressResponse()

const request = new MockExpressRequest({
  method: 'GET',
  url: '/test/something',
  headers: {
    'Authorization': 'Bearer token_token'
  }
})

const request2 = new MockExpressRequest({
  method: 'GET',
  url: '/test/something',
  headers: {
    'Authorization': 'nothing'
  }
})

const next = jest.fn()

jest.mock('axios')

const mockResponseOk = {
  data: {
    active: true
  }
}

const mockResponseNok = {
  data: {
    active: false
  }
}

const mockResponseError = {
  error: 'error'
}

test('Should call next in positive case when auth goes ok', async () => {
  const mock = axios.post.mockImplementation(() => mockResponseOk)
  await cut.auth(request, response, next)
  expect(next).toHaveBeenCalledTimes(1)
  mock.mockReset()
  next.mockReset()
})

test('Should have response status 401 in negative case when auth goes nok', async () => {
  const mockNok = axios.post.mockImplementation(() => mockResponseNok)
  await cut.auth(request, response2, next)
  expect(next).toHaveBeenCalledTimes(0)
  expect(response2.statusCode).toBe(401)
  mockNok.mockReset()
  next.mockReset()
})

test('Should have response status 500 in negative case when auth server does not respond correctly', async () => {
  const mockNok = axios.post.mockImplementation(() => mockResponseError)
  await cut.auth(request, response3, next)
  expect(next).toHaveBeenCalledTimes(0)
  expect(response3.statusCode).toBe(500)
  mockNok.mockReset()
  next.mockReset()
})

test('Should have response status 401 in negative case when Authorization does not have Bearer token', async () => {
  const mockNok = axios.post.mockImplementation(() => mockResponseError)
  await cut.auth(request2, response4, next)
  expect(next).toHaveBeenCalledTimes(0)
  expect(response4.statusCode).toBe(401)
  mockNok.mockReset()
  next.mockReset()
})