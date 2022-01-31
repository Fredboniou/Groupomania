<template>
    <div class="msg">
        <h3>{{ msg }}</h3>
      </div>
</template>



<script>
export default {
   name: "MsgComponents",
   props: {
       msg: String
   } 
}
</script>



<style lang="scss" scoped>
.msg {
    margin-top: 20px;
    margin-bottom: 20px;
}
@media all and (max-width : 536px) {
    .msg {
        width: 100%;
    }
}
</style>