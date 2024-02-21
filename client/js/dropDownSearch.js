import { getClients } from './dataApi.js'

const clients = await getClients()

export const removeElements = () => {
  const list = document.getElementById('list')
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }
}

export const searchClients = async () => {
  const input = document.getElementById('searchInput')
  const MAX_RESULTS = 5

  let copyArray = [...clients]
  const clientNames = copyArray.map(
    (client) => `${client.name} ${client.lastName} ${client.surname}`
  )

  removeElements()

  const filteredClients = clientNames.filter((client) =>
    client.toLowerCase().includes(input.value.toLowerCase())
  )

  filteredClients.slice(0, MAX_RESULTS).forEach((client) => {
    let listItem = document.createElement('li')
    listItem.classList.add('list-items')
    listItem.style.cursor = 'pointer'
    listItem.textContent = client
    listItem.addEventListener('click', () => {
      input.value = client
      removeElements()
      scrollTableToClient(client)
    })
    document.getElementById('list').append(listItem)
  })

  if (filteredClients.length > MAX_RESULTS) {
    let showMoreButton = document.createElement('button')
    showMoreButton.textContent = 'Показать еще'
    showMoreButton.classList.add('showMoreButton')
    showMoreButton.addEventListener('click', () => {
      filteredClients.slice(MAX_RESULTS).forEach((client) => {
        let listItem = document.createElement('li')
        listItem.classList.add('list-items')
        listItem.style.cursor = 'pointer'
        listItem.textContent = client
        listItem.addEventListener('click', () => {
          input.value = client
          removeElements()
          scrollTableToClient(client)
        })
        document.getElementById('list').append(listItem)
      })
      showMoreButton.remove()
    })
    document.getElementById('list').append(showMoreButton)
  }

  const scrollTableToClient = (clientName) => {
    const tableRows = document.querySelectorAll('.table tbody tr')
    tableRows.forEach((tableRow) => {
      if (
        tableRow.querySelector(':nth-child(2)').textContent.trim() ===
        clientName
      ) {
        tableRow.classList.add('highlighted')
        tableRow.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
          tableRow.classList.remove('highlighted')
        }, 3000)
        return
      }
    })
  }

  let selectedIndex = -1
  document.addEventListener('keydown', (event) => {
    const listItems = document.querySelectorAll('.list-items')
    switch (event.key) {
      case 'ArrowDown':
        selectedIndex++
        if (selectedIndex > listItems.length - 1) {
          selectedIndex = 0
        }
        break
      case 'ArrowUp':
        selectedIndex--
        if (selectedIndex < 0) {
          selectedIndex = listItems.length - 1
        }
        break
      case 'Enter':
        if (selectedIndex >= 0 && selectedIndex < listItems.length) {
          input.value = listItems[selectedIndex].textContent
          removeElements()
          event.preventDefault()
          scrollTableToClient(listItems[selectedIndex].textContent)
        }
        break
      default:
        return
    }
    listItems.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add('selected')
      } else {
        item.classList.remove('selected')
      }
    })
  })
}
