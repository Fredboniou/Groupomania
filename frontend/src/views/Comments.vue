<template>
    <div class="comments">
        <CommentsComponents ComMsg="Commentaires"/>
    </div>
</template>



<script>
import CommentsComponents from "@/components/CommentsComponents.vue";

export default {
    name: "Comments",
    components: {
        CommentsComponents,
    },
}
</script>



<style lang="scss" scoped>

</style>