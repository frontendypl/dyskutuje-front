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
            printScreens: [],

            status: {
                setTopics: 'ready',
                setPrintScreens: 'ready',
                getTopicData: 'ready'
            }
        }
    },
    getters: {
        activeTopicPrintScreen(state){
            return state.printScreens.find(el=>el.topic === state.activeTopic._id)
        },
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
        setActiveTopic(state, payload){
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
        async setTopics({state, rootGetters, commit, dispatch}, payload){
            if (state.status.setTopics === 'pending') return false

            try{
                state.status.setTopics = 'pending'
                const response = await axios.get(`${rootGetters.apiUrl}/topics`)
                commit('setTopics', response.data)
                state.status.setTopics = 'ready'

                dispatch('saveToStorage',{
                    name: 'topics',
                    data: response.data
                })
                
            }catch (e) {
                state.status.setTopics = 'ready'
            }
        },
        postNewTopic({state,rootGetters,commit, dispatch}, url){
            return new Promise(async (resolve, reject)=>{
                try{
                    const response = await axios.post(`${rootGetters.apiUrl}/topics`,{
                        url
                    })
                    //TODO przerobić na backendzie że jesli topic istnieje to komentarze pobierać do niego
                    // commit('setActiveTopic', response.data)
                    resolve(response.data)
                }catch (e) {
                    reject(e.response.data)
                }

            })
        },
        async getTopicData({state, rootGetters,commit},topicId){
            if (state.status.setTopics === 'pending') return false
            try{
                state.status.setTopics = 'pending'
                const response = await axios.get(`${rootGetters.apiUrl}/topics/${topicId}`)
                commit('setActiveTopic', response.data.topic)
                commit('setComments', response.data.comments)
                state.status.setTopics = 'ready'
            }catch (e) {
                state.status.setTopics = 'ready'

            }
        },
        setActiveTopic({commit}, payload){
            commit('setActiveTopic', payload)
        },
        resetActiveTopic({commit}){
            commit('setActiveTopic', {})
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
        setComments({commit}, payload){
            commit('setComments',payload)
        },
        async setPrintScreens({state, rootGetters, dispatch, commit}, payload){
            if (state.status.setPrintScreens === 'pending') return false

            try{
                state.status.setPrintScreens = 'pending'
                const response = await axios.get(`${rootGetters.apiUrl}/printScreens`)
                commit('setPrintScreens', response.data)
                state.status.setPrintScreens = 'ready'
                dispatch('saveToStorage',{
                    name: 'printScreens',
                    data: response.data
                })
            }catch (e) {
                state.status.setPrintScreens = 'ready'
            }
        },
        saveToStorage({state, rootGetters, commit},{name,data}){
            localStorage.setItem(name, JSON.stringify(data))

        },
        loadTopicsFromStorage({commit}){
            console.log('storage setTopics')
            const topics = localStorage.getItem('topics')
            commit('setTopics', JSON.parse(topics))
        },
        loadPrintScreensFromStorage({commit}){
            console.log('storage printScreens')
            const printScreens = localStorage.getItem('printScreens')
            commit('setPrintScreens', JSON.parse(printScreens))
        },
    },

}