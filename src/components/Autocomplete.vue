<template>
  <div>
      <input 
      class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
      type="text"
      placeholder="Ingresa"
      v-model="seleccion" 
      @input="change"
      @keydown.down="down"
      @keydown.up="up"
      @keydown.enter="enter"
      
      >

      <ul class="dropdown-menu " v-if="mostrar">

        <li  class="py-2 px-2" @click="click(index)"
            :class="{ 'active': isActive(index) || encima }" 
            v-for="(item, index) in resultados.slice(0,7)" 
            :key="index">
            
            <p class="text-left text-indigo-500 font-semibold" > {{ item }} </p>
      
            </li>
      </ul>

  </div>
</template>

<script>
export default {
   name: 'Autocomplete',  
  props: ['items'],
  data() {
    return {
      encima: false,
      actual: 0,
      mostrar: false,
      seleccion: ""
    }
  },
  computed: {
    resultados() {
        return this.items.filter(elem => {
            return elem.toLowerCase().includes(this.seleccion.toLowerCase());
        });
        
    }
  },
  methods: {
    isActive(index) {
      return index == this.actual;
    },
    down() {
      if(this.actual < this.resultados.length) {
        this.actual++;
      }
    },
    up() {
      if(this.actual > 0) {
        this.actual--;
      }
    },
    enter() {
      this.$emit('selecionado', this.resultados[this.actual]);
      // Cerramos el area de selección
      this.seleccion = this.resultados[this.actual]
      this.mostrar = false;
    },
    click(index) {
      this.$emit('selecionado', this.resultados[index]);
      // Cerramos el area de selección
      this.seleccion = this.resultados[index];
      this.mostrar = false;
      
    },
    change() {
      if(!this.mostrar) {
        this.mostrar = true;
      }
    },
   
  }
}
</script>

<style>
  
  .dropdown-menu .active {
    background: #e3e4e5;
    z-index: 100;
  }
  .dropdown-menu li:hover, .dropdown-menu li:focus {
    background: #e3e4e5;
}
</style>