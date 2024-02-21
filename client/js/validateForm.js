export const validateForm = () => {
  const lastnameInput = document.querySelector('.lastnameInput')
  const firstnameInput = document.querySelector('.firstnameInput')
  const surnameInput = document.querySelector('.surnameInput')
  const errorMessage = document.getElementById('errorMessageWrapper')

  errorMessage.innerHTML = ''

  const lastNameValid = lastnameInput.value.trim()
  const firstNameValid = firstnameInput.value.trim()
  const surNameValid = surnameInput.value.trim()

  switch (lastNameValid) {
    case '':
      lastnameInput.classList.add('error')
      const lastNameErrorSpan = document.createElement('span')
      lastNameErrorSpan.innerText = 'Поле фамилия не заполнено!'
      errorMessage.appendChild(lastNameErrorSpan)
      break
    default:
      lastnameInput.classList.remove('error')
      break
  }

  switch (firstNameValid) {
    case '':
      firstnameInput.classList.add('error')
      const firstNameErrorSpan = document.createElement('span')
      firstNameErrorSpan.innerText = 'Поле имя не заполнено!'
      errorMessage.appendChild(firstNameErrorSpan)
      break
    default:
      firstnameInput.classList.remove('error')
      break
  }

  switch (surNameValid) {
    case '':
      surnameInput.classList.add('error')
      const surNameErrorSpan = document.createElement('span')
      surNameErrorSpan.innerText = 'Поле отчество не заполнено!'
      errorMessage.appendChild(surNameErrorSpan)
      break
    default:
      surnameInput.classList.remove('error')
      break
  }

  return lastNameValid && firstNameValid && surNameValid
}
