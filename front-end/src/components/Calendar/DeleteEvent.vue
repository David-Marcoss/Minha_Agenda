<template>
    <div v-if="isOpen" class="modal is-active">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Meu Evento: {{ event.title }} </p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <h3> Tem certeza que deseja excluir esse evento ?</h3>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-danger" @click="deleteEvent">Excluir</button>
            <button class="button" @click="closeModal">Cancelar</button>
          </div>
        </footer>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    name: "DeleteEventModal",

    props: {
      event: Object,
      isOpen: Boolean,
    },

    methods: {
      closeModal() {
        this.$emit("close");
      },

      async deleteEvent(){
        await this.$store.dispatch("calendar/DELETE_EVENT",this.event.id)
        this.$emit("close");
      }
    }
  };
  </script>

  