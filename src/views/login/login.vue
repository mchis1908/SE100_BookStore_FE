
<style scoped src="./login.css"></style>
<script lang="ts" src="./login.ts"></script>

<template>
    <div class="login">
        <div  class="menu-login">
            <router-link to="/">
                <div class="menu-login-item">
                    Home
                </div>
            </router-link>
        </div>
        
        <div class="wrapper">
            <div class="login-container">
                <div id="logo">
                    <img id="logo-img" src="@/assets/login/png/Logo.png" alt="logo">
                </div>
                <h2>Login</h2>
                <div class="input-field-login">
                    <input v-model="username" type="text" autocomplete="off" required>
                    <label>Enter your email or phone number</label>
                </div>
                <div class="input-field-login">
                    <input v-model="password" type="password" autocomplete="off" required>
                    <label>Enter your password</label>
                </div>
                <div v-if="invalidAccount" style="width: 100%; text-align: start; font-size: 14px; font-weight: 400">
                    <p style="color: #FF513C;">{{ invalidAccount }}</p>
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