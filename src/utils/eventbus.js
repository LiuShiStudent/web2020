import Vue from "vue"

// 广播对象
const EventBus = new Vue();
Object.defineProperties(Vue.prototype,{
    $bus:{
        get:function(){
            return EventBus
        }
    }
})