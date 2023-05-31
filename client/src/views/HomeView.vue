<script>
import Button from '../components/Button.vue'
import Footer from '../components/Footer.vue'
import Jumbotron from '../components/Jumbotron.vue'
import NavBar from '../components/NavBar.vue'
import Service from '../components/Service.vue'

export default {
  name: 'HomeView',
  components: {
    Button,
    NavBar,
    Jumbotron,
    Service,
    Footer
  }
}
</script>
<template>
  <NavBar />
  <Jumbotron />
  <Service />
  <section class="mt-24 bg-slate-200 h-[130px]">
    <section class="max-w-screen-lg mx-auto flex justify-center items-center h-full flex-col px-10">
      <p class="head text-lg tracking-wide text-justify">
        The technicians were knowledgeable, friendly, and efficient, and they took the time to
        explain everything to me in detail.
      </p>
      <section class="flex flex-row w-full mt-2">
        <p class="items-start justify-start font-semibold">-Ulyana Ramires</p>
      </section>
    </section>
  </section>
  <Footer />
</template>
<style>
.head {
  font-family: 'Montserrat', sans-serif;
}
</style>
