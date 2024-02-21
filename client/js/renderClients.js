import { changeSvg, removeSvg, loadSvg, redirectIcon } from './svg.js'
import { formatDate, formatTime } from './utils.js'
import { editClient } from './editClient.js'
import { confirmModal } from './deleteModalConfirm.js'
import { getClients } from './dataApi.js'
import { renderContactItem } from './renderContactItem.js'

export const renderClients = async () => {
  const clientsApiData = await getClients()
  const tableBody = document.getElementById('tableBody')
  tableBody.innerHTML = ''

  let copyArray = [...clientsApiData]

  copyArray.forEach((client) => {
    const tbody = document.getElementById('tableBody')

    const clientPageIcon = document.createElement('span')
    clientPageIcon.innerHTML = redirectIcon
    clientPageIcon.classList.add('client__page-icon')
    tippy(clientPageIcon, {
      content: `Страница клиента ${client.name}`,
      placement: 'top',
    })
    let clientWrapper = document.createElement('tr')
    clientWrapper.classList.add('itemRow')
    let clientId = document.createElement('td')
    clientId.setAttribute('scope', 'row')
    clientId.classList.add('clientId')
    clientId.textContent = client.id.substr(0, 6)
    let clientFio = document.createElement('td')
    clientFio.classList.add('clientFio')
    let clientName = document.createElement('td')
    clientName.textContent = client.name
    clientFio.textContent = `${
      client.name + ' ' + client.lastName + ' ' + client.surname
    }`
    let createdAt = document.createElement('td')
    createdAt.classList.add('clientCreatedAt')
    createdAt.innerHTML = `${
      formatDate(client.createdAt) +
      ' ' +
      `<span class="clientCreatedAtTime">${formatTime(client.createdAt)}</span>`
    }`
    let updatedAt = document.createElement('td')
    updatedAt.classList.add('clientUpdatedAt')
    updatedAt.innerHTML = `${
      formatDate(client.updatedAt) +
      ' ' +
      `<span class="clientUpdatedAtTime">${formatTime(client.updatedAt)}</span>`
    }`
    let contact = document.createElement('td')
    contact.id = 'contactIcons'
    contact.classList.add('client__contact')

    let changeBtn = document.createElement('td')
    changeBtn.classList.add('changeBtn')
    changeBtn.innerHTML = `${changeSvg + ' '}Изменить`
    let removeBtn = document.createElement('td')
    removeBtn.classList.add('removeBtn')
    removeBtn.id = 'removeBtn'
    removeBtn.innerHTML = `${removeSvg + ' '}Удалить`

    removeBtn.addEventListener('click', async () => {
      confirmModal(client.id)
    })

    changeBtn.addEventListener('click', async () => {
      changeBtn.innerHTML = `<span class="load-svg">${loadSvg}</span>Изменить`
      setTimeout(() => {
        if (client) {
          editClient(client)
          changeBtn.innerHTML = `${changeSvg + ' '}Изменить`
        }
      }, 300)
    })

    renderContactItem(client.contacts, contact)

    clientWrapper.append(
      clientId,
      clientFio,
      createdAt,
      updatedAt,
      contact,
      changeBtn,
      removeBtn
    )

    clientFio.append(clientPageIcon)

    clientPageIcon.addEventListener('click', () => {
      const clientUrl = `client.html?id=${client.id}`
      window.open(clientUrl, '_blank')
    })

    tbody.append(clientWrapper)
  })
}
