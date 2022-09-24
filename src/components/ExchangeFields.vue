<template>
  <div>
    <div class="title d-flex align-center justify-start py-5">
      По курсу www.exchangerate-api.com на сегодня:
    </div>
    <div class="flex">
      <div class="field-block">
        <v-text-field
            v-mask="timeRangeMask"
            class="text-field"
            outlined
            v-model="valueFrom"
        ></v-text-field>
        <v-select
            class="select"
            outlined
            :items="getNormalizeCountries"
            v-model="fromCurrency"
            @change="setRateCurrency"
        >
          <template v-slot:item="{item}">
              <div :class="['currency-flag-' + item.toLowerCase()]" class="currency-flag"></div>
              <span
                  class="pl-3"
              >
              {{ item }}
            </span>
          </template>
          <template v-slot:selection="{item}">
            <div class="item-flag">
            <span
                class="text-sm-body-2 pl-3 text-country"
            >
              {{ item }}
            </span>
            <div :class="['currency-flag-' + item.toLowerCase()]" class="currency-flag ml-2"></div>
            </div>
          </template>

        </v-select>
      </div>
      <v-icon
          large
          class="pb-7 px-2 icon"
      >
        mdi-swap-horizontal
      </v-icon>
      <div class="field-block">
        <v-text-field
            class="text-field"
            outlined
            readonly
            :value="value"
        ></v-text-field>
        <v-select
            class="select"
            outlined
            :items="getNormalizeCountries"
            v-model="toCurrency"
            @change="setRateCurrency"
        >
          <template v-slot:item="{item}">
            <div :class="['currency-flag-' + item.toLowerCase()]" class="currency-flag"></div>
            <span
                class="pl-3"
            >
              {{ item }}
            </span>
          </template>
          <template v-slot:selection="{item}">
            <div class="item-flag">
            <span
                class="text-sm-body-2 pl-3 text-country"
            >
              {{ item }}
            </span>
              <div :class="['currency-flag-' + item.toLowerCase()]" class="currency-flag ml-2"></div>
            </div>
          </template>
        </v-select>
      </div>
    </div>
    <history-exchanges
        v-if="rate"
        :pairsToRemember="pairsToRemember"
    >
    </history-exchanges>
  </div>
</template>

<script>

import axios from "axios";
import HistoryExchanges from "@/components/HistoryExchanges";

export default {
  name: "ExchangeFields",
  components: {HistoryExchanges},
  props: {
    countriesAll: Object,
    defaultCurrency: String,
    selectedRate: String,
    defaultRate: Number
  },
  data: () => ({
    pairsToRemember: [],
    rate: null,
    valueFrom: 1,
    valueTo: null,
    fromCurrency: 'USD',
    toCurrency: 'USD',
    countries: [],
  }),
  mounted() {
    this.getArray()
    this.rate = this.defaultRate
    this.$nextTick(() => {
      this.toCurrency = this.defaultCurrency
      if(this.defaultCurrency === 'USD'){
        this.fromCurrency = 'EUR'
      }
    })
  },
  computed: {
    getNormalizeCountries() {
      return this.countries.map(item => item.substring(0, 3)).filter(item => item)
    },
    value(){
      if(this.rate){
        return  (this.valueFrom * this.rate).toFixed(3)
      }
        return (this.valueFrom * this.defaultRate).toFixed(3)
    }
  },
  watch:{
    selectedRate(){
      this.fromCurrency = this.selectedRate
      this.setRateCurrency()
    }
  },
  methods: {
    rememberPair(){
      const pair={
        fromCurrency:this.fromCurrency,
        toCurrency:this.toCurrency,
        rate:this.rate,
        id:Math.floor(Math.random() * 980) + 2
      }
      this.pairsToRemember.unshift(pair)
      // localStorage.setItem("pairs", this.pairsToRemember);
    },
    timeRangeMask(value) {
      const numbers = value.replace(/[^0-9.]/g, '');
      return [(numbers)];
    },
    async setRateCurrency(){
      await axios.get(`https://v6.exchangerate-api.com/v6/8084f569e17e097a3e305091/latest/${this.fromCurrency}`)
          .then(responce => {
            this.rate = responce.data.conversion_rates[this.toCurrency].toFixed(3)
            this.rememberPair()
          }).catch(error => {
            console.log(error)
          })
    },
    getArray() {
      this.countries = Object.values(this.countriesAll).map(item => item.currency)
    }
  }
}
</script>

<style scoped>
@import 'currency-flags/dist/currency-flags.css';

.icon {
  transform: rotate(0deg)
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-flag{
  display: flex;
  align-items: center;
  justify-content: center;
}
.select {
  width: 20% !important;
  max-width: 140px !important;
  min-width: 100px !important;
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.field-block {
  width: 100%;
  display: flex;
}

.text-field {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-top-left-radius: 5px !important;
  border-bottom-left-radius: 5px !important;
}

@media (min-device-width: 700px) and (max-device-width: 1265px) {
  .item-flag{
    flex-direction: column;
    justify-content: center;
  }
}

@media (max-device-width: 700px) {
  .flex {
    flex-direction: column;
    justify-content: center;
  }
  .item-flag {
    flex-direction: column;
    justify-content: center;
  }

  .icon {
    transform: rotate(90deg);
    padding: 0 !important;
    padding-right: 25px !important;
  }
}
</style>