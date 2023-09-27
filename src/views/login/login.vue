
<style scoped src="./login.css"></style>
<script lang="ts" src="./login.ts"></script>

<template>
    <div class="d-flex justify-content-center align-items-center" style="height:100vh; background-color: rgba(242, 242, 242, 0.75); padding: 0;">
        <div class="d-flex flex-row justify-content-center align-items-center" style="border-radius: 25px; background: #FFF; gap:32px; height: 80vh;">
            <img class="col-6" src="@/assets/login/png/left-side.png" style="object-fit:cover; height: 100%; border-radius: 25px 0 0 25px;"/>
            <div class="col d-flex flex-column" style="gap:16px">
                <p style="padding-bottom:4vh; color: #0A91AB;font-size: 40px;font-weight: 600; padding-right: 32px;">Login</p>
                <div class="d-flex flex-column align-items-start justify-content-center" style="width:100%; gap:8px">
                    <p>Account:</p>
                    <input type="input" style="width:90%"/>
                </div>
                <div class="d-flex flex-column align-items-start justify-content-center" style="width:100%; gap:8px">
                    <p>Password:</p>
                    <input type="password" style="width:90%"/>
                </div>
            </div>
        </div>
        
    </div>
</template>