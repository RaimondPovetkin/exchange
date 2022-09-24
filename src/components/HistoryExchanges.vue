<template>
<div>
  <div v-if="pairsToRemember.length" >
    Просматривали ранее:
  </div>
  <div class="grid">
    <div class="row my-5 mx-3" v-for="item in pairsToRemember" :key="item.id" >
      <div class="column mx-3">
        <div :class="['currency-flag-' + item.fromCurrency.toLowerCase()]" class="currency-flag mr-2"></div>
        <div>{{item.fromCurrency}}</div>
        <div class="ml-2">/</div>
        <div :class="['currency-flag-' + item.toCurrency.toLowerCase()]" class="currency-flag mx-2"></div>
        <div>{{item.toCurrency}}</div>
      </div>
      <div class="column mx-3">
        <div>1</div>
        <div class="ml-2">/</div>
        <div>{{item.rate}}</div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "HistoryExchanges",
  props: {
    pairsToRemember: Array,
  },
}
</script>

<style scoped>
.row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 50%;
  border: 1px solid #b7b7b7;
  border-radius: 5px;
}
.column{
  display: flex;
  align-items: center;
  justify-content: start;
}
.grid {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 300px);
}
.grid > * {
  height: 40px;
}
</style>