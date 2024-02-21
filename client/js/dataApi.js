export const getClients = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'GET',
    })

    const result = await response.json()

    return result
  } catch (error) {
    console.log(error)
  }
}

export const getClient = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'GET',
    })

    const result = await response.json()

    return result
  } catch (error) {
    console.log(error)
  }
}

export const deleteClient = async (id) => {
  try {
    await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.log(error)
  }
}

export const saveClients = async (client) => {
  try {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      body: JSON.stringify(client),
    })

    const result = await response.json()

    return result
  } catch (error) {
    console.log(error)
  }
}

export const editDataClients = async (client, id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(client),
    })

    const result = await response.json()

    return result
  } catch (error) {
    console.log(error)
  }
}
