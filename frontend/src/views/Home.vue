<template>
  <div class="home">
    <div id="nav">
      <router-link to="/" aria-label="Page d'accueil">Home</router-link> |
      <router-link to="/about" aria-label="A propos de notre société">About</router-link> |
      <router-link to="/login" aria-label="Accès membre">Accès membre</router-link> |
      <router-link to="/signup" aria-label="Créer un compte">Créer un compte</router-link>
    </div>
    <img alt="logo" src="../assets/icone-black-rs.png">
    <HomeComponents msg="Bienvenue sur le réseau social Groupomania, créé pour vous, avec vous !"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponents from '@/components/HomeComponents.vue'

export default {
  name: 'Home',
  components: {
    HomeComponents
  }
}
</script>

<style lang="scss" scoped>

  #nav {
  padding: 30px;
  margin-bottom: -30px;


  a {
    text-decoration: none;
    font-weight: bold;
    color: #000;

    &:hover {
      color: #fc2e06
    }
  }
}

img {
  width: 500px;
  height: 500px;
}
</style>
