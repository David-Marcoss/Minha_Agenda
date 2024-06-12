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
                
                <p class="is-size-3 has-text-centered"> Criar Conta</p>
                
                <NotificationVue />

                <div class="content">
                    <form @submit.prevent="register">
                        <div class="field">
                            <label for="E-mail">Nome Completo</label>
                            <p class="control has-icons-left has-icons-right">
                                <input class="input" type="text" placeholder="Seu nome" v-model="name">
                                <span class="icon is-small is-left">
                                <span class="material-symbols-outlined">person</span>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <label for="E-mail">*E-mail</label>
                            <p class="control has-icons-left has-icons-right">
                                <input class="input" type="email" placeholder="Email" v-model="email">
                                <span class="icon is-small is-left">
                                    <span class=" material-symbols-outlined">alternate_email</span>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <label for="E-mail">*Senha</label>
                            <p class="control has-icons-left">
                                <input class="input" type="password" placeholder="Password" v-model="password">
                                <span class="icon is-small is-left">
                                    <span class="material-symbols-outlined">lock</span>
                                </span>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control"><br>
                                <button type="submit" class="button is-fullwidth is-primary is-inverted is-rounded">
                                    Registre-se
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    import axios from 'axios'
    import NotificationVue from '../../components/Notification.vue'
  
    export default {
        name: "RegisterVue",
        components:{
            NotificationVue
        },
        data(){
            return{
                name: "",
                email: "",
                password: ""
            }
        },
        
        methods:{

        async register(){

            const apiUrl = process.env.VUE_APP_API_URL

            if (this.email && this.password){
                
                if(this.password.length < 8){
                    this.$store.commit("setNotification",{
                        show: true,
                        msg: "A senha deve ter no minimo 8 caracteres !!",
                        type: "danger"
                    })

                }else{
                    
                    try {
                        await axios.post( apiUrl + "users",{
                            name: this.name,
                            email: this.email,
                            password: this.password
                        })

                        this.$store.commit("setNotification",{
                            show: true,
                            msg: "Conta criada com sucesso! Faça login para acessar sistema !!",
                            type: "primary"
                        })

                        this.$router.push("/login")
                        
                    } catch (error) {

                        const info = error.response != undefined ? error.response.data.error : "Erro no servidor !!"
                        
                        this.$store.commit("setNotification",{
                            show: true,
                            msg: "Não foi possivel realizar cadastro \n "+ info,
                            type: "danger"
                        })

                    }
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
  