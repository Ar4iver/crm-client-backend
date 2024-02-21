import { renderClients } from './renderClients.js'
import { createHeader } from './createHeader.js'
import { createSectionClients } from './createSectionClients.js'
import { sortTable } from './sortTable.js'
import { getClients } from './dataApi.js'
import { createPreloader } from './createPreloader.js'

const App = async () => {
  createHeader()
  renderClients()
  createSectionClients()

  const table = document.getElementById('table')
  const tbody = document.getElementById('tableBody')
  const preloader = createPreloader()

  tbody.style.display = 'none'
  table.append(preloader)

  try {
    const clients = await getClients()
    setTimeout(() => {
      preloader.remove()
      tbody.style.display = 'table-row-group'
    }, 2000)
  } catch (error) {
    console.log(error)
  }
}

App()
document.addEventListener('DOMContentLoaded', sortTable())
