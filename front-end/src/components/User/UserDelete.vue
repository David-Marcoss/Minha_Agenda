<template>
    <div class="card" id="edit">
      <div class="card-content">
        <h1 class="title has-text-centered">Excluir conta</h1>
      </div>
      <NotificationVue/>
      <div class="content has-text-centered">
        <h2 class="subtitle">Tem certeza que deseja excluir sua conta?</h2>
        <p>Ao excluir sua conta, você perderá todos os seus dados.</p>
        <footer class="card-footer">
          <button class="button is-danger card-footer-item" @click="deleteUser">Excluir</button>
          <button class="button card-footer-item" @click="cancelDeletion">Cancelar</button>
        </footer>
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
 
    methods: {
  
      async deleteUser () {
        const id = this.$store.state.user.authData.userId;
        const apiUrl = process.env.VUE_APP_API_URL;

        try {
            await axios.delete(
            apiUrl + "users/" + id,
            { headers: { Authorization: this.$store.state.user.authData.authToken } }
            );

            this.$store.commit("setNotification", {
                show: true,
                msg: "Conta excluida com sucesso !",
                type: "success"
            });

            this.$store.commit("user/clearAuth");
            this.$router.push({ name: "login" });

        } catch (error) {
            console.log(error);

            this.$store.commit("setNotification", {
                show: true,
                msg: "Erro ao excluir conta!",
                type: "danger"
            });
        }
      },

      cancelDeletion() {
        this.$router.push({ name: "edit" });
      },
  
    },
  };
  </script>
  
  <style scoped>
.card-footer {
  justify-content: center;
}

.card-footer-item {
  width: auto;
  margin: 0 10px;
}

.button {
  width: 100%;
  max-width: 200px;
}
</style>
