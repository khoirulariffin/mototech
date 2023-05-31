<script>
import Button from './Button.vue'

export default {
  name: 'Footer',
  components: {
    Button
  }
}
</script>
<template>
  <section class="max-w-screen-lg mx-auto flex flex-col mt-16 gap-5 pl-2">
    <section>
      <span class="text-2xl">Workshop</span>
      <hr class="w-32 mt-1" />
    </section>
    <section class="flex flex-row w-full">
      <section class="w-3/5">
        <iframe
          class="w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1210794731264!2d107.00354737370449!3d-6.247771693740616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c2a0f7257f1%3A0x607dc673b4a4ebf2!2sGg.%20Gabus%2C%20RW.006%2C%20Margahayu%2C%20Kec.%20Bekasi%20Tim.%2C%20Kota%20Bks%2C%20Jawa%20Barat%2017113!5e0!3m2!1sid!2sid!4v1683711807143!5m2!1sid!2sid"
          width="600"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
      <section class="w-2/5 min-h-full flex justify-center items-center">
        <section class="flex flex-col pl-10 gap-4">
          <section>
            <p class="text-sm text-justify">
              Jl. Dewi Sartika RT001/006 No.17 Margahayu, Bekasi Timur. Jawa Barat, Indonesia. 17113
            </p>
          </section>
          <section>
            <p class="mb-2 font-semibold">Having Trouble?</p>
            <img class="h-52" src="../assets/arrow-right.png" alt="" />
          </section>
        </section>
      </section>
    </section>
  </section>
  <section class="mt-32 h-20 bg-slate-300 flex justify-center items-center">
    <p class="text-sm">Copyright 2023 | Khoirul Ariffin</p>
  </section>
</template>
<style></style>
