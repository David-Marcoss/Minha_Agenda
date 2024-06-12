<template>
  <div :class="`notification is-${$store.state.notification.type} is-light`" v-if="$store.state.notification.show">
        <button class="delete" @click="deleteNotification()"></button>
        {{$store.state.notification.msg}}
    </div>
</template>

<script>
export default {
    name: "NotificationVue",
    props: ["msg","type"],

    computed: {
        show() {
        return this.$store.state.notification.show;
        }
    },

    watch: {
        show(newValue) {
            if (newValue) {
                this.startTimeout();
            }
        }
    },
    methods:{
        startTimeout() {
            setTimeout(() => {
                this.deleteNotification();
            }, 3000);
        },
        deleteNotification(){
            
            this.$store.commit("setNotification",{
                show: false,
                msg: null,
                type: null
            })
        }
    }
}
</script>

<style>

</style>