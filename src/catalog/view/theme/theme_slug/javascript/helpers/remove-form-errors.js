const removeFormErrors = (selector) => {
  $(selector).find('.form-field__error').remove();
}

module.exports = {
  removeFormErrors,
}
