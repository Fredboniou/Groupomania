<template>
    <div class="login">
        <h3>{{ loginMsg }}</h3>
        <form>
            
        </form>
    </div>
</template>

<script>
export default {
    name: "LoginComponents",
    props: {
        loginMsg: String
    }
}
</script>

<style lang="scss" scoped>
input {
    border: 1px;
    border-radius: 5px;
}
</style>
