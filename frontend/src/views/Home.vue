<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Accès membre</router-link> |
      <router-link to="/signup">Créer un compte</router-link>
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
