export const logAjaxError = (xhr, ajaxOptions, thrownError) => {
  console.error(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText)
}
