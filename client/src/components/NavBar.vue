<script>
import { mapState, mapWritableState } from 'pinia'
import Button from './Button.vue'
import { useallInOneStore } from '../stores/allInOne'
import Swal from 'sweetalert2'

export default {
  name: 'NavBar',
  components: {
    Button
  },
  computed: {
    ...mapWritableState(useallInOneStore, ['isLogin'])
  },
  methods: {
    logout() {
      Swal.fire({
        title: 'Wanna sign out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()
          Swal.fire('Success!', 'You are logged out.', 'success')
          this.isLogin = false
          this.$router.push('/')
        }
      })
    }
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.isLogin = true
    }
  }
}
</script>
<template>
  <section class="flex flex-col">
    <section
      class="max-w-screen-lg w-full flex flex-col lg:flex-row justify-between mx-auto h-16 items-center px-4 mt-4"
    >
      <section class="judul text-2xl font-bold">
        <router-link to="/"> MotoTech.</router-link>
      </section>
      <section class="text-nav flex flex-row gap-5 pt-4 lg:pt-0">
        <span> <router-link to="/">Home</router-link></span>
        <span>|</span>
        <span>Services</span>
        <span>|</span>
        <span> <router-link to="/profile">Profile</router-link></span>
      </section>
      <section v-if="!isLogin" class="text-nav flex flex-row gap-3 pt-4 lg:pt-4">
        <router-link to="/register"><Button theme="secondary" btn-text="Sign Up" /></router-link>
        <router-link to="/login"> <Button btn-text="Sign In" /></router-link>
      </section>
      <section v-else class="text-nav flex flex-row gap-3 pt-4 lg:pt-4">
        <Button @click.prevent="logout" btn-text="Sign Out" />
      </section>
    </section>
    <hr class="mt-20 lg:mt-2" />
  </section>
</template>
<style>
.judul {
  font-family: 'Montserrat', sans-serif;
}
.text-nav {
  font-family: 'Poppins', sans-serif;
}
</style>
