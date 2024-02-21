import { createModalForm } from './createModalForm.js'
import { deleteClient } from './dataApi.js'
import { renderClients } from './renderClients.js'
import { loadSvg } from './svg.js'

export const confirmModal = (id) => {
  const createForm = createModalForm()
  const modal = document.createElement('div')
  const modalBody = document.createElement('div')

  modal.classList.add('my__modal')
  modalBody.classList.add('modal__body')

  modalBody.append(createForm.form)
  modal.append(modalBody)

  document.body.append(modal)

  const addClientForm = document.getElementById('addClientForm')
  const modalFormHeader = document.getElementById('modalFormHeader')
  modalFormHeader.classList.add('modal__form-header')
  const modalFormBody = document.getElementById('modalFormBody')
  modalFormBody.classList.add('modalFormBody__confirm')
  modalFormBody.innerHTML = `<p>Вы действительно хотите удалить данного клиента?</p>`

  const closeBtn = document.getElementById('modalClose')
  const modalTitle = document.getElementById('modalTitle')
  modalTitle.classList.add('modalConfirmTitle')
  modalTitle.innerHTML = 'Удалить клиента'

  const submitButton = document.getElementById('submitButton')
  submitButton.textContent = 'Удалить'

  const cancellBtn = document.getElementById('cancellBtn')

  cancellBtn.addEventListener('click', () => {
    modal.remove()
  })

  addClientForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const wrapperIconLoad = document.createElement('span')
    wrapperIconLoad.classList.add('icon__load-span')
    wrapperIconLoad.innerHTML = `${loadSvg}`
    submitButton.prepend(wrapperIconLoad)
    submitButton.classList.add('save__btn-load-after')
    submitButton.setAttribute('disabled', 'disabled')

    try {
      setTimeout(async () => {
        await deleteClint(id)
        modal.remove()
        renderClients()
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

  closeBtn.addEventListener('click', () => {
    modal.remove()
  })
}
