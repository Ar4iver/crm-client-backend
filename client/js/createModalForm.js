import { addContacts } from './svg.js'

export const createModalForm = () => {
  const form = document.createElement('form')
  form.id = 'addClientForm'
  form.setAttribute('type', 'submit')

  form.classList.add('modal-content')

  form.innerHTML = `
        <div id="modalFormHeader" class="modal-header">
            <h1 class="modal-title fs-5" id="modalTitle">Новый клиент</h1>
            <button id="modalClose" type="button" class="btn-close"></button>
        </div>
        <div id="modalFormBody" class="modal-body">
            <div class="modal__fields">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control lastnameInput" id="floatingInput" placeholder="Фамилия">
                    <label for="floatingInput">Фамилия<span class="require-span">*</span></label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control firstnameInput" id="floatingInput" placeholder="Имя">
                    <label for="floatingInput">Имя<span class="require-span">*</span></label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control surnameInput" id="floatingInput" placeholder="Отчество">
                    <label for="floatingInput">Отчество</label>
                </div>
            </div>
            <div id="modalContacts" class="modal__contacts">
                <div id="contactsList" class="contacts__list"></div>
                <div id="wrapperContactBtn" class="wrapper__contact-btn">
                    <span></span>
                    <button id="contactAddBtn" type="button" class="contacts__add">
                        <span class="contacts__add-svg">${addContacts}</span>
                        Добавить контакт
                    </button>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div id="errorMessageWrapper" class="errors-message"></div>
            <button type="submit" id="submitButton" class="btn btn-primary btn__save">Сохранить</button>
            <button id="cancellBtn" type="button" class="modal__btn-cancell">Отмена</button>
        </div>
  `

  const modalFormHeader = document.getElementById('modalFormHeader')
  const wrapperContactBtn = document.getElementById('wrapperContactBtn')
  const titleModal = document.getElementById('modalTitle')
  const modalFormBody = document.getElementById('modalFormBody')
  const closeBtn = document.getElementById('modalClose')
  const lastnameInput = document.querySelector('lastnameInput')
  const firstnameInput = document.querySelector('firstnameInput')
  const surnameInput = document.querySelector('surnameInput')
  const modalContacts = document.getElementById('modalContacts')
  const contactAddBtn = document.getElementById('contactAddBtn')
  const contactsList = document.getElementById('contactsList')
  const errorMessage = document.getElementById('errorMessageWrapper')
  const submitButton = document.getElementById('submitButton')
  const cancellBtn = document.getElementById('cancellBtn')

  return {
    form,
    modalFormHeader,
    titleModal,
    modalFormBody,
    closeBtn,
    lastnameInput,
    firstnameInput,
    modalContacts,
    surnameInput,
    contactAddBtn,
    contactsList,
    errorMessage,
    cancellBtn,
    submitButton,
    wrapperContactBtn,
  }
}
