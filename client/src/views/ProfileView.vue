<script>
import { mapActions, mapState } from 'pinia'
import Button from '../components/Button.vue'
import Footer from '../components/Footer.vue'
import NavBar from '../components/NavBar.vue'
import { useallInOneStore } from '../stores/allInOne'

export default {
  name: 'ProfileView',
  components: {
    NavBar,
    Footer,
    Button
  },
  methods: {
    ...mapActions(useallInOneStore, ['getDetailCust', 'handleUpdateCust']),
    updateCust() {
      this.handleUpdateCust(this.customer)
    }
  },
  computed: {
    ...mapState(useallInOneStore, ['detailCust'])
  },
  data() {
    return {
      customer: {
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        username: '',
        email: ''
      }
    }
  },
  watch: {
    detailCust(value) {
      // console.log(value)
      this.customer.firstname = value.Profile.firstname
      this.customer.lastname = value.Profile.lastname
      this.customer.address = value.Profile.address
      this.customer.city = value.Profile.city
      this.customer.username = value.username
      this.customer.email = value.email
    }
  },
  created() {
    this.getDetailCust()
  }
}
</script>
<template>
  <NavBar />
  <div class="bg-white rounded md:p-5 mb-6 max-w-screen-lg mx-auto px-10 mt-5">
    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
      <div class="lg:col-span-2">
        <form @submit.prevent="updateCust">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            <div class="md:col-span-5">
              <label for="first_name">First Name</label>
              <input
                v-model="customer.firstname"
                type="text"
                name="first_name"
                id="first_name"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div class="md:col-span-5">
              <label for="last_name">Last Name</label>
              <input
                v-model="customer.lastname"
                type="text"
                name="last_name"
                id="last_name"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              />
            </div>

            <div class="md:col-span-3">
              <label for="address">Address / Street</label>
              <input
                v-model="customer.address"
                type="text"
                name="address"
                id="address"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder=""
              />
            </div>

            <div class="md:col-span-2">
              <label for="city">City</label>
              <input
                v-model="customer.city"
                type="text"
                name="city"
                id="city"
                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder=""
              />
            </div>

            <div class="md:col-span-2 mt-10">
              <label for="username">Username</label>
              <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input
                  v-model="customer.username"
                  name="username"
                  id="username"
                  placeholder="username"
                  class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                />
              </div>
            </div>

            <div class="md:col-span-2 mt-10">
              <label for="email">Email</label>
              <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <input
                  v-model="customer.email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="khoi@mail.com"
                  class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                />
              </div>
            </div>

            <div class="md:col-span-1 mt-10">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder=""
              />
            </div>
          </div>
          <Button btn-type="submit" btn-text="Update Data" theme="secondary" class="mt-10 py-3" />
        </form>
      </div>
    </div>
  </div>
  <Footer />
</template>
<style></style>
