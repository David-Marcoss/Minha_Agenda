<template>
  <div class="card" id="edit">
    <div class="card-content">
      <h1 class="title has-text-centered">Editar dados</h1>
    </div>
    <NotificationVue />
    <div class="content">
      <form @submit.prevent="updateUser">
        <div class="field">
          <label for="E-mail">Nome Completo</label>
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="Seu nome"
              v-model="name"
            />
            <span class="icon is-small is-left">
              <span class="material-symbols-outlined">person</span>
            </span>
          </p>
        </div>
        <div class="field">
          <label for="E-mail">*E-mail</label>
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email"
              v-model="email"
            />
            <span class="icon is-small is-left">
              <span class="material-symbols-outlined">alternate_email</span>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control">
            <br />
            <button
              type="submit"
              class="button is-fullwidth is-link is-dark is-rounded"
            >
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
      user: {},
      email: "",
      name: "",
    };
  },

  async created() {
    await this.getUser();
    this.email = this.user.email;
    this.name = this.user.name;
  },

  methods: {
    async getUser() {
      const id = this.$store.state.user.authData.userId;
      const apiUrl = process.env.VUE_APP_API_URL;

      try {
        const response = await axios.get(apiUrl + "users/" + id, {
          headers: {
            Authorization: this.$store.state.user.authData.authToken,
          },
        });

        this.user = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async updateUser() {
      const id = this.$store.state.user.authData.userId;
      const apiUrl = process.env.VUE_APP_API_URL;

      if ( this.validateData()){
        try {
            
            const res = await axios.put(
              apiUrl + "users/" + id,
              { name: this.name, email: this.email },
              { headers: { Authorization: this.$store.state.user.authData.authToken } }
            );

            this.user = res.data;
            this.email = this.user.email;
            this.name = this.user.name;

            this.$store.commit("setNotification", {
                show: true,
                msg: "Dados atualizados com sucesso",
                type: "success"
            });

        } catch (error) {

            this.$store.commit("setNotification", {
                show: true,
                msg: "Erro ao atualizar dados, verifique se digitou os dados corretamente",
                type: "danger"
            });
        }
      }

     
    },

    validateData() {
      if (this.name == "" || this.email == "") {
        this.$store.commit("setNotification", {
            show: true,
          msg: "Os campos não podem estar vazios",
          type: "danger"
        });
        return false;

      } else if (this.name == this.user.name && this.email == this.user.email) {
        this.$store.commit("setNotification", {
            show: true,
          msg: "Nenhuma Alteração foi feita",
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