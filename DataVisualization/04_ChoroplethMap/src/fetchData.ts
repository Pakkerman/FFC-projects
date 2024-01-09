export async function fetchData(
  url: string,
  type: 'JSON' | 'CSV'
): Promise<any> {
  let response = undefined
  try {
    response = await fetch(url)
  } catch (error) {
    throw error
  }

  switch (type) {
    case 'CSV':
      return await response.text()
    case 'JSON':
      return await response.json()
  }
}
