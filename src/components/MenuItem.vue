<template>
    <router-link 
        :to="redirectTo"
        :class="[
            'px-6 py-3 text-tasks-pink-500 dark:text-tasks-pink-400 font-medium ',
            'font-medium rounded-lg border border-transparent transition-all duration-200 ',
            'hover:bg-tasks-pink-500 dark:hover:bg-tasks-pink-600 hover:text-white',
            'hover:no-underline hover:border-tasks-pink-500 dark:hover:border-tasks-pink-400'
        ]"
    >
        {{ label }}
    </router-link>
</template>
<script>
export default {
    name: 'MenuItem',
    props: {
        redirectTo: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped>
@reference "../style.css";
.router-link-active {
   @apply bg-tasks-pink-500 dark:bg-tasks-pink-600 text-white border-tasks-pink-500 dark:border-tasks-pink-400;
}
</style>