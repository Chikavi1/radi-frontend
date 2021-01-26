<template>
  <div class="pets  " >


<div class="sm:flex">
  <section class="hidden lg:block bg-gray-800 text-gray-100 p-4 h-screen flex-shrink-0 w-2/12" id="left-side-panel">
  <footer class="fixed left-0 bottom-0 w-2/12 bg-gray-700 hover:bg-gray-500 text-center py-3"
  >Actualizar</footer>
  </section>
  <div class=" flex-grow " id="main-content">
    <div class="">
      
        <div class="overflow-x-hidden sm:max-h-screen">
            <h1 class="font-semibold text-3xl text-left mx-4"><router-link to="/mascotas/create"> Adopta a una mascota</router-link>.</h1>
            <div class="mt-10 mb-10 sm:flex sm:-mx-2 sm:overflow-x-auto px-4 ">
                <div class="mb-10  sm:max-w-xs sm:w-full  mt-6 sm:flex-shrink-0  sm:px-2"  v-for="pet of pets" v-bind:key="pet.id">
                    <div v-if="pet.photo != null ">
                        <div class="relative pb-5/6">
                            <img class="w-full object-cover rounded-lg shadow-md h-64" v-bind:src="pet.photo" alt="">
                        </div>
                            
                        <div class="relative px-2 -mt-16 ">
                            <div class="bg-white h-40 rounded-lg px-4 py-4 shadow-lg">
                                <div class="flex">
                                    <span v-if="pet.estatus == 2" class="inline-block py-1 px-2 leading-none bg-green-200 text-green-800 rounded-full  font-medium uppercase tracking-wide text-xs">
                                    Adopción
                                        </span>
                                    <div class="ml-2 text-xs text-gray-600 font-semibold uppercase tracking-wide">
                                        <span v-if="pet.color">{{ pet.color }}</span>
                                    
                                        <span v-if="pet.age"> &middot; {{ pet.age }} años </span>
                                    </div>
                                </div>
                                <h4 class="mt-1 text-gray-900  font-semibold text-lg capitalize"> {{ pet.name }}</h4>
                                <div class="mt-1 text-left " style="height:3em;overflow: hidden;" >
                                    <span class="text-gray-500 text-left">{{ pet.description }}</span>
                                </div>
                                <div class="mt-2 flex items-center text-sm text-gray-400">
                                    {{ pet.city }}
                                </div>
                            </div>
                        </div>
                 </div>
                </div>


                <infinite-loading spinner="waveDots"  @infinite="getPets">
                    <div slot="no-more" class="my-5 sm:max-w-xs w-full  mt-6 sm:flex-shrink-0   sm:px-2" >
                        <div class="relative ">
                          <div class="p-8 sm:max-w-xs xl:w-64  object-cover rounded-lg shadow-md h-64 text-center ">
                            <p class="text-center mt-10  font-semibold text-xl">No hay más perros, 
                                <a class="text-purple-500 font-semibold 	"  target="_blank" href="https://www.facebook.com"> invita</a> a más personas para tener más mascotas.
                            </p>
                            </div>
                        </div>
                     </div>
                </infinite-loading>

            </div>  


             <div class="mt-10 mb-10 sm:flex sm:-mx-2 sm:overflow-x-auto px-4 ">
                <div class="mb-10  sm:max-w-xs sm:w-full  mt-6 sm:flex-shrink-0  sm:px-2"  v-for="pet of pets" v-bind:key="pet.id">
                    <div >
                        <div class="relative pb-5/6">
                            <img class="w-full object-cover rounded-lg shadow-md h-64" v-bind:src="pet.photo" alt="">
                        </div>
                            
                        <div class="relative px-2 -mt-16 ">
                            <div class="bg-white h-40 rounded-lg px-4 py-4 shadow-lg">
                                <div class="flex">
                                    <span v-if="pet.estatus == 2" class="inline-block py-1 px-2 leading-none bg-green-200 text-green-800 rounded-full  font-medium uppercase tracking-wide text-xs">
                                    Adopción
                                        </span>
                                    <div class="ml-2 text-xs text-gray-600 font-semibold uppercase tracking-wide">
                                        <span v-if="pet.color">{{ pet.color }}</span>
                                    
                                        <span v-if="pet.age"> &middot; {{ pet.age }} años </span>
                                    </div>
                                </div>
                                <h4 class="mt-1 text-gray-900  font-semibold text-lg capitalize"> {{ pet.name }}</h4>
                                <div class="mt-1 text-left " style="height:3em;overflow: hidden;" >
                                    <span class="text-gray-500 text-left">{{ pet.description }}</span>
                                </div>
                                <div class="mt-2 flex items-center text-sm text-gray-400">
                                    {{ pet.city }}
                                </div>
                            </div>
                        </div>
                 </div>
                </div>


               

            </div>  



        </div>
    </div>
  </div>
</div>



  

 </div>
</template>

<script>
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'Pets',
  components: {
          InfiniteLoading,
  },

    data(){
        return{
            page:1,
            pets: []
        }
    },
    created(){
        this.getPets();
    },

    methods: {
         getPets($state){
           axios.get('http://localhost:3000/pets?page='+this.page).then(response => {
               console.log(response.data.products)
             if(response.data.products.length){
                 this.page += 1;
                 this.pets.push(...response.data.products);
                 $state.loaded();
             } else{
                 $state.complete();
             }
           })
        },
    }
  }

</script>

