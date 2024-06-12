<template>
    <div class="card" id="edit">
      <div class="card-content">
        <h1 class="title has-text-centered">Editar dados</h1>
      </div>
      <NotificationVue />
      <div class="content">
        <form @submit.prevent="changePassword">
          <div class="field">
            <label for="old_password">Alterar senha</label>
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="password"
                placeholder="Sua senha atual"
                v-model="old_password"
              />
              <span class="icon is-small is-left">
                <span class="material-symbols-outlined">lock</span>
              </span>
            </p>
          </div>
          <div class="field">
            <label for="new_password">Senha nova</label>
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="password"
                placeholder="Sua nova senha"
                v-model="new_password"
              />
              <span class="icon is-small is-left">
                <span class="material-symbols-outlined">lock</span>
              </span>
            </p>
          </div>
  
          <div class="field">
            <p class="control">
              <br />
              <button type="submit" class="button is-fullwidth is-link is-dark is-rounded">
                Salvar
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import NotificationVue from "../Notification.vue";
  
  export default {
    components: {
      NotificationVue,
    },
  
    data() {
      return {
        old_password: "",
        new_password: "",
      };
    },

    methods: {
  
      async changePassword() {
        const id = this.$store.state.user.authData.userId;
        const apiUrl = process.env.VUE_APP_API_URL;
  
        if ( this.validateData()){
          try {
              await axios.post(
                apiUrl + "users/change-password/" + id,
                {old_password: this.old_password, new_password: this.new_password},
                { headers: { Authorization: this.$store.state.user.authData.authToken } }
              );

              this.$store.commit("setNotification", {
                  show: true,
                  msg: "Senha alterada com sucesso, faça login com a nova senha!",
                  type: "success"
              });

              this.$store.commit("user/clearAuth");
              this.$router.push({ name: "login" });

          } catch (error) {
                console.log(error);

              this.$store.commit("setNotification", {
                  show: true,
                  msg: "Erro ao atualizar senha, verifique se digitou sua senha atual corretamente!",
                  type: "danger"
              });
          }
        }
  
       
      },
  
      validateData() {
        if (this.old_password == "" || this.new_password == "") {
          this.$store.commit("setNotification", {
            show: true,
            msg: "Os campos não podem estar vazios",
            type: "danger"
          });
          return false;
  
        } else if (this.old_password.length < 8 || this.new_password.length < 8) {
          this.$store.commit("setNotification", {
            show: true,
            msg: "A senha deve ter no mínimo 8 caracteres, verifique as senha digitadas",
            type: "danger"
          });
          return false;
        
        } else if (this.old_password == this.new_password) {
          this.$store.commit("setNotification", {
            show: true,
            msg: "A senhas não podem ser iguais, verifique as senha digitadas",
            type: "danger"
          });
          return false;
  
        } else {
  
          return true;
        }
      },
    },
  };
  </script>
  
  <style>
  #edit {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 50px;
    margin-bottom: 10px;
    width: 50%;
  }
  </style>