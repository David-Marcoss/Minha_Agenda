<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" id="nav">
  <div class="navbar-brand">
    <router-link  class="navbar-item" to="/" id="">
      <img width="40" height="50" viewBox="0 0 640 160" fill="none" src="img/calendario.png" class="mr-1">
      <p class="has-text-info">Minha Agenda</p>
    </router-link>

  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item">
        Home
      </router-link>

      <router-link to="/user" class="navbar-item">
        Perfil
      </router-link>

    </div>

    <div class="navbar-end">
      
      <div class="navbar-item">
        <div class="buttons">
          <router-link to="/logout" class="button is-light">
            Sair
          </router-link>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>

export default {

}
</script>

<style>

#nav {
  height: 9vh;
  font-size: 1.1rem;
  padding-right: 100px;
  padding-left: 100px;
}

</style>