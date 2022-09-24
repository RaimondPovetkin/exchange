<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-if="screenWidth<700"
        v-model="leftDrawer"
        app
    >
      <v-container>
        <popular-exchanges
          :popularCurrencies="popularCurrenciesObj"
          @selectCurrency="selectRate($event)"
        ></popular-exchanges>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="white"
        flat
    >
      <div v-if="screenWidth<700">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon @click="leftDrawer = !leftDrawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Конвертер валют</v-toolbar-title>
        </div>
      </div>
      <v-container class="py-0 fill-height" v-else>
        <v-toolbar-title>Конвертер валют</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="text-caption">
          by <span><a href="https://raimondpovetkin.github.io/mysite/">Raimond Povetkin</a></span>
        </div>
      </v-container>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="3" v-if="screenWidth>700">
            <v-sheet rounded="lg">
              <popular-exchanges
                  :popularCurrencies="popularCurrenciesObj"
                  @selectCurrency="selectRate($event)"
              ></popular-exchanges>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
                rounded="lg"
            >
              <div class="mx-3 pa-2">
                <exchange-fields
                    :countriesAll="getCountriesArr()"
                    :defaultCurrency="defaultCurrency"
                    :defaultRate="defaultRate"
                    :selectedRate="selectedRate"
                ></exchange-fields>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import popularExchanges from "@/components/PopularExchanges";
import exchangeFields from "@/components/ExchangeFields";
import axios from "axios"
import countriesAll from "countries-list"

export default {
  name: "app",
  data: () => ({
    selectedRate: null,
    popularCurrenciesObj: [],
    popularCurrencies: ['US','CN','RU','DE','GB','CA'],
    leftDrawer: null,
    screenWidth: null,
    defaultCurrency: null,
    defaultRate: null
  }),
  components: {
    popularExchanges,
    exchangeFields
  },
  methods: {
    selectRate(event){
      this.selectedRate=event
      this.leftDrawer = false
    },
    getPopularCurrencies(){
      for(let i in this.popularCurrencies){
        this.popularCurrenciesObj.push(Object.entries(countriesAll.countries)
            .find(item => item[0] === this.popularCurrencies[i])[1])
      }
    },
    getCountriesArr() {
      return countriesAll.countries
    },
    getLocalCurrency() {
      const country = this.getAlpha2Country(window.navigator.language)
      this.defaultCurrency = countriesAll.countries[country]?.currency.substring(0, 3) || 'USD';
    },
    getAlpha2Country(str) {
      if (/[A-Z]/.test(str)) {
        return str.replace(/[^A-Z]+/g, "");
      }
      return str.toUpperCase();
    },
    async getDefaultRate() {

      await axios.get(`https://v6.exchangerate-api.com/v6/8084f569e17e097a3e305091/latest/USD`)
          .then(responce => {
            console.log(responce.data.conversion_rates[this.defaultCurrency])
            this.defaultRate = responce.data.conversion_rates[this.defaultCurrency]
          }).catch(error => {
            console.log(error)
          })



      // await axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${this.defaultCurrency}&from=USD&amount=1`, {
      //   params: {
      //     apikey: '5kL7cr26uBMKvYpeUvxxELLEvzknhEGS'
      //   }
      // })
      //   .then(responce => {
      //     this.defaultRate = responce.data.result
      //   }).catch(error => {
      //     console.log(error)
      //   })
    },
    onResize() {
      this.screenWidth = window.innerWidth
    },
  },
  mounted() {
    this.screenWidth = window.screen.width
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    this.getLocalCurrency()
    this.getDefaultRate()
    this.getPopularCurrencies()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>
<style>
</style>