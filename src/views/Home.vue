<template>
  <div id="app">
      <ul>
        <li v-for="c in comps" :key="c.id">
          <router-link :to="c.id">{{c.label}}</router-link>
        </li>
      </ul>
      <component v-if="comp"
        :is="comp.label"></component>
  </div>
</template>

<script>

import list from '@/components/_globals'

export default {
  computed: {
    id(){
      return this.$route.params.id
    },
    comps(){
      return list
    },
    comp(){
      return this.id ? this.getComp(this.id) : null
    }
  },
  methods:{
    getComp(id){
      let ob = null
      this.comps.forEach(d => {
        if (d.id === id) ob = d
      })
      return ob
    }
  }
}
</script>
