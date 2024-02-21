import { arrowUp, arrowDown, addClientSvg, preloader } from './svg.js'
import { addClient } from './addClient.js'
import { createPreloader } from './createPreloader.js'
import { getClients } from './dataApi.js'

export const createSectionClients = async () => {
  const main = document.createElement('main')
  const sectionClients = document.createElement('section')
  sectionClients.classList.add('container', 'section__clients')

  sectionClients.innerHTML = `
  <h2 class="section__title">
        Клиенты
  </h2>
        <table id="table" class="table">
            <thead>
                    <tr>
                        <th id="id" data-type="id" class="title__col-table title-ColId sort-up" scope="col">ID<span>${arrowUp}</span></th>
                        <th id="sortName" data-type="text" class="title__col-table sort-up" scope="col">Фамилия Имя Отчество<span>${arrowDown}</span></th>
                        <th id="sortCreate" data-type="createdAt" class="title__col-table sort-up" scope="col">Дата и время<br>создания<span>${arrowDown}</span></th>
                        <th id="sortEdit" data-type="updatedAt" class="title__col-table sort-up" scope="col">Последние<br>изменения<span>${arrowDown}</span></th>
                        <th class="title__col-table" scope="col">Контакты</th>
                        <th class="title__col-table" scope="col">Действия</th>
                    </tr>
            </thead>
            <tbody id="tableBody" class="table__body"></tbody>
        </table>

        <div id="wrapperBtn" class="wrapperButton">
          <button id="addClient" type="button" class="btn btn-outline-success">
            <span class="client-add__svg">${addClientSvg}</span>
            Добавить клиента
          </button>
        </div>
`

  main.append(sectionClients)

  document.body.append(main)

  const addClientBtn = document.getElementById('addClient')

  const sortId = document.getElementById('id')
  const sortName = document.getElementById('sortName')
  const sortCreate = document.getElementById('sortCreate')
  const sortEdit = document.getElementById('sortEdit')
  const tbody = document.getElementById('tableBody')
  const sortItems = [sortId, sortName, sortCreate, sortEdit]
  const preloaderAdr = document.querySelector('.preloader')

  

  sortItems.forEach((item) => {
    item.addEventListener('click', () => {
      let itemId = item.id
      if (item.classList.contains('sort-down')) {
        item.classList.remove('sort-down')
        item.classList.add('sort-up')
        if (itemId === 'id' || itemId === 'sortName') {
          item.childNodes[1].innerHTML = `${arrowUp}`
        } else {
          item.childNodes[3].innerHTML = `${arrowUp}`
        }
      } else {
        item.classList.add('sort-down')
        item.classList.remove('sort-up')
        if (itemId === 'id' || itemId === 'sortName') {
          item.childNodes[1].innerHTML = `${arrowDown}`
        } else {
          item.childNodes[3].innerHTML = `${arrowDown}`
        }
      }
    })
  })

  addClientBtn.addEventListener('click', () => {
    document.body.append(addClient())
  })

  return {
    main,
    tbody,
    sectionClients,
  }
}
