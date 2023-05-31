<script>
import { mapActions } from 'pinia'
import Button from '../components/Button.vue'
import { useallInOneStore } from '../stores/allInOne'

export default {
  name: 'RegisterView',
  components: {
    Button
  },
  data() {
    return {
      userLogin: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions(useallInOneStore, ['handleLogin']),
    login() {
      this.handleLogin(this.userLogin)
    }
  }
}
</script>
<template>
  <section class="login-form mx-auto h-screen flex">
    <div class="left w-3/12 h-screen">
      <img
        src="https://www.westend61.de/images/0000827147pw/portrait-of-confident-female-mechanic-with-arms-crossed-at-garage-FSIF01414.jpg"
        alt="bg-login"
        class="object-cover h-full"
      />
    </div>
    <div class="right w-3/4 h-screen bg-white rounded-t-3xl -ms-5 flex flex-col">
      <div class="flex justify-center pt-10">
        <h1 class="text-3xl">Sign In</h1>
      </div>
      <div class="flex justify-center py-5">
        <hr class="w-1/4 opacity-40" />
      </div>
      <div>
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="card flex-shrink-0 w-full max-w-xl shadow-xl bg-base-100">
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Username</span>
                  </label>
                  <input
                    v-model="userLogin.username"
                    type="text"
                    placeholder="username"
                    class="input input-bordered"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    v-model="userLogin.password"
                    type="password"
                    placeholder="password"
                    class="input input-bordered"
                  />
                  <label class="label">
                    <router-link to="/register" class="label-text-alt">
                      I don't have an account?
                      <span class="link link-hover text-blue-700 hover:text-blue-500">Sign up</span>
                    </router-link>
                  </label>
                </div>
                <div class="form-control mt-6">
                  <Button theme="secondary" any-class="py-2" btn-type="sumbit" btn-text="Sign In" />
                </div>
              </form>
              <router-link to="/">
                <Button theme="primary" any-class="py-2 w-full" btn-text="Cancel"
              /></router-link>
              <!-- <GoogleLogin class="w-full" :callback="callback" promt auto-login /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
