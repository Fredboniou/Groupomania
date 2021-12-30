<template>
    <div class="sign">
        <div id="nav">
            Retourner à la page d'<router-link to="/">accueil</router-link>
        </div>
        <div class="subscribe">
            <SignupComponents signupMsg="Inscrivez-vous" />
        </div>
    </div>
</template>

<script>
import SignupComponents from "@/components/SignupComponents.vue"
export default {
    name: "Signup",
    components: {
        SignupComponents
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
