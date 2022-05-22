import { SET_PAGE} from '../constants' // eslint-disable-line

export function setPageNumber (currentPage) {
    const payload = {
      value: currentPage,
      name: 'page'

    }
    return {
      type: SET_PAGE,
      payload
    }
  }
}
