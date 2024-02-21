export const sortTable = () => {
  const table = document.querySelector('.table')
  const headersTable = table.querySelectorAll('th')
  const tbody = table.querySelector('.table__body')

  const directions = Array.from(headersTable).map(() => '')

  const transformation = (type, content) => {
    switch (type) {
      case 'id':
        return parseFloat(content.textContent)
      case 'createdAt':
      case 'updatedAt':
        return content.textContent
      case 'text':
      default:
        return content.textContent
    }
  }

  const sortColumn = (index) => {
    const type = headersTable[index].getAttribute('data-type')
    const rows = tbody.querySelectorAll('tr')
    const direction = directions[index] || 'sortUp'
    const changeDir = direction === 'sortUp' ? 1 : -1
    const newRows = Array.from(rows)

    newRows.sort((row1, row2) => {
      const collA = row1.querySelectorAll('td')[index]
      const collB = row2.querySelectorAll('td')[index]

      const a = transformation(type, collA)
      const b = transformation(type, collB)

      switch (true) {
        case a < b:
          return 1 * changeDir
        case a > b:
          return -1 * changeDir
        default:
          break
        case a === b:
          return 0
      }
    })

    Array.prototype.forEach.call(rows, (row) => {
      tbody.removeChild(row)
    })

    directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp'

    newRows.forEach((newRow) => {
      tbody.appendChild(newRow)
    })
  }

  Array.prototype.forEach.call(headersTable, (header, index) => {
    const type = headersTable[index].getAttribute('data-type')
    if (type != null) {
      header.addEventListener('click', () => {
        sortColumn(index)
      })
    }
  })
}
