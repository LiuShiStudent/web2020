<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            isRouterAlive: true,
        };
    },
    components: {},
    provide() {
        return {
            reload: this.reload,
            demo:"haha"
        };
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(() => {
                this.isRouterAlive = true;
            });
        },
    },
};
</script>

<style>
</style>
