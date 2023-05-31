<script>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Button from '../components/Button.vue'
import { mapActions, mapState } from 'pinia'
import { useallInOneStore } from '../stores/allInOne'

export default {
  name: 'TransactionView',
  components: {
    NavBar,
    Footer,
    Button
  },
  computed: {
    ...mapState(useallInOneStore, ['motorcycles', 'services', 'isReady'])
  },
  methods: {
    ...mapActions(useallInOneStore, [
      'fetchAllMotorcycle',
      'availableCheck',
      'fetchServicesByMotor',
      'handleTrasaction',
      'coba'
    ]),
    renderMotors() {
      this.fetchAllMotorcycle(this.maker, this.model)
    },
    check() {
      this.availableCheck(this.modelCust)
    },
    fetchServices() {
      this.fetchServicesByMotor(this.modelCust)
    },
    trx() {
      this.handleTrasaction(this.service, this.additional, this.modelCust)
    }
  },
  data() {
    return {
      maker: null,
      model: null,
      modelCust: '',
      service: '',
      additional: '',
      total: 0
    }
  },
  watch: {
    isReady(value) {
      //   console.log(`ini di watch ${value}`)
      if (value) {
        this.fetchServices()
      }
    }
  },
  created() {
    // this.coba()
  }
}
</script>
<template>
  <NavBar />
  <section class="flex flex-row max-w-screen-lg mx-auto px-4 mt-24">
    <section class="w-1/2 flex flex-col border-r">
      <h1 class="text-xl">Check Your Motorcycle</h1>
      <section class="mt-6 flex flex-col gap-4">
        <form @submit.prevent="renderMotors">
          <div class="flex flex-col">
            <label for="maker">Maker:</label>
            <input
              v-model="maker"
              name="maker"
              id="maker"
              type="text"
              placeholder="ex: Honda"
              class="input input-bordered w-full max-w-xs"
            />
            <label class="mt-2" for="maker">Model:</label>
            <input
              v-model="model"
              name="model"
              id="model"
              type="text"
              placeholder="ex: Beat"
              class="input input-bordered w-full max-w-xs"
            />
            <Button btn-type="submit" btn-text="Refresh Detail" class="mt-2 max-w-fit" />
          </div>
        </form>
        <form @submit.prevent="check">
          <div class="flex flex-col">
            <label for="model">Motor Detail:</label>
            <select
              v-model="modelCust"
              name="model"
              id="model"
              class="select select-bordered w-full max-w-xs"
            >
              <option v-for="(motorcycle, index) in motorcycles" :key="index">
                {{ motorcycle.model }}
              </option>
            </select>
          </div>
          <Button
            btn-type="submit"
            btn-text="Check here"
            class="max-w-fit h-10 mt-2"
            theme="secondary"
          />
        </form>
      </section>
    </section>
    <section class="w-1/2 ml-8">
      <h1 class="text-xl">Fix Your Order</h1>
      <section class="mt-6 flex flex-col gap-4">
        <form @submit.prevent="trx">
          <div class="flex flex-col">
            <label for="motorcycle">Choose your service:</label>
            <select v-model="service" class="select select-bordered w-full max-w-xs">
              <option v-for="(serv, index) in services" :key="serv.id" :value="serv.Service.id">
                {{ serv.Service.title }}
              </option>
            </select>
            <div class="form-control max-w-fit mt-2">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  v-model="additional"
                  value="Onsite"
                  name="radio-10"
                  class="radio checked:bg-red-500"
                  checked
                />
                <span class="label-text ml-4">Onsite</span>
              </label>
            </div>
            <div class="form-control max-w-fit">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  v-model="additional"
                  value="Towing"
                  name="radio-10"
                  class="radio checked:bg-blue-500"
                  checked
                />
                <span class="label-text ml-4">Towing or Home Visit</span>
              </label>
            </div>
          </div>

          <Button
            btn-type="submit"
            btn-text="Book an order"
            class="max-w-fit h-10 mt-2"
            theme="secondary"
          />
        </form>
      </section>
    </section>
  </section>
  <Footer />
</template>
<style></style>
