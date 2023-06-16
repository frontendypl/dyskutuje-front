import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            activeTopic: {
                _id: '',
                url: '',
                createdAt: '',
                updatedAt: '',
            },
            // activeTopic's comments
            comments: [],

            //Errors on creating
            newTopicErrors: {},
            newCommentErrors: {},


        }
    },
    getters: {
    },
    mutations: {
        setNewTopicErrors(state,payload){
            state.newTopicErrors = {...payload}
        },
        setTopicData(state, payload){
            state.activeTopic = {...payload}
        },
        //Comments
        setComments(state, payload){
            state.comments = [...payload]
        },
        setNewCommentErrors(state,payload){
            state.newCommentErrors = {...payload}
        },
    },
    actions: {
        setNewTopicErrors({commit},payload){
            commit('setNewTopicErrors',payload)
        },
        postNewTopic({state,rootGetters,commit, dispatch}, url){
            return new Promise(async (resolve, reject)=>{
                try{
                    dispatch('setNewTopicErrors', {})
                    const response = await axios.post(`${rootGetters.apiUrl}/topics`,{
                        url
                    })
                    //TODO przerobić na backendzie że jesli topic istnieje to komentarze pobierać do niego
                    commit('setTopicData', response.data)
                    // commit('setComments', response.data.topic)
                    resolve()
                }catch (e) {
                    dispatch('setNewTopicErrors', e.response.data)
                    reject('Errors in form')
                }

            })
        },
        async getTopicData({rootGetters,commit},topicId){
            try{
                // dispatch('setTopicData', {})
                const response = await axios.get(`${rootGetters.apiUrl}/topics/${topicId}`)
                commit('setTopicData', response.data.topic)
                commit('setComments', response.data.comments)
            }catch (e) {

            }
        },
        //Comments
        postNewComment({state,rootState, rootGetters,commit, dispatch},{text, nickName, parent=null}){
            return new Promise(async (resolve, reject)=>{
                try{
                    commit('setNewCommentErrors', {})
                    const response = await axios.post(`${rootGetters.apiUrl}/comments`,{
                        text,
                        nickName,
                        parent,
                        topic: state.activeTopic._id
                    })
                    commit('setTopicData', response.data)

                    resolve()

                }catch (e) {
                    commit('setNewCommentErrors', e.response.data.errors)
                    reject('Errors in form')
                }
            })
        },
    },

}