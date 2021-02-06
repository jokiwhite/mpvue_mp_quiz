import {RECEIVE_LIST} from './mytation-type'
export default {
  getList({commit}){
    commit(RECEIVE_LIST, "")
  }
}
