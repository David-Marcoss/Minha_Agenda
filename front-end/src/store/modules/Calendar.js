import axios from "axios"

const state = {
    EVENTS: []
}

const getters = {
    EVENTS: state => {
        return state.EVENTS.map( e => {
            e.start =  new Date(e.start)
            e.end =  new Date(e.end)
            return COLOR_EVENT(e)
        })
    },
}


function COLOR_EVENT(event) {
    if (event.end < new Date()) {
      return {
        ...event,
        backgroundColor: '#0082d86d',
      }
    }
    return event
}

const mutations = {

    GET_EVENTS(state,events){
        state.EVENTS = events
    },

    ADD_EVENT(state,event){

        state.EVENTS.push(COLOR_EVENT(event))
    },

    EDIT_EVENT(state,event){

        const index = state.EVENTS.findIndex( e => e.id == event.id)

        state.EVENTS[index] = COLOR_EVENT(event)
    },

    DELETE_EVENT(state,id){

        const index = state.EVENTS.findIndex( e => e.id == id)
        
        state.EVENTS.splice(index,1)
    },

}

const actions = {

    async GET_EVENTS({ commit, rootState }) {
        try{
 
            const res =  await axios.get(
              process.env.VUE_APP_API_URL + "events/user/" + rootState.user.authData.userId ,
              { headers: { Authorization: rootState.user.authData.authToken } },
            )

            commit("GET_EVENTS",res.data)
         
          }catch (error ){
            console.log(error)
         }  
    },

    async CREATE_EVENT({ commit, rootState }, event) {
        try{

            const res =  await axios.post(
              process.env.VUE_APP_API_URL + "events",
              event,
              { headers: { Authorization: rootState.user.authData.authToken } },
            )

            console.log(res)

            commit("ADD_EVENT",res.data)
         
          }catch (error ){
            console.log(error)
         }  
    },

    async UPDATE_EVENT({ commit, rootState }, event) {
        try{

            const id =  event.id

            delete event.id

            const res =  await axios.put(
              process.env.VUE_APP_API_URL + "events/" + id ,
              event,
              { headers: { Authorization: rootState.user.authData.authToken } },
            )

            commit("EDIT_EVENT",res.data)
         
          }catch (error ){
            console.log(error)
         }  
    },

    async DELETE_EVENT({ commit, rootState }, id) {
        try{
            await axios.delete(
              process.env.VUE_APP_API_URL + "events/" + id ,
              { headers: { Authorization: rootState.user.authData.authToken } },
            )

            commit("DELETE_EVENT",id)
         
          }catch (error ){
            console.log(error)
         }  
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}