<template>
    <div class="error">
        <NotFoundComponents errorMsg="Error" />
        <img src="@/assets/NotFound.jpg" />
        <div class="return">
            Revenir à l'<router-link to="/">Accueil</router-link>
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

    &:hover {
        color: #fc2e06;
    }
}
</style>