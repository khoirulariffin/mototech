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
      userRegist: {
        username: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions(useallInOneStore, ['handleRegist']),
    register() {
      this.handleRegist(this.userRegist)
    }
  }
}
</script>
<template>
  <section class="login-form mx-auto h-screen flex">
    <div class="left w-3/12 h-screen">
      <img
        src="https://www.westend61.de/images/0000879217pw/portrait-of-happy-female-mechanic-with-arms-crossed-while-standing-in-workshop-CAVF22095.jpg"
        alt="bg-login"
        class="object-cover h-full"
      />
    </div>
    <div class="right w-3/4 h-screen bg-white rounded-t-3xl -ms-5 flex flex-col">
      <div class="flex justify-center pt-10">
        <h1 class="text-3xl">Sign Up</h1>
      </div>
      <div class="flex justify-center py-5">
        <hr class="w-1/4 opacity-40" />
      </div>
      <div>
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="card flex-shrink-0 w-full max-w-xl shadow-xl bg-base-100">
            <div class="card-body">
              <form @submit.prevent="register">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Username</span>
                  </label>
                  <input
                    v-model="userRegist.username"
                    type="text"
                    placeholder="username"
                    class="input input-bordered"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input
                    v-model="userRegist.email"
                    type="email"
                    placeholder="email"
                    class="input input-bordered"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    v-model="userRegist.password"
                    type="password"
                    placeholder="password"
                    class="input input-bordered"
                  />
                  <label class="label">
                    <router-link class="label-text-alt" to="/login">
                      Have an account?
                      <span class="link link-hover text-blue-700 hover:text-blue-500">Sign in</span>
                    </router-link>
                  </label>
                </div>
                <div class="form-control mt-6">
                  <Button theme="secondary" any-class="py-2" btn-type="sumbit" btn-text="Sign Up" />
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
