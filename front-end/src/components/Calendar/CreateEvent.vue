<template>
    <div v-if="isOpen" class="modal is-active">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Meu Evento</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">

          <NotificationVue/>

          <form @submit.prevent="saveEvent">
            <div class="field">
              <label class="label">*Título</label>
              <div class="control">
                <input class="input" type="text" v-model="title" required>
                <div class="input-errors" v-for="error of v$.title.$errors" :key="error.$uid">
                  <div class="has-text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
  
            <div class="field">
              <label class="label">Descrição</label>
              <div class="control">
                <textarea class="textarea" v-model="description"></textarea>
              </div>
            </div>
  
            <div class="field">
              <label class="label">*Data de Início</label>
              <div class="control">
                <input class="input" type="date" v-model="startDate" required>
                <div class="input-errors" v-for="error of v$.startDate.$errors" :key="error.$uid">
                  <div class="has-text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
  
            <div class="field" v-if="!allDay">
              <label class="label">*Hora de Início</label>
              <div class="control">
                <input class="input" type="time" v-model="startTime" required>
                <div class="input-errors" v-for="error of v$.startTime.$errors" :key="error.$uid">
                  <div class="has-text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
  
            <div class="field">
              <label class="label">*Data de Fim</label>
              <div class="control">
                <input class="input" type="date" v-model="endDate" required>
                <div class="input-errors" v-for="error of v$.endDate.$errors" :key="error.$uid">
                  <div class="has-text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
  
            <div class="field" v-if="!allDay">
              <label class="label">*Hora de Fim</label>
              <div class="control">
                <input class="input" type="time" v-model="endTime" required>
                <div class="input-errors" v-for="error of v$.endTime.$errors" :key="error.$uid">
                  <div class="has-text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox" v-model="allDay"/>
                  O Dia todo
              </label>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button class="button is-success" @click="saveEvent">Save changes</button>
            <button class="button" @click="closeModal">Cancel</button>
          </div>
        </footer>
      </div>
    </div>
  </template>
  
  <script>

  import NotificationVue   from '../Notification.vue'
  
  import { useVuelidate } from '@vuelidate/core'
  import { required } from '@vuelidate/validators'

  export default {
    name: "CreateEventModal",
    components:{
      NotificationVue 
    },
    props: {
      isOpen: Boolean,
      event: Object
    },
    data() {
      return {
        title: this.event.title || "",
        description: this.event.description || "",
        startDate: this.event.start.substring(0, 10) || "",
        startTime: new Date().toTimeString().substring(0, 5) || "",
        endDate: this.event.end.substring(0, 10) || "",
        endTime: new Date().toTimeString().substring(0, 5) || "",
        allDay: this.event.allDay || true,
      };
    },

    setup() {
      return { v$: useVuelidate() }
    },

    validations() {
      return {
        title: { required },
        description: {},
        startDate: { required },
        endDate: { required },
        startTime: { },
        endTime: {  },
      }
      
    },

    methods: {
      closeModal() {
        this.$emit("close");
      },
      async saveEvent() {
        
        // metodo validação dos dados
         if (this.datesIsValid() ){

           const startDate = this.formatStringsToDate(this.startDate, this.startTime)
           const endDate =  this.formatStringsToDate(this.endDate, this.endTime)

           const event = {
              title: this.title,
              start: startDate,
              end: endDate,
              allDay: this.allDay,
              description: this.description,
              userId: this.$store.state.user.authData.userId
           }

           this.$store.dispatch('calendar/CREATE_EVENT',event).then(() => {
               this.$emit("close")
          })
           
         }
      },

      formatStringsToDate(dateStr, hours) {
          const date = new Date(dateStr + 'T' + hours + ':00.000-03:00');

          return date;
      },

      datesIsValid(){

        this.v$.$touch()

        if (this.v$.$invalid){
          this.$store.commit("setNotification",{
              show: true,
              msg: "Formulario invalido !! Preencha os campos corretamente",
              type: "danger"
          })
          return false

        }else if( this.startDate > this.endDate){
          
          this.$store.commit("setNotification",{
              show: true,
              msg: "Formulario invalido !! A data de início não pode ser maior que a data do fim !!",
              type: "danger"
          })

          return false
        
        }else if( this.allDay && this.startDate == this.endDate && this.startTime >= this.endTime){

          this.$store.commit("setNotification",{
              show: true,
              msg: "Formulario invalido !! A hora do fim  deve ser maior que a hora do início!!",
              type: "danger"
          })

          return false
        
        }else{

          return true
        }

      }
    }
  };
  </script>

  