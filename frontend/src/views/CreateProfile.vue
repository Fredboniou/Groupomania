<template>
    <div class="newProfile">
        <CreateProfileComponents CreateProfileMsg="Complétez votre profil (facultatif)"/>
    </div>
</template>



<script>
import CreateProfileComponents from "@/components/CreateProfileComponents.vue"

export default {
    name: "CreateProfile",
    components: {
        CreateProfileComponents,
    },
}
</script>



<style lang="scss" scoped>

</style>