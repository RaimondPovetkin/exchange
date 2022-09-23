<template>
  <div>
    По курсу ЦБ на сегодня:
    <div class="flex">
      <div class="field-block">
        <v-text-field
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
  </div>

</template>

<script>

import axios from "axios";

export default {
  name: "ExchangeFields",
  props: {
    countriesAll: Object,
    defaultCurrency: String,
    defaultRate: Number
  },
  data: () => ({
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
    })
  },
  computed: {
    getNormalizeCountries() {
      return this.countries.map(item => item.substring(0, 3)).filter(item => item)
    },
    value(){
      if(this.rate){
        return this.valueFrom * this.rate
      }
        return this.valueFrom * this.defaultRate
    }
  },
  methods: {
    async setRateCurrency(){
      await axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${this.toCurrency}&from=${this.fromCurrency}&amount=1`, {
        params: {
          apikey: 'NGeUgFDVU38V1hvgSnMokm7ZMg8Go6F4'
        }
      })
          .then(responce => {
            this.rate = responce.data.result
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