<template>
  <div id="app">
    <div >
        <header class="header my-8">
            <!-- container -->
            <div class="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
                <!-- header wrapper -->
                    <div class="header-wrapper flex items-center justify-between">

                        <!-- header logo -->
                        <div class="header-logo">
                            <h1 class="font-semibold text-black leading-relaxed text-lg">
                              <router-link to="/">Radi</router-link>
                              </h1>
                        </div>

                        <!-- mobile toggle -->
                        <div class="toggle md:hidden">
                            <button @click=" isOpen = true" @keydown.escape=" isOpen = false">
                                <svg
                                    class="h-6 w-6 fill-current text-black"
                                    fill="none" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="2"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Navbar -->
                        <navbar class="navbar hidden md:block">
                            <ul class="flex space-x-8 text-sm font-semibold">
                                <router-link to="/about">Acerca de</router-link> 
                                <li> <router-link to="/Patrocinadores">Patrocinadores</router-link> </li>
                                <li><router-link class="cta bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded text-white font-normal" to="/mascotas">Adopta</router-link></li>
                            </ul>
                        </navbar>
                    </div>
            </div>
        </header>
    </div>


    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
