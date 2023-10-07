
<style scoped src="./login.css"></style>
<script lang="ts" src="./login.ts"></script>

<template>
    <div class="login">
        <div class="wrapper">
            <div class="login-container">
                <div id="logo">
                    <img id="logo-img" src="@/assets/login/png/Logo.png" alt="logo">
                </div>
                <h2>Login</h2>
                    <div class="input-field">
                    <input v-model="username" type="text" required>
                    <label>Enter your email</label>
                </div>
                <div class="input-field">
                    <input v-model="password" type="password" required>
                    <label>Enter your password</label>
                </div>
                <div v-if="invalidAccount" style="width: 100%; text-align: start; font-size: 14px; font-weight: 400">
                    <p style="color: #FF513C;">{{ invalidAccount }}</p>
                  </div>
                <div class="forget">
                    <router-link style="font-size:14px" to="/">Forgot password?</router-link>
                </div>
                <button v-if="!isLoading" @click="handleLogin">
                    Login
                </button>
                <div v-else class="loading-container">
                    <Loading/>
                </div>
            </div>
        </div>
    </div>
</template>