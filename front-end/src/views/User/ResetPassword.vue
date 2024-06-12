<template>
    <div class="login-form-container">
      <div class="card" style="width: 500px; height:700px">
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
              
              <p class="is-size-3 has-text-centered"> Vamos criar uma nova senha para você. </p>
              
              <NotificationVue />
              
              <div class="content">
                  <form @submit.prevent="requestResetPassword">
                    <div class="field">
                            <label for="password">* Sua nova Senha</label>
                            <p class="control has-icons-left">
                                <input class="input" type="password" placeholder="Digite sua nova senha" v-model="password">
                                <span class="icon is-small is-left">
                                    <span class="material-symbols-outlined">lock</span>
                                </span>
                            </p>
                            <label for="password">* Confirme sua senha</label>
                            <p class="control has-icons-left">
                                <input class="input" type="password" placeholder="Digite sua senha novamente" v-model="password2">
                                <span class="icon is-small is-left">
                                    <span class="material-symbols-outlined">lock</span>
                                </span>
                            </p>
                        </div><br>
                      
                      <div class="field">
                          <p class="control">
                              <button class="button is-fullwidth is-primary is-inverted is-rounded">Salvar</button>
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
            showForm: "",
            password: "",
            password2: "",
            token: ""
        }
    },

    async created(){
        this.token = this.$route.params.token
        const apiUrl = process.env.VUE_APP_API_URL

        try{
            await axios.get(
              apiUrl + "users/verify-reset-password/" + this.token
            )
        }catch (error ){
            this.$store.commit("setNotification",{
                        show: true,
                        msg: "Link, invalido ou expirado !! \n ",
                        type: "danger"
            })
            
            this.$router.push("/login")
        }

    },

    methods:{
        async requestResetPassword(){
            const apiUrl = process.env.VUE_APP_API_URL

            if( this.password != "" && this.password2 != "" && this.password == this.password2){

                try{
                    const req = await axios.post(
                        apiUrl + "users/reset-password/" + this.token,
                        { password: this.password}
                    )

                    console.log(req)

                    this.$store.commit("setNotification",{
                        show: true,
                        msg: "Senha alterada com sucesso !!",
                        type: "success"
                    })

                    this.$router.push("/login")

                }catch (error ){
                    const info = error.response != undefined ? error.response.data.error : "Erro no servidor !!"
                        
                    this.$store.commit("setNotification",{
                        show: true,
                        msg: "Não foi possivel realizar login \n "+ info,
                        type: "danger"
                    })
            }
            
            }else{
                this.$store.commit("setNotification",{
                        show: true,
                        msg: "Senha invalida, a senha deve ter pelo menos 8 caracteres e devem ser iguais !! \n ",
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