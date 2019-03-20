// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  data: {
    title: 'PokéAPI Ability Query',
    txtInput: '',
    info: null,
    resultList: [],
    resultAbilities: null
  },
  methods: {
    updateResult () {
      console.log('this worked!' + this.txtInput) 
      if (this.txtInput.length > 2) {
        for (var i = 0; i < this.info.length; i++) {
          if (this.info[i].name.includes(this.txtInput.toLowerCase())) {
            console.log('this works too')
            this.resultList.push(this.info[i])
          }
          // for (var j = 0; j < this.resultList.length; j++) {
          //   if (this.resultList[j].name.includes('t')) {
          //     this.resultList.splice(j, 1)
          //   }
          // }
        }
      }
    },
    onSubmit () {
      console.log(this.resultList)
      // axios
      //   .get(this.resultList[this.resultList.indexOf(this.txtInput)].url)
      //   .then(response => (this.resultAbilities = response.data.results))
    }
  },
  mounted () {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/')
      .then(response => (this.info = response.data.results))
  },
  template: `
    <div style="font-family: arial; margin: 50px; padding: 25px; border: 1px solid black;">
      <h1>{{title}}</h1>
      <form @submit.prevent="onSubmit" action="/action_page.php">
        Enter Pokemon Name: <br>
        <input v-on:input="updateResult(this.value)" v-model="txtInput" type="text" placeholder="Pikachu"><br>
        <input type="submit" value="Submit">
      </form>

      <div v-for="pokemon in resultList" :key="pokemon.name">
        <p @click="displayAbilities">{{ pokemon.name }}</p>
      </div>

      <div>
        {{resultAbilities}}
      </div>

    </div>
  `
})