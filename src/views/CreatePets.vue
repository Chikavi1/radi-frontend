<template>
  <div class="createpets px-10" >

    <!-- <div class="file-upload">

      <input type="file" @change="onFileChange" />
      <button @click="onUploadFile" class="upload-button"
      :disabled="!this.selectedFile">Upload file</button>
    </div> -->

    <div class="grid sm:grid-cols-2">


      <div class="col-span-1">
        <!-- <form action="" @submit.prevent="addPet"> -->
        <form action="" @submit.prevent="">
          
          <div>
              <div class="sm:grid-cols-2 grid gap-3">
                <div class="col-span-1">
              <label class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
              <input type="text" v-model="pets.name" placeholder="Ingresa el nombre" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"  >
                </div>
                <div class="col-span-1">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Foto</label>
                  <input type="file" accept="image/x-png,image/gif,image/jpeg" @change="handleSelects" placeholder="Ingresa el url photo" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"  >

                </div>
              </div>
          </div>

            <div class="mt-4">
              <div class="grid-cols-2 grid gap-3">
                <div class="col-span-1">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Color</label>
                  <input type="text" v-model="pets.color" placeholder="Ingresa el color" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"  >
                </div>
                <div class="col-span-1">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                  <select v-model="pets.estatus"  name="cargo" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none">
                        <option value="1">Adoptado</option>
                        <option value="2">En adopción</option>
                  </select>
                </div>
              </div>
          </div>
          <div class="mt-4">
            <div class="grid grid-cols-3 gap-3">
              <div class="col-span-1">
                <label class="block text-gray-700 text-sm font-bold mb-2">Mascota</label>
                <select v-model="pets.categoria" required  name="cargo" class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none">
                  <option value="1" selected>Perro</option>
                  <option value="2">Gato</option>
                </select>
              </div>
              <div class="col-span-2">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Raza Perro</label>
                    <autocomplete :items="raza_perros"  @selecionado="mostrarRaza"></autocomplete>
              </div>
            </div>
          </div>
          <!-- <div class="mt-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Raza Gato</label>
                  <autocomplete :items="raza_gatos"  @selecionado="mostrarSeleccionado"></autocomplete>
          </div> -->
          <div class="mt-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Ciudad</label>
                  <autocomplete :items="nombres"  @selecionado="mostrarCiudad"></autocomplete>
          </div>
            <div class="mt-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                  <textarea v-model="pets.description"  class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" placeholder="Ingresa descripción"></textarea>
          </div>
          <button  class="w-full bg-gray-500 text-white py-2 " >Enviar</button>
        </form>
      </div>

      <div class="col-span-1">

          <div class="mb-10 m-auto  sm:max-w-xs sm:w-full  mt-6 sm:flex-shrink-0 sm:px-2">
                <div class="relative pb-5/6">
                        <img class="w-full object-cover rounded-lg shadow-md h-64" :src="images.length === 0?'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60':images" alt="">
                </div>
                
                <div class="relative px-2 -mt-16 ">
                        <div class="bg-white h-40 rounded-lg px-4 py-4 shadow-lg">
                        <div class="grid grid-cols-1">
                          <div class="col-span-1">
  <span v-if="this.pets.estatus == 2" class=" float-left  inline-block py-1 px-1  bg-green-200 text-green-800 rounded-full  font-medium uppercase tracking-wide text-xs">
                               Adopción
                            </span>
                            <div class=" ml-2 text-xs text-gray-600 font-semibold uppercase tracking-wide">
                                <span v-if="this.pets.raza " class="text-xs text-gray-400">  {{ this.pets.raza }}</span>
                            </div>
                          </div>
                          
                        </div>

                        <div class="">

                        <h4 class="text-gray-900 m-auto text-center  font-semibold text-lg capitalize"> {{ this.pets.name }}</h4>
                        <div class="mt-1 text-left " style="height:3em;overflow: hidden;" >
                            <span class="text-gray-500 text-left">{{ this.pets.description }}</span>
                        </div>
                        <div class="mt-2 flex  text-sm text-gray-400">
                         {{ this.pets.color }} &middot; {{ this.pets.city }}
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
import Autocomplete from '../components/Autocomplete';
import axios from "axios";


class Pets{
  constructor(name,photo,age,raza,city,color,description,vacuums_id,user_id,verified,estatus)
  {
     this.name = name;
     this.photo = photo;
     this.age = age;
     this.raza = raza;
     this.city = city;
     this.color = color;
     this.description = description;
     this.vacuums_id = vacuums_id;
     this.user_id = 1;
     this.verified = 1;
     this.estatus = 1;

  }
}

  import ciudades from "./../assets/json/ciudades.json";
  import raza_perros from "./../assets/json/raza_perros.json";
  import raza_gatos from "./../assets/json/raza_gatos.json";

export default {


name: 'CreatePets',
  components: {    Autocomplete
},

    data(){
        return{
            pets: new Pets(),
            valor: '',
            nombres: ciudades,
            raza_perros: raza_perros,
            raza_gatos: raza_gatos,

            images:[],
            selectedFile: "",
        }
    },
    created(){
        
    },
    methods: {
        mostrarRaza(nombre) {
          this.pets.raza = nombre;
        },
        mostrarCiudad(nombre) {
          this.pets.city = nombre;
        },
       addPet(){
         console.log(this.pets);
            fetch('http://localhost:3000/mascotas',{
                method: 'POST',
                body: JSON.stringify(this.pets),
                headers: {
                    'Accept':'application/json',
                    'Content-type':'application/json'
                }
            })
            .then(res => {
              res.json();
              // this.onUploadFile()
              })
            .then(data => {
               console.log(data);
            })
           
           this.pets = new Pets();
        },
        

        onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },

     onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);  // appending file
      console.log(this.pets.name);
      axios
        .post("http://localhost:3000/mascotas/upload", formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSelects(e) {
      this.images = [];
      let fileList = Array.prototype.slice.call(e.target.files);
      fileList.forEach(f => {

        if(!f.type.match("image.*")) {
          return;
        }

        let reader = new FileReader();
        let that = this;

        reader.onload = function (e) {
          that.images.push(e.target.result);
        }
        reader.readAsDataURL(f); 
      });
    }


    }
  }

</script>
