import axios from "axios";
// import { forEach } from "core-js";

export default {
    namespaced: true,
    state() {
        return {
            topics: [],
            activeTopic: {
                _id: '',
                url: '',
                createdAt: '',
                updatedAt: '',
            },
            // activeTopic's comments
            comments: [],

            //TODO
            printScreens: []
        }
    },
    getters: {
        commentsWithSubComments(state){
            const comments = [...state.comments]
            comments.forEach(comment=>{
                const subComments = comments.filter(el=>comment._id === el.parent)
                comment.subComments = [...subComments]
                comment.subComments.reverse()
            })
            return comments
        },
        topicsWithPrintScreens(state){
            const topics = [...state.topics]
            const printScreens = [...state.printScreens]
            topics.forEach(topic=>{
                const printScreen = printScreens.find(el=>topic._id === el.topic)
                topic.printScreen = {...printScreen}
            })
            return topics
        }
    },
    mutations: {
        setTopics(state, payload){
            state.topics = [...payload]
        },
        setTopicData(state, payload){
            state.activeTopic = {...payload}
        },
        //Comments
        setComments(state, payload){
            state.comments = [...payload]
        },
        setPrintScreens(state, payload){
            state.printScreens = [...payload]
        }
    },
    actions: {
        async setTopics({rootGetters, commit}, payload){
            try{
                const response = await axios.get(`${rootGetters.apiUrl}/topics`)
                commit('setTopics', response.data)
            }catch (e) {
                
            }
        },
        postNewTopic({state,rootGetters,commit, dispatch}, url){
            return new Promise(async (resolve, reject)=>{
                try{
                    const response = await axios.post(`${rootGetters.apiUrl}/topics`,{
                        url
                    })
                    //TODO przerobić na backendzie że jesli topic istnieje to komentarze pobierać do niego
                    commit('setTopicData', response.data)
                    resolve()
                }catch (e) {
                    reject(e.response.data)
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
                    // commit('setNewCommentErrors', {})
                    const response = await axios.post(`${rootGetters.apiUrl}/comments`,{
                        text,
                        nickName,
                        parent,
                        topic: state.activeTopic._id
                    })
                    dispatch('getTopicData', state.activeTopic._id)

                    resolve()

                }catch (e) {
                    // commit('setNewCommentErrors', e.response.data.errors)
                    reject({errors: e.response.data.errors})
                }
            })
        },
        async setPrintScreens({rootGetters, commit}, payload){
            try{
                const response = await axios.get(`${rootGetters.apiUrl}/printScreens`)
                commit('setPrintScreens', response.data)
            }catch (e) {
                
            }
        },
    },

}