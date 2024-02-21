import { svgEmail, svgFB, svgPhone, svgVK, svgOther } from './svg.js'

export const renderContactItem = (array, item) => {
  const copyArray = [...array]
  const MAX_ICONS = 4
  const numHiddenIcons = copyArray.length - MAX_ICONS

  copyArray.forEach((contact, index) => {
    const contactLink = document.createElement('a')
    contactLink.id = 'contactLink'
    contactLink.classList.add('contact__svgIcon')

    const selectValue = contact.type

    switch (selectValue) {
      case 'Email':
        contactLink.innerHTML = svgEmail
        tippy(contactLink, {
          content: `${contact.type}: ${contact.value}`,
          placement: 'top',
        })
        break
      case 'FaceBook':
        contactLink.innerHTML = svgFB
        tippy(contactLink, {
          content: `${contact.type}: ${contact.value}`,
          placement: 'top',
        })
        break
      case 'Телефон':
      case 'Доп. телефон':
        contactLink.innerHTML = svgPhone
        tippy(contactLink, {
          content: `${contact.type}: ${contact.value}`,
          placement: 'top',
        })
        break
      case 'VK':
        contactLink.innerHTML = svgVK
        tippy(contactLink, {
          content: `${contact.type}: ${contact.value}`,
          placement: 'top',
        })
        break
      default:
        contactLink.innerHTML = svgOther
        tippy(contactLink, {
          content: `${contact.type}: ${contact.value}`,
          placement: 'top',
        })
        break
    }

    item.appendChild(contactLink)

    if (index >= MAX_ICONS) {
      contactLink.style.display = 'none'
    }

    if (index === MAX_ICONS - 1 && numHiddenIcons > 0) {
      const more = document.createElement('a')
      more.id = 'moreBtn'
      more.classList.add('contact__count-wrapper')
      more.innerHTML = `<span class="span__count">+${numHiddenIcons}</span>`
      item.appendChild(more)

      more.addEventListener('click', () => {
        const allIcons = item.querySelectorAll('.contact__svgIcon')
        allIcons.forEach((icon) => {
          icon.style.display = 'block'
        })

        more.remove()
      })
    }
  })

  return item.innerHTML
}
