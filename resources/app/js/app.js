/* Import and Use Libraries */

//window.Vue = require('vue');
import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import router from './routes';


Vue.use(VueAxios, axios);



/*
/* Components */
import App from './components/App.vue'


//------------------
/*  Init   */
//------------------

// spa

const spa = new Vue({
    mounted: function () {
        console.log("Vue SPA Is Ready ...!");
    },
    router,
    render: h => h(App),
}).$mount("#app");


//console.log('laravel mix work done !');
