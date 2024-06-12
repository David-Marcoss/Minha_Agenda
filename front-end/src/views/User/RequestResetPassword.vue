<template>
    <div class="login-form-container">
      <div class="card" style="width: 500px; height:550px">
        <div class="card-image form-img mt-3">
            <figure class="image is-64x64">
            <img
                src="img/calendario.png"
                alt="Placeholder image"
            />
            </figure>
            <div class="is-size-2 has-text-centered has-text-info">
                    Minha Agenda
            </div>
        </div>
          <div class="card-content">
              
              <p class="is-size-3 has-text-centered"> Vamos recuperar sua senha </p>

              <p class="is-size-6">Informe o E-mail que você usa para entrar na sua conta.</p>
              
              <NotificationVue />
              
              <div class="content" v-if="showForm">
                  <form @submit.prevent="requestResetPassword">
                      <div class="field">
                          <label for="E-mail"> E-mail</label>
                          <p class="control has-icons-left has-icons-right">
                              <input class="input" type="email" placeholder="Email" v-model="email">
                              <span class="icon is-small is-left">
                                  <span class=" material-symbols-outlined">alternate_email</span>
                              </span>
                          </p>
                      </div>
                      
                      <div class="field">
                          <p class="control">
                              <button class="button is-fullwidth is-primary is-inverted is-rounded">Entrar</button>
                          </p>
                      </div>
                  </form><br>
              </div>
          </div>
      </div>
    </div>
  </template>
  
<script>
import NotificationVue from '../../components/Notification.vue'
import axios from 'axios'

export default {
    name: "LoginVue",
    components:{
        NotificationVue
    },
    data(){
        return{
            showForm: undefined,
            email: "",
            password: ""
        }
    },

    created(){
        this.showForm = true
    },

    methods:{
        async requestResetPassword(){
            const apiUrl = process.env.VUE_APP_API_URL

            if( this.email){

                try{
                    await axios.post( apiUrl + "users/request-reset-password", {
                        email: this.email,
                    })

                    this.$store.commit("setNotification",{
                        show: true,
                        msg: "Um e-mail foi enviado para você com as instruções para recuperar sua senha",
                        type: "success"
                    })
                    
                    this.showForm = false

                }catch (error ){
      
                    this.$store.commit("setNotification",{
                        show: true,
                        msg: "Email Invalido\n",
                        type: "danger"
                    })
            }
            
            }else{
                this.$store.commit("setNotification",{
                        show: true,
                        msg: "Por favor preencha seu E-mail !! \n ",
                        type: "danger"
                })
            }
        }
    }
}
</script>

  <style>
  
  .login-form-container{
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .form-img{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  
  
  </style>