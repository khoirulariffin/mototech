import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'https://moto-tech-production.up.railway.app'

export const useallInOneStore = defineStore('allInOne', {
  state: () => ({
    isLogin: false,
    motorcycles: [],
    services: [],
    isReady: false,
    services_home: [],
    detailCust: null
  }),
  getters: {},
  actions: {
    async handleLogin(userLogin) {
      try {
        const { data } = await axios.post(`${baseUrl}/customers/login`, userLogin)
        localStorage.setItem('access_token', data.access_token)
        this.isLogin = true
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You are logged in!'
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    },
    async handleRegist(userRegist) {
      try {
        const { data } = await axios.post(`${baseUrl}/customers/register`, userRegist)
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Acount created!'
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    },
    CTA() {
      if (!this.isLogin || !localStorage.getItem('access_token')) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please sign in first'
        })
      } else {
        this.router.push('/transaction')
      }
    },
    async fetchAllMotorcycle(make, model) {
      try {
        const { data } = await axios.post(`${baseUrl}/motorcycles`, { make, model })
        this.motorcycles = data
      } catch (err) {
        console.log(err)
      }
    },
    async availableCheck(customerMotor) {
      try {
        const { data } = await axios.get(`${baseUrl}/motorcycles/available`)

        const result = data.filter((d) => d.model === customerMotor)

        if (!result.length) {
          Swal.fire({
            icon: 'info',
            title: 'Sorry',
            text: 'We are so sorry, your motorcycle is not available in our catalog'
          })
          this.isReady = false
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Congratulation',
            text: 'Congrats! Your motorcycle is available'
          })
          this.isReady = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    async fetchServicesByMotor(model) {
      try {
        const { data } = await axios.post(`${baseUrl}/services`, { model })
        this.services = data[0].PriceLists
        // console.log(this.services)
        // console.log(model)
      } catch (err) {
        console.log(err)
      }
    },
    async handleTrasaction(IdService, additional, modelCust) {
      try {
        // console.log(additional)
        let towingFee = 0
        const headers = {
          access_token: localStorage.getItem('access_token')
        }

        const { data } = await axios.get(`${baseUrl}/customers/detail`, { headers })
        const city = data.data.Profile.city
        console.log(city, '======')

        const motorcycle = await axios.get(`${baseUrl}/motorcycles/${modelCust}`)
        // console.log(motorcycle.data.motorcycle.id)

        if (city === 'empty' && additional === 'Towing') {
          Swal.fire({
            icon: 'info',
            title: 'Sorry',
            text: 'Please update your link address in your profile'
          })
        } else {
          // console.log('masuk ====', IdService)
          if (additional === 'Towing') {
            const tow = await axios.get(`${baseUrl}/customers/maps`, { headers })
            // console.log(tow.data.jarak)
            const jarakKotor = tow.data.jarak
            const splitted = jarakKotor.split(' ')
            const jarak = Number(splitted[0])
            towingFee = jarak * 100000
          }

          const opt = {
            method: 'POST',
            url: `${baseUrl}/transactions/createInvoice`,
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              IdService,
              IdMotorcycle: motorcycle.data.motorcycle.id,
              towingFee
            }
          }

          const trx = await axios.request(opt)

          // console.log(trx.data.resp.invoice_url)
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Horaay! Your transaction has been proceess.',
            footer: `<a href="${trx.data.resp.invoice_url}" target="blank">Click here for choose payment method</a>`
          })
        }
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Field must be filled!'
        })
      }
    },
    async fetchAllServices() {
      try {
        const { data } = await axios.get(`${baseUrl}/services/all`)
        // console.log(data.data)
        this.services_home = data.data
      } catch (err) {
        console.log(err)
      }
    },
    async getDetailCust() {
      try {
        const headers = {
          access_token: localStorage.getItem('access_token')
        }
        const { data } = await axios.get(`${baseUrl}/customers/detail`, { headers })
        // console.log(data)
        this.detailCust = data.data
        // console.log(this.detailCust.Profile.city)
      } catch (err) {
        console.log(err)
      }
    },
    async handleUpdateCust(dataCustomer) {
      try {
        const headers = {
          access_token: localStorage.getItem('access_token')
        }
        const { data } = await axios.put(
          `${baseUrl}/customers/detail`,
          { dataCustomer },
          { headers }
        )

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Congrats! Your data is updated!'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
})
