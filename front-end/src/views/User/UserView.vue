<template>
    <div class="user"> 
        <NavBar/>
        <div class="container is-fluid mt-4" id="dashboard">
            <div class="columns is-centered">
                <div class="column is-full">
                    <div class="box">
                        <div class="mb-5 has-text-centered">
                            <figure class="image is-128x128 is-inline-block">
                                <img class="is-rounded" src="img/user.png" />
                            </figure>
                            <h1 class="title has-text-centered"> {{ user.name }}</h1>
                        </div>
                        <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
                            <ul>
                                <li><router-link to="/user/edit">Editar</router-link></li>
                                <li><router-link to="/user/change-password">Redefinir senha</router-link></li>
                                <li><router-link to="/user/delete">Excluir conta</router-link></li>
                            </ul>
                        </nav>
                        <hr>

                        <div class="content-container mb-4">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
  
<script>
  
  
  import NavBar from '../../components/NavBar.vue'
  import axios from 'axios'
  
  export default {
    name: 'DashboardView',
    components: {
      NavBar,
    },
  
    data() {
      return {
        user:{},
      }
    },
  
    async created(){
      await this.getUser()

      this.$router.push({name: 'edit'})
  
    },
  
    methods: {
      async getUser() {
        
        const id = this.$store.state.user.authData.userId
        const apiUrl = process.env.VUE_APP_API_URL
  
        try {
          const response = await axios.get(apiUrl + "users/" + id,{
              headers: {
                Authorization: this.$store.state.user.authData.authToken
              }
            })
  
          this.user = response.data
  
        } catch (error) {
          console.log(error)
        }
      },
  
    }
   
    
  }
</script>
  
<style scoped>
    .user {
        widows: 100%;
        height: 100%;
    }
  
    #dashboard {
        margin-top: 20px;
        height: 80vh;
        width: 90vw;
    }

    .content-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px; /* Define uma altura mínima para o conteúdo */
    }
  
    #user-logged{
        background-color: #a9c0ff90
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
  