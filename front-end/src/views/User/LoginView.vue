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
            
            <p class="is-size-3 has-text-centered"> Login </p>
            
            <NotificationVue />
            
            <div class="content">
                <form @submit.prevent="login">
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
                        <label for="E-mail">Senha</label>
                        <p class="control has-icons-left">
                            <input class="input" type="password" placeholder="Password" v-model="password">
                            <span class="icon is-small is-left">
                                <span class="material-symbols-outlined">lock</span>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-right">
                            <router-link to="/request-reset-password"> Esqueceu sua senha </router-link>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button class="button is-fullwidth is-primary is-inverted is-rounded">Entrar</button>
                        </p>
                    </div>
                </form><br>
                <div class="field">
                    <p class="control">
                        <router-link  to="register" class="button is-fullwidth is-info is-inverted is-rounded">
                            Cadastra-se
                        </router-link>
                    </p>
                </div>
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
            email: "",
            password: ""
        }
    },

    methods:{
        async login(){
            const apiUrl = process.env.VUE_APP_API_URL

            if( this.email && this.password){

                try{
                    const req = await axios.post(apiUrl + "users/login", {
                        email: this.email,
                        password:this.password
                    })

                    const {token, userId } = req.data

                    this.$store.commit("user/setAuth",{token, userId})
                    this.$router.push("/")
                    

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
                        msg: "Por favor preencha todos os campos obrigatorios do formulário !! \n ",
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