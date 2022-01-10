<template>
    <div class="error">
        <NotFoundComponents errorMsg="Error" />
        <img src="@/assets/NotFound.jpg" />
        <div class="return" aria-label="Revenir à l'accueil">
            Revenir à l'<router-link to="/">accueil</router-link>
        </div>
    </div>
</template>

<script>
import NotFoundComponents from "@/components/NotFoundComponents.vue"

export default {
    name: "NotFound",
    components: {
        NotFoundComponents
    }
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
    color: #fff;

    &:hover {
        color: #fc2e06;
    }
}
</style>