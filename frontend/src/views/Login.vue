<template>
    <div class="log">
        <div id="nav">
            Retourner à la page d'<router-link to="/" aria-label="Retourner à la page d'accueil">accueil</router-link>
        </div>
        <div class="connect">
            <LoginComponents loginMsg="Identifiez-vous" />
        </div>
    </div>
</template>

<script>
import LoginComponents from "@/components/LoginComponents.vue"

export default {
    name: "Login",
    components: {
        LoginComponents
    }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #000;

  &:hover {
    color: #fc2e06;
  }
}
</style>
