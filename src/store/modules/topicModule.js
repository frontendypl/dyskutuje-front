import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            newTopicUrl: '',
            newTopicErrors: {}
        }
    },
    getters: {
    },
    mutations: {
        setNewTopicUrl(state, payload){
            state.newTopicUrl = payload
        },
        setNewTopicErrors(state,payload){
            state.newTopicErrors = {...payload}
        }
    },
    actions: {
        setNewTopicUrl({commit},payload){
            commit('setNewTopicUrl',payload)
        },
        setNewTopicErrors({commit},payload){
            commit('setNewTopicErrors',payload)
        },
        async postNewTopic({state,rootGetters,commit, dispatch}){
            try{
                dispatch('setNewTopicErrors', {})
                const response = await axios.post(`${rootGetters.apiUrl}/topics`,{
                    url: state.newTopicUrl
                })
            }catch (e) {
                dispatch('setNewTopicErrors', e.response.data)
            }
        }
    },
}