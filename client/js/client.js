import { getClient } from './dataApi.js'
import { formatDate, formatTime } from '../js/utils.js'

const urlParams = new URLSearchParams(window.location.search)
const clientId = urlParams.get('id')

if (clientId) {
  getClient(clientId).then((client) => {
    const clientDataDiv = document.getElementById('clientData')
    clientDataDiv.innerHTML = `
        <div class="wrapper__photo-client">	
            <img class="client__photo-page" src="../img/fakeFoto.jpg" alt="foto">
        </div>        
        <p>Имя: ${client.name}</p>
        <p>Фамилия: ${client.lastName}</p>
        <p>Отчество: ${client.surname}</p>
        <p>Дата создания: ${formatDate(client.createdAt)} ${formatTime(
      client.createdAt
    )}</p>
        <p>Дата обновления: ${formatDate(client.updatedAt)} ${formatTime(
      client.updatedAt
    )}</p>
        <p>Контакты:</p>
        <ul>
            ${client.contacts
              .map((contact) => `<li>${contact.type}: ${contact.value}</li>`)
              .join('')}
        </ul>
        `
  })
}
