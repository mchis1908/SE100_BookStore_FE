
<style scoped src="./login.css"></style>
<script lang="ts" src="./login.ts"></script>

<template>
    <div class="login">
        <div class="wrapper">
            <form action="#">
            <h2>Login</h2>
                <div class="input-field">
                <input type="text" required>
                <label>Enter your email</label>
            </div>
            <div class="input-field">
                <input type="password" required>
                <label>Enter your password</label>
            </div>
            <div class="forget">
            <router-link style="font-size:14px" to="/">Forgot password?</router-link>
            </div>
            <button @click="handleLogin">Log In</button>
            </form>
        </div>
    </div>
</template>