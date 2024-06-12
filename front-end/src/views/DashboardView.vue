<template>
  <div class="home"> 
    <NavBar/>
    
    <div class="container is-fluid mt-5 mb-5" id="dashboard">
      <div class="columns is-centered">
        <div class="column is-full">
          <div class="box">
            <h1 class="title has-text-centered">Agenda Online</h1>
            
            <CalendarVue/>

          </div>
        </div>
      </div>
    </div>

    <FooterVue/>

  </div>
</template>


<script>


import NavBar from '../components/NavBar.vue'
import CalendarVue from '../components/Calendar/Calendar.vue'
import FooterVue from '../components/Footer.vue'
import axios from 'axios'

export default {
  name: 'DashboardView',
  components: {
    NavBar,
    CalendarVue,
    FooterVue
  },

  data() {
    return {
      users: [],
      userLogged: {},
      showCard: true
    }
  },

  async created(){
    await this.getUsers()
    this.getUserLogged()

  },

  methods: {
    async getUsers() {
      const apiUrl = process.env.VUE_APP_API_URL

      try {
        const response = await axios.get(apiUrl + "users",{
            headers: {
              Authorization: this.$store.state.user.authData.authToken
            }
          })

        this.users = response.data

      } catch (error) {
        console.log(error)
      }
    },

    getUserLogged() {
      const id = this.$store.state.user.authData.userId
      this.userLogged = this.users.find(user => user.id === id)
      this.users.splice(this.users.indexOf(this.userLogged), 1)
    }
  }
 
  
}
</script>

<style scoped>
.home {
  widows: 100%;
  height: 100%;
}

#dashboard {
  width: 90vw;
}

@media (max-width: 768px) {
  #dashboard {
    width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  #dashboard {
    width: 80vw;
  }
}

@media (min-width: 1025px) {
  #dashboard {
    width: 70vw;
  }
}

</style>
