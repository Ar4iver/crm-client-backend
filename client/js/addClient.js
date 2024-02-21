import { createModalForm } from './createModalForm.js'
import { saveClients } from './dataApi.js'
import { createContact } from './createContact.js'
import { renderClients } from './renderClients.js'
import { validateForm } from './validateForm.js'
import { loadSvg } from './svg.js'
import { validateContactFields } from './validateContact.js'

export const addClient = () => {
  const createForm = createModalForm()
  const modal = document.createElement('div')
  const modalBody = document.createElement('div')

  modal.classList.add('my__modal')
  modalBody.classList.add('modal__body')

  modalBody.append(createForm.form)

  modal.append(modalBody)

  document.body.append(modal)
  const closeBtn = document.getElementById('modalClose')
  const cancellBtn = document.getElementById('cancellBtn')

  const lastnameInput = document.querySelector('.lastnameInput')
  const firstnameInput = document.querySelector('.firstnameInput')
  const surnameInput = document.querySelector('.surnameInput')
  const contactAddBtn = document.getElementById('contactAddBtn')
  const btnSubmit = document.getElementById('submitButton')

  closeBtn.addEventListener('click', () => {
    modal.remove()
  })

  cancellBtn.addEventListener('click', () => {
    modal.remove()
  })

  contactAddBtn.addEventListener('click', () => {
    createContact()
  })

  createForm.form.addEventListener('submit', async (e) => {
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

      let clientObj = {
        name: firstnameInput.value,
        surname: surnameInput.value,
        lastName: lastnameInput.value,
        contacts,
      }

      setTimeout(async () => {
        const data = await saveClients(clientObj)
        renderClients()
        modal.remove()
      }, 500)
    } catch (error) {
      const footer = document.querySelector('.modal-footer')
      const errorMessage = document.createElement('div')
      if (error.status !== 200) {
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
