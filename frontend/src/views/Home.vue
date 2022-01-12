<template>
  <div class="home">
    <div id="nav">
      <input type="checkbox" id="menu-checkbox" class="menu-checkbox" />
      <label for="menu-checkbox" class="menu-toggle">&equiv; Menu</label>
      <ul class="menu">
        <li><router-link to="/" aria-label="Page d'accueil">Home</router-link></li><span> | </span>
        <li><router-link to="/about" aria-label="A propos de notre société">About</router-link></li><span> | </span>
        <li><router-link to="/login" aria-label="Accès membre">Accès membre</router-link></li><span> | </span>
        <li><router-link to="/signup" aria-label="Créer un compte">Créer un compte</router-link></li>
      </ul>
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
li {
  list-style: none;
}
.menu {
  display: flex;
  justify-content: space-around;
}
.menu-checkbox {
  //visibility: hidden;
  display: none;
}
.menu-toggle {
  display: none;
}

#nav {
  padding: 30px;
  margin-bottom: -30px;
  a {
    text-decoration: none;
    font-weight: bold;
    color: #000;
    background: linear-gradient(to top, #fc2e06 0%, #fc2e06 2px, transparent 3px) no-repeat;
    background-size: 0 100%;
    transition: background-size .3s;
    &:hover {
      //color: #961103
      background-size: 100% 100%;
    }
  }
}
img {
  width: 500px;
  height: 500px;
}
@media all and (max-device-width : 480px) {
  img {
    width: 300px;
    height: 300px;
  }
  .menu-checkbox {
    display: initial;
    opacity: 0;
    position: absolute;
    top: -1000px;
  }
  .menu {
    display: none;
  }
  .menu-checkbox:checked ~ .menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  span {
    display: none;
  }
  // .menu-checkbox:focus + .menu-toggle {
  //   outline: #fc2e06 auto 5px;
  // }
  .menu-toggle {
    display: initial;
    padding: .5em 1em;
  }
  #nav {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap; 
  }
}
</style>
