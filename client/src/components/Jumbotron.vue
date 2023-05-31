<script>
import { mapActions, mapWritableState } from 'pinia'
import Button from './Button.vue'
import { useallInOneStore } from '../stores/allInOne'

export default {
  name: 'Jumbotron',
  components: {
    Button
  },
  computed: {
    ...mapWritableState(useallInOneStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useallInOneStore, ['CTA'])
  }
}
</script>
<template>
  <section class="h-[400px] max-w-screen-lg mx-auto pl-5 flex flex-row">
    <section class="w-3/5 flex flex-col justify-center gap-5">
      <section class="head text-5xl">Ride with confidence serviced with excellence.</section>
      <section class="head text-lg">
        Whether you're a seasoned biker or just starting out, <br />our expert technicians are here
        to help you <br />
        get the most out of your ride
      </section>
      <section>
        <Button @click.prevent="CTA" theme="secondary" btn-text="Book Now" />
      </section>
    </section>
    <section class="w-2/5 h-full flex items-center justify-center pt-16">
      <section class="w-[250px] h-[300px] border rounded ml-28">
        <img
          class="h-full object-cover -ml-10 -mt-8 rounded"
          src="https://www.westend61.de/images/0000828051pw/portrait-of-confident-female-mechanic-with-arms-crossed-leaning-on-car-at-workshop-FSIF02273.jpg"
          alt="hero banner"
        />
      </section>
    </section>
  </section>
</template>
<style>
.head {
  font-family: 'Montserrat', sans-serif;
}
</style>
