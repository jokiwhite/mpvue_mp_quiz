import {RECEIVE_LIST} from './mytation-type'
export default {
  [RECEIVE_LIST](state,data){
    state.openid = data
    //console.log(data)
  }
}

