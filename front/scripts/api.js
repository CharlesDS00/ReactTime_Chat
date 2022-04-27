const base = 'http://127.0.0.1:5000'

/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<Record<string, any>>}
 */
export async function fetchAPI(url, options = {}) {
  const res = await fetch(`${base}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  const data = await res.json()
  return data
}
