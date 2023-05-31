<script>
import { mapActions, mapState } from 'pinia'
import Button from './Button.vue'
import { useallInOneStore } from '../stores/allInOne'

export default {
  name: 'Service',
  components: {
    Button
  },
  methods: {
    ...mapActions(useallInOneStore, ['fetchAllServices'])
  },
  computed: {
    ...mapState(useallInOneStore, ['services_home'])
  },
  created() {
    this.fetchAllServices()
  }
}
</script>
<template>
  <section class="max-w-screen-lg mx-auto px-4 flex flex-col gap-5">
    <section>
      <span class="text-2xl">Services</span>
      <hr class="w-32 mt-1" />
    </section>
    <section class="flex flex-row justify-between">
      <section v-for="(serv, index) in services_home" :key="serv.id" class="h-[370px] w-[300px]">
        <img
          class="w-[300px] h-[200px] rounded object-cover"
          :src="serv.imageUrl"
          alt="oil change"
        />
        <div class="mt-2 flex flex-col gap-3">
          <h1 class="head text-xl">{{ serv.title }}</h1>
          <p class="head text-sm">
            {{ serv.description }}
          </p>
          <Button btn-text="More Info" />
        </div>
      </section>
    </section>
  </section>
</template>
<style>
.head {
  font-family: 'Poppins', sans-serif;
}
</style>
