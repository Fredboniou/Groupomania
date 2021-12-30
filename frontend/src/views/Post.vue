<template>
    <div class="allPosts">
        <PostComponents />
    </div>
</template>

<script>
import PostComponents from "@/components/PostComponents.vue";

export default {
    name: "Post",
    components: {
        PostComponents,
    },
}
</script>

<style lang="scss" scoped>

</style>