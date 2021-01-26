<template>
  <div class="grid grid-cols-2">
    <div class="col-span-1">

      <h2 class="text-5xl	text-center	text-purple-700 font-bold">${{ contador }}</h2>

      <div v-for="donation of donations" v-bind:key="donation.id" class="ml-5 mt-5 w-3/4 px-2 py-2 bg-gray-100 rounded-md shadow-md">
       <div class="grid grid-cols-2">
         <div class="col-span-1">
          <p class="font-bold">{{donation.headline}}</p>
         </div>
         <div class="col-span-1">
          <p class="text-right text-purple-600 font-bold	">$ {{donation.amount}}</p>
         </div>
       </div>
      
       <small>{{donation.message}}</small> 
        
      </div>

    </div>
    <div class="col-span-1 ">

      <h1 class="text-4xl	my-2 mx-2 font-bold">Donar</h1>
      <button @click="asignarsaldo(50);apareceOtro(false)" class="px-4 py-4 font-bold bg-gray-300 w-32 inline-block mx-2 my-2 rounded-lg	">50 MXN</button>
      <button @click="asignarsaldo(100);apareceOtro(false)" class="px-4 py-4 font-bold  bg-gray-300 w-32 inline-block mx-2 my-2 rounded-lg	">100 MXN</button>
      <button @click="asignarsaldo(500);apareceOtro(false)" class="px-4 py-4 font-bold  bg-gray-300 w-32 inline-block mx-2 my-2 rounded-lg	">500 MXN</button>
      <button @click="apareceOtro(true)" class="px-4 py-4 font-bold  bg-gray-300 w-32 inline-block mx-2 my-2 rounded-lg	">Otro</button>

    <input type="text" v-if="btnOtro" class="w-3/4 border-black bg-gray-200 rounded-lg	mt-3 ml-3 p-2" placeholder="Ingresa otra cantidad" >
    <textarea v-model="mensaje" class="w-3/4 border-black bg-gray-200 rounded-lg	mt-3 ml-3 p-2" placeholder="Agrega un mensaje" name="" id="" cols="20" rows="5"></textarea>
    <button @click="donar()" class="block mx-3 bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded text-white font-normal">Donar</button>
  </div>
  
  </div>
</template>


<script>

export default{
  name: 'Donations',
  data(){
    return {
      donations: [],
      contador: 1000,
      btnOtro: false,
      saldo: 0,
      mensaje: '',
      url: 'http://localhost:3000/donations'
    }
  },
  created(){
    this.getDonations();
    },
  methods:{

    async getDonations(){
        
        const response = await fetch(this.url);
        const data = await response.json()
        this.donations = data.donations;
        this.contador = data.total_amount[0].total_amount;
    },
    apareceOtro(estatus){
      this.btnOtro = !this.btnOtro;
      if(!estatus){
        this.btnOtro = false
      }
    },
    asignarsaldo(cantidad){
      this.saldo = cantidad;
    },
    donar(){
      this.addDonation();


      },
    addDonation(){
      const req = {
        "headline": "Luis Rojas",
        "amount": this.saldo,
        "message": this.mensaje
      }

            fetch(this.url,{
                method: 'POST',
                body: JSON.stringify(req),
                headers: {
                    'Accept':'application/json',
                    'Content-type':'application/json'
                }
            })
            .then(res => {
              res.json();
              })
            .then(data => {
              this.getDonations();
            })
           
         }
   
  }
}


</script>