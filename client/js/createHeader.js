import { removeElements, searchClients } from './dropDownSearch.js'

export const createHeader = async () => {
  const header = document.createElement('header')
  const searchForm = document.getElementById('searchForm')
  header.classList.add('header')
  header.innerHTML = `<div class="header__wrapper">
    
    <nav class="container navbar navbar-expand-lg bg-light header__nav">

        <div class="d-flex">

            <img class="header__logo" src="../img/logo.svg" alt="logo">

            <div class="collapse navbar-collapse searchForm" id="navbarScroll">

                <form autocomplete="off" id="searchForm" class="d-flex flex-column header__form" role="search">

                    <div>

                      <input id="searchInput" class="form-control me-2 header__input" type="search" placeholder="Найти в таблице...">

                    </div>
                    
                      <ul id="list" class="list"></ul>

                </form>

            </div>

        </div>
        
    </nav>

</div>
`

  document.body.append(header)

  const input = document.getElementById('searchInput')
  const form = document.getElementById('searchForm')
  const list = document.getElementById('list')

  const debounceSearch = () => {
    let timeoutId
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (input.value === '') {
          removeElements()
        } else {
          searchClients()
        }
      }, 300)
      removeElements()
    }
  }

  input.addEventListener('input', debounceSearch())

  return {
    header,
    searchForm,
    form,
    input,
    list,
  }
}
