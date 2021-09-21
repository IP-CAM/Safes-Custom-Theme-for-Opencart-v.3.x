const { debounce } = require('lodash')

let isHeaderSearchDropdownOpened = false

const fetchSearchResult = (searchQuery, handleResponse) => {
  $.ajax({
    url: 'index.php?route=common/ajax_search',
    dataType: 'json',
    data: {
      filter_name: searchQuery,
    },
    beforeSend: showSpinner,
    success: ({ result }) => {
      handleResponse(searchQuery, result)
    }
  })
}

const showSpinner = () => {
  $('.header-search .dropdown__content').html(`
    <span class="header-search-suggestions__empty-result">
      <span class="spinner">
        <span class="spinner__bounce">
      </span>
    </span>
  `)
}

const renderSearchResult = (searchQuery, result) => {
  const markup = result.total ? `
    <div class="header-search-suggestions">
      <ul class="header-search-suggestions__list">
        ${result.products.reduce((acc, product) => acc + `
          <li class="header-search-suggestions__item">
            <img
              class="header-search-suggestions__image"
              src="${product.image}"
            />
            <div class="header-search-suggestions__info">
              <a
                href="${product.url}"
                class="header-search-suggestions__link">
                ${product.name}
              </a>
            </div>
          </li>
        `, '')}
      </ul>
      <div class="header-search-suggestions__actions">
        <a
          href="/index.php?search=${searchQuery}"
          class="link"
        >
          Показать все (${result.total})
        </a>
      </div>
    </div>
  ` : `
    <span class="header-search-suggestions__empty-result">
      Ничего не найдено
    </span>
  `

  $('.header-search .dropdown__content').html(markup)
}

const openSearchDropdown = () => {
  $('.header-search__dropdown').addClass('dropdown_opened')
  isHeaderSearchDropdownOpened = true
  $(document).on('click', handleOutsideClick)
}

const closeSearchDropdown = () => {
  $('.header-search__dropdown').removeClass('dropdown_opened')
  isHeaderSearchDropdownOpened = false
  $(document).off('click', handleOutsideClick)
}

const handleHeaderSearchChange = (event) => {
  const searchValue = $(event.target).val()

  if (!searchValue.length) {
    closeSearchDropdown()
    return
  }

  if (!isHeaderSearchDropdownOpened) {
    openSearchDropdown()
  }

  fetchSearchResult(searchValue, renderSearchResult)
}

const handleHeaderSearchChangeDebounced = debounce(handleHeaderSearchChange, 500)

const handleHeaderSearchClick = (event) => {
  if (event.target.value) openSearchDropdown()
}

$('.header-search input[name="search"]').on('input', handleHeaderSearchChangeDebounced)
$(document).on('click', '.header-search input[name="search"]', handleHeaderSearchClick)

const handleOutsideClick = (event) => {
  if ($(event.target).closest('.header-search__suggestions').length > 0) return

  closeSearchDropdown()
}
