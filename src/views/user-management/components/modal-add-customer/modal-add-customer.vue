<style scope src="./modal-add-customer.css"></style>
<script lang="ts" src="./modal-add-customer.ts"></script>

<template>
    <div class="modal fade" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="min-width:850px">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add New Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="d-flex flex-row" style="gap:32px; margin:16px">
                    <div class="col d-flex flex-column" style="gap:16px">
                        <div class="input-field">
                            <p class="text-start">Name:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input v-model="userInput.name" style="height:30px" type="text" placeholder="Enter customer's name"/>
                                <div v-if="invalidMessage.name" class="text-start">
                                    <p class="text-error">{{ invalidMessage.name }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Email:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input v-model="userInput.email" style="height:30px" type="text" placeholder="Enter customer's email"/>
                                <div v-if="invalidMessage.email" class="text-start">
                                    <p class="text-error">{{ invalidMessage.email }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Address:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input v-model="userInput.address" style="height:30px" type="text" placeholder="Enter customer's address"/>
                            </div>
                        </div>
                    </div>
                    <div class="col d-flex flex-column" style="gap:16px">
                        <div class="input-field">
                            <p class="text-start">Password:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input v-model="userInput.password" style="height:30px" type="password" placeholder="Enter customer's password"/>
                                <div v-if="invalidMessage.password" class="text-start">
                                    <p class="text-error">{{ invalidMessage.password }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Phone:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input v-model="userInput.phone" style="height:30px" type="text" placeholder="Enter customer's phone number"/>
                                <div v-if="invalidMessage.phone" class="text-start">
                                    <p class="text-error">{{ invalidMessage.phone }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Birthday:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input v-model="userInput.birthday" style="height:30px" type="date" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="button-outline" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="button-solid" @click="handleClickActionButton">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>