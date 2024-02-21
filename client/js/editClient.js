import { createModalForm } from './createModalForm.js'
import { createContact } from './createContact.js'
import { deleteClient, editDataClients } from './dataApi.js'
import { renderClients } from './renderClients.js'
import { validateForm } from './validateForm.js'
import { loadSvg } from './svg.js'
import { validateContactFields } from './validateContact.js'

export const editClient = (client) => {
  const createForm = createModalForm()
  const modal = document.createElement('div')
  const modalBody = document.createElement('div')

  modal.classList.add('my__modal')
  modalBody.classList.add('modal__body')

  modalBody.append(createForm.form)
  modal.append(modalBody)

  document.body.append(modal)

  const addClientForm = document.getElementById('addClientForm')
  const closeBtn = document.getElementById('modalClose')
  const titleModal = document.getElementById('modalTitle')
  titleModal.innerHTML = `Изменить данные <span class="modal__title-id">ID: ${client.id.substr(
    0,
    6
  )}</span>`

  const lastnameInput = document.querySelector('.lastnameInput')
  const firstnameInput = document.querySelector('.firstnameInput')
  const surnameInput = document.querySelector('.surnameInput')
  const deleteClientBtn = document.getElementById('cancellBtn')
  cancellBtn.textContent = 'Удалить клиента'
  const contactAddBtn = document.getElementById('contactAddBtn')
  const clientId = client.id
  const clientContacts = client.contacts
  const btnSubmit = document.getElementById('submitButton')

  lastnameInput.value = client.lastName
  firstnameInput.value = client.name
  surnameInput.value = client.surname

  clientContacts.forEach((contact) => {
    const contactAddFn = createContact()

    contactAddFn.select.value = contact.type
    contactAddFn.contactInput.value = contact.value
  })

  closeBtn.addEventListener('click', () => {
    modal.remove()
  })

  deleteClientBtn.addEventListener('click', () => {
    deleteClient(client.id)
  })

  contactAddBtn.addEventListener('click', () => {
    createContact()
  })

  addClientForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!validateForm() || !validateContactFields()) {
      return
    }

    const wrapperIconLoad = document.createElement('span')
    wrapperIconLoad.classList.add('icon__load-span')
    wrapperIconLoad.innerHTML = `${loadSvg}`
    btnSubmit.prepend(wrapperIconLoad)
    btnSubmit.classList.add('save__btn-load-after')
    btnSubmit.setAttribute('disabled', 'disabled')

    try {
      const typesName = Array.from(
        document.querySelectorAll('.select__create-contacts')
      )

      const typesValue = Array.from(
        document.querySelectorAll('.input__contact')
      )

      const contacts = typesName.map((type, index) => {
        return {
          type: type.value,
          value: typesValue[index].value,
        }
      })

      const updatedClient = {
        lastName: lastnameInput.value,
        name: firstnameInput.value,
        surname: surnameInput.value,
        contacts,
      }

      setTimeout(async () => {
        const data = await editDataClients(updatedClient, clientId)
        renderClients()
        modal.remove()
      }, 500)
    } catch (error) {
      const footer = document.querySelector('.modal-footer')
      const errorMessage = document.createElement('div')
      if (error.status && error.status !== 200) {
        errorMessage.textContent = `Ошибка: ${error.status}. ${error.message}`
      } else {
        errorMessage.classList.add('error-message__edit')
        errorMessage.textContent = 'Что-то пошло не так...'
        footer.prepend(errorMessage)
      }
    }
  })

  return modal
}
