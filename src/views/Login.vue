<template>
    <div class="flex items-center justify-center h-full w-full bg-blue-400 text-gray-700">
        <div class="w-2/6">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <notifications-list v-if="notifications" :notifications="notifications"></notifications-list>
                <validation-observer v-slot="{ invalid }">
                    <form @submit.prevent="onSubmit">
                        <div class="mb-4">
                            <validation-provider v-slot="{ errors }" vid="email" ref="email" rules="required|email">
                                <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                       :class="{ 'border-red-500':errors[0] }"
                                       id="email"
                                       type="text" placeholder="Email" v-model="credentials.username">
                                <p class="text-red-500 text-xs italic pt-3" v-if="errors[0]">{{ errors[0] }}</p>
                            </validation-provider>
                        </div>
                        <div class="mb-4">
                            <validation-provider v-slot="{ errors }" vid="email" ref="email" rules="required">
                                <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
                                       :class="{ 'border-red-500':errors[0] }"
                                       id="password" type="password" placeholder="******************"
                                       v-model="credentials.password">
                                <p class="text-red-500 text-xs italic pt-3" v-if="errors[0]">{{ errors[0] }}</p>
                            </validation-provider>
                        </div>
                        <div class="flex items-center justify-between">
                            <button class="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
                                    :class="{ 'disabled': invalid}"
                                    type="submit"
                                    :disabled="invalid">
                                Sign In
                            </button>
                            <router-link :to="{name: 'register'}" class="text-blue-400 font-bold">Sign Up</router-link>
                        </div>
                    </form>
                </validation-observer>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import NotificationsList from "../components/notifications/NotificationsList";
  import {LOGIN} from "../store/actions.type";

  export default {
    name: "Login",
    components: {NotificationsList},
    data() {
      return {
        credentials: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters(['notifications'])
    },
    methods: {
      onSubmit() {
        this.$store.dispatch(LOGIN, this.credentials)
          .then(() => {
            this.$router.push({name: 'chat'});
          });
      }
    }
  }
</script>

<style scoped>

</style>
