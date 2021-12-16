<template>
    <div class="createPost">
        <NewPostComponents NewPostMsg="Créez votre publication"/>
    </div>
</template>



<script>
import NewPostComponents from "@/components/NewPostComponents.vue";

export default {
    name: "NewPost",
    components: {
        NewPostComponents,
    },
}
</script>



<style lang="scss" scoped>

</style>