<template>
    <div class="notfound">
        <p aria-label="Page introuvable">{{ errorMsg }}</p>
    </div>
</template>

<script>
export default  {
    name: "NotFoundComponents",
    props: {
        errorMsg: String
    }
}

</script>

<style lang="scss" scoped>
p {
    font-size: 3rem;
    font-weight: bold;
}
</style>