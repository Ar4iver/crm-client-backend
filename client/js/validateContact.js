export const validateContactFields = () => {
  const contactInputs = document.querySelectorAll('.input__contact')
  const errorsBlock = document.getElementById('errorMessageWrapper')
  errorsBlock.style.color = 'red'
  const invalidFields = []

  contactInputs.forEach((input) => {
    switch (input.value.trim()) {
      case '':
        invalidFields.push(input.parentElement.querySelector('select').value)
        input.classList.add('input__contact--invalid')
        break
      default:
        break
    }
  })

  if (invalidFields.length > 0) {
    const errorMessage = `Не заполнены поля для контактов: ${invalidFields.join(
      ', '
    )}`
    errorsBlock.append(errorMessage)
    return false
  }

  return true
}
