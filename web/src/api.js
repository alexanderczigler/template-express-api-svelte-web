import { API_URL } from './api_url.js'

/*
 * Fetch helpers
 */

const call = async ({ uri, options }) => {
  const url = `${API_URL}${uri}`
  const response = await window.fetch(url, options)

  if (response.ok) {
    return response.json()
  }

  console.error(response.status, response.statusText)
  throw new Error(response.statusText)
}

const get = async (uri) => {
  return await call({
    uri,
  })
}

const del = async (uri) => {
  return await call({
    uri,
    options: { method: 'DELETE' }
  })
}

const manipulate = async (uri, data, verb) => {
  return await call({
    uri,
    options: {
      body: JSON.stringify(data),
      method: verb,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  })
}

const post = async (uri, data) => {
  return await manipulate(uri, data, 'POST')
}

/*
 * API collection
 */
export const API = {
  Cats: {
    Add: async cat => {
      return await post('/cat', cat)
    },
    Delete: async id => {
      return await del(`/cat/${id}`)
    },
    List: async () => {
      return await get('/cat')
    },
  },
}
