
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);


/* import components */
import SampleComponent from './components/SampleComponent.vue';

const routes = [
    {
        name: 'sample',
        path: '/spa/sample',
        component: SampleComponent
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router