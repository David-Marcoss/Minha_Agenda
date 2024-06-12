<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-12">
          <FullCalendar :options="calendarOptions" />

          <!-- Modal create event -->
          <CreateEvent v-if="openModalCreate" :is-open="openModalCreate" :event="event" @close="openModalCreate = false" />
          
          <!-- Modal edit event -->
          <EditEvent v-if="openModalEdit" :is-open="openModalEdit" :event_id="event_id" @close="openModalEdit=false" @deleteEvent="deleteEvent" />
          
          <!-- Modal create event -->
          <DeleteEvent v-if="openModalDelete" :is-open="openModalDelete" :event="event" @close="openModalDelete = false" />

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'

import { mapGetters } from 'vuex'


import CreateEvent from './CreateEvent.vue'
import EditEvent from './EditEvent.vue'
import DeleteEvent from './DeleteEvent.vue'

export default {
  name: "CalendarVue",
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    CreateEvent,
    EditEvent,
    DeleteEvent

  },
  data() {
    return {
      openModalCreate: false,
      openModalEdit: false,
      openModalDelete: false,
      event: {},
      event_id: undefined
    }
  },

  async created(){
    await this.$store.dispatch("calendar/GET_EVENTS",)
  },

  computed: {
    ...mapGetters('calendar', ['EVENTS']),
    calendarOptions() {
      return {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: 'title',
          center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          right: 'prev,today,next'
        },
        buttonText: {
          list: 'Eventos'
        },
        selectable: true,
        events: this.EVENTS, // Reactive getter
        locale: ptBrLocale,
        editable: true,
        select: this.handleDateClick,
        eventClick: this.handleEventClick,
        eventResize: this.updateEvent,
        eventDrop: this.updateEvent,
        //eventDidMount: this.eventRender
      };
    }
  },
  methods: {
    // metodo execultado quando um evento é renderizado
    eventRender(data) {
      const span = document.createElement("span");

      span.innerHTML = `
        <img width="20" height="20" viewBox="0 0 640 160" fill="none" src="img/calendario.png">`;

      data.el.appendChild(span)
    },
    // metodo execultado ao clicar em uma data
    handleDateClick(data) {
      this.openModalCreate = true
      this.event = {
        title: "",
        start: data.startStr,
        end: data.endStr,
        allDay: data.allDay,
      }

    },
    // metodo execultado ao clicar em um evento
    handleEventClick(data){

      this.event_id = data.event.id

      this.openModalEdit = true
      
    },

    deleteEvent(event){
      this.openModalEdit = false
      this.openModalDelete = true
      this.event = event
    },

    // metodo execultado quando um evento é movido no calendario
    async updateEvent(data){
      await this.$store.dispatch("calendar/UPDATE_EVENT", {
          id: data.event.id,
          title: data.event.title,
          start: data.event.start,
          end: data.event.end,
          allDay: data.event.allDay,
          description: data.event.description || ""
        })
    }
  }
}
</script>

<style scoped>
.fc {
  height: 60%;
  width: 100%;
}
.fc-daygrid-body {
  height: auto;
}
</style>
