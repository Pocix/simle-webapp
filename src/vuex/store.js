/*虽然在 main.js 中已经引入了 Vue 和 Vuex，但是这里还得再引入一次*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用初始状态
const state = {
    fixingTypeData: {fixingTypeNo:"", name: "", nameEn: "", systemTypeNo: ""},
    roomInfo: {roomNo:""}
}

// 定义所需的 mutations
//const mutations = {
//   newUserName (state,msg) {
//    state.username = msg;
//   }
//}

// 创建 store 实例
export default new Vuex.Store({
    state
})
