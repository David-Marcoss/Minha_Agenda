<template>
  <div class="card">

  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img
            src="img/user.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{ user.name }}</p>
        <p class="subtitle is-6">{{ user.email }}</p>
      </div>
    </div>
  </div>
  <footer class="card-footer" v-if="isUserLogged">
    <router-link to="/user" class="card-footer-item">Acessar dados</router-link>
  </footer>

</div>
</template>

<script>
export default {

    props: {
        user: {
            type: Object,
            required: true
        },
        isUserLogged: {
            type: Boolean,
            default: false
        }
    }

}
</script>

<style>

</style>