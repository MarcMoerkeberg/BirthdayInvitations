<script setup lang="ts">
import routes from '@/models/componentModels/Routes';
import { signInWithEmailAndPassword, type Auth } from 'firebase/auth';
import { watch, type Ref } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';

const router = useRouter()
const auth = useFirebaseAuth() ?? {} as Auth
const isSignedIn = useCurrentUser()

async function login() {
    try {
        loading.value = true
        await validationForm.value?.validate()
        await signInWithEmailAndPassword(auth, username.value ?? '', password.value ?? '')
        router.push(routes.Admin.Route)
    } catch (error) {
        hideLoginErrorMessage.value = false
    }
    finally {
        loading.value = false
    }
}
async function logout() {
    try {
        await auth.signOut()
        router.push(routes.LandingPage.Route)
    } catch (error) {
    }
}

const username = ref<string | undefined>()
const password = ref<string | undefined>()
const hideLoginErrorMessage = ref<boolean>(true)
const loading = ref<boolean>(false)
const loginValidationRules = [(value: string) => { return !!value || 'Must contain a value.' }]
const validationForm: Ref<HTMLFormElement | undefined> = ref()

watch(password, (newValue, oldValue) => { hideLoginErrorMessage.value = newValue != oldValue })
watch(username, (newValue, oldValue) => { hideLoginErrorMessage.value = newValue != oldValue })
const loginErrorMessage = computed(() => { return hideLoginErrorMessage.value ? undefined : 'Wrong user or password' })
</script>

<template>
    <div class="horizontal-center vertical-center">
        <v-col cols="4">
            <v-card color="primary">
                <v-card-title>Login</v-card-title>
                <v-divider></v-divider>
                <v-form ref="validationForm">
                    <v-container>
                        <v-text-field label="Username"
                                      prepend-inner-icon="mdi-account"
                                      type="text"
                                      :rules="loginValidationRules"
                                      v-model="username"
                                      :loading="loading"
                                      :error="!!loginErrorMessage"
                                      clearable />
                        <v-text-field label="Password"
                                      prepend-inner-icon="mdi-lock"
                                      type="password"
                                      v-model="password"
                                      v-on:keyup.enter="login"
                                      :rules="loginValidationRules"
                                      :loading="loading"
                                      clearable
                                      :error-messages="loginErrorMessage" />
                    </v-container>
                </v-form>
                <v-divider></v-divider>
                <v-btn class="login-btn"
                       color="grey-lighten-2"
                       :disabled="!!isSignedIn"
                       prepend-icon="mdi-login-variant"
                       @click="login">Login</v-btn>

                <v-btn class="login-btn"
                       color="grey-darken-2"
                       :disabled="!isSignedIn"
                       prepend-icon="mdi-logout-variant"
                       @click="logout">Logout</v-btn>
            </v-card>
        </v-col>
    </div>
</template>
<style scoped>
.login-btn {
    margin: 15px;
    float: right;
}
</style>