import { SET_PAGE} from '../constants' // eslint-disable-line

export function setPageNumber (currentPage) {
  return dispatch => {
    const payload = {
      value: currentPage,
      name: 'page'

    }
    dispatch({
      type: SET_PAGE,
      payload
    })
  }
}
