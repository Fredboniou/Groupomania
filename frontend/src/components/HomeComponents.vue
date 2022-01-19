<template>
  <div class="hello">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomeComponents',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  font-size: 3rem;
  font-weight: bold;
}

@media all and (max-width : 1024px) {
  p {
    font-size: 2rem;
  }
}

@media all and (max-width: 768px) {
  p {
    font-size: 1rem;
  }
}
// @media all and (max-width: 400px) {
//   p {
//     font-size: 0.7rem;
//   }
// }
</style>
