<template>
  <div class="pb-3">
    <div class="d-flex align-center justify-center py-5">
      ПОПУЛЯРНЫЕ ВАЛЮТЫ
    </div>
    <div v-for="item in popularCurrencies" :key="item.currency"
         class="flex py-4 ma-2 back"
         @click="$emit('selectCurrency', item.currency.substring(0, 3))"
    >
      <div class="first-row">
        <div :class="['currency-flag-' + item.currency.substring(0, 3).toLowerCase()]" class="currency-flag ml-2"></div>
        <div class="code-country pl-2">
          {{item.currency.substring(0, 3)}}
        </div>
      </div>
      <div class="second-row">
        <div class="name-country pl-5 text-sm-body-2">
          {{item.name}}
        </div>
        <div class="native-country pl-5 text-sm-body-2">
          {{item.native}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopularExchanges",
  props: {
    popularCurrencies: Array,
  },
}
</script>

<style scoped>
@import 'currency-flags/dist/currency-flags.css';
.flex{
  display: flex;
  align-items: center;
  justify-content: start;
}
.back{
  background-color: #e1e1e1;
  border-radius: 10px;
  cursor: pointer;
}
.name-country{
  width: 80px;
}
.first-row{
  display: flex;
  align-items: center;
}
.second-row{
  display: flex;
}
@media (max-device-width: 1265px) {
  .first-row{
    flex-direction: column;
  }
  .second-row{
    flex-direction: column;
  }
}
@media (max-device-width: 700px) {
  .name-country{
    width: 120px;
  }
}
</style>