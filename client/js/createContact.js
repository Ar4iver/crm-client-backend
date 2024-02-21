import { contactDel } from './svg.js'

export const createContact = () => {
  const modalContacts = document.getElementById('modalContacts')
  modalContacts.classList.add('modal__contacts--active')
  const contactsList = document.getElementById('contactsList')
  const wrapperContactBtn = document.getElementById('wrapperContactBtn')
  const contactAddBtn = document.getElementById('contactAddBtn')
  const contact = document.createElement('div')
  contact.id = 'contact'
  contact.classList.add('wrapper__contact-add')
  const contactInput = document.createElement('input')
  contactInput.classList.add('input__contact')
  contactInput.id = 'contactInput'

  const contactBtnDel = document.createElement('button')
  contactBtnDel.classList.add('contact__btn-delete')
  contactBtnDel.innerHTML = `<span class="contactDel__svg">${contactDel}</span>`

  const listOptions = ['Телефон', 'Доп. телефон', 'Email', 'VK', 'FaceBook']
  const listSelects = []

  const select = document.createElement('select')
  select.id = 'select'
  select.classList.add('select__create-contacts')
  listSelects.push(select)
  contactsList.append(select)

  contactInput.addEventListener('input', () => {
    switch (select.value) {
      case 'Телефон' || 'Доп. телефон':
        const defaultMaskPhone = Inputmask({ mask: '+7 (999) 999-99-99' })
        defaultMaskPhone.mask(contactInput)
        break
      case 'Email':
        const defaultMaskEmail = Inputmask({ alias: 'email' })
        defaultMaskEmail.mask(contactInput)
        break
      case 'VK':
        const defaultMaskVk = Inputmask({ alias: 'email' })
        defaultMaskVk.mask(contactInput)
        break
      case 'FaceBook':
        const defaultMaskFaceBook = Inputmask({ alias: 'email' })
        defaultMaskFaceBook.mask(contactInput)
        break
      default:
        break
    }
  })

  listOptions.forEach((element, key) => {
    const option = document.createElement('option')
    option.value = listOptions[key]
    option.text = listOptions[key]
    select.add(option)
  })

  contactAddBtn.addEventListener('click', () => {
    if (contactsList.childNodes.length > 9) {
      contactAddBtn.style.display = 'none'
    }
  })

  contactBtnDel.addEventListener('click', () => {
    contact.remove()

    if (contactsList.childNodes.length <= 9) {
      contactAddBtn.style.display = 'flex'
    }

    if (contactsList.childNodes.length === 0) {
      modalContacts.classList.remove('modal__contacts--active')
    }
  })

  contact.append(select, contactInput, contactBtnDel)

  select.addEventListener('change', (event) => {
    contactInput.value = ''

    const selectedOption = event.target.value
    let inputMaskOption = {}

    switch (selectedOption) {
      case 'Телефон':
      case 'Доп. телефон':
        inputMaskOption = { mask: '+7 (999) 999-99-99' }
        break
      case 'Email':
        inputMaskOption = { alias: 'email' }
        break
      case 'VK':
        inputMaskOption = { alias: 'url' }
        break
      case 'FaceBook':
        inputMaskOption = { alias: 'url' }
        break
      default:
        inputMaskOption = {}
    }

    Inputmask(inputMaskOption).mask(contactInput)
  })

  contactsList.append(contact)

  return {
    contactsList,
    contact,
    select,
    contactInput,
  }
}
