<script>
export default {
  name: 'Button',
  props: ['btnText', 'theme', 'anyClass', 'btnType'],
  data() {
    return {
      text: this.btnText ? this.btnText : 'Submit',
      secondary:
        'px-5 py-1 rounded text-gray-900 inline-block inset-0 transition-all duration-200 ease-out shadow-sm bg-gradient-to-br filter active:shadow-md from-blue-200 to-blue-300',
      primary:
        'px-5 py-1 rounded text-slate-900 inline-block inset-0 transition-all duration-200 ease-out shadow-sm bg-gradient-to-br filter active:shadow-md from-slate-50 to-slate-200'
    }
  }
}
</script>
<template>
  <button
    :type="btnType ? btnType : 'button'"
    :class="theme === 'secondary' ? `${secondary} ${anyClass}` : `${primary} ${anyClass}`"
  >
    {{ text }}
  </button>
</template>
<style></style>
