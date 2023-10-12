<style scope src="./modal-employee-detail.css"></style>
<script lang="ts" src="./modal-employee-detail.ts"></script>

<template>
    <div class="modal fade" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="min-width:850px">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Employee Information</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="d-flex flex-row" style="gap:32px; margin:16px">
                    <div class="col d-flex flex-column" style="gap:16px">
                        <div class="input-field">
                            <p class="text-start">Name:</p>
                            <input class="input" style="height:30px" v-model="userInput.name" type="text" placeholder="Enter customer's name"/>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Email:</p>
                            <input class="input" style="height:30px" v-model="userInput.email" type="text" placeholder="Enter customer's email"/>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Address:</p>
                            <input class="input" style="height:30px" v-model="userInput.address" type="text" placeholder="Enter customer's address"/>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Phone:</p>
                            <input class="input" style="height:30px" v-model="userInput.phoneNumber" type="text" placeholder="Enter customer's phone number"/>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Birthday:</p>
                            <input class="input" style="height:30px" v-model="userInput.birthdate" type="date"/>
                        </div>
                    </div>
                    <div class="col d-flex flex-column" style="gap:16px">
                        <div class="input-field">
                            <p class="text-start">Created:</p>
                            <input class="input" style="height:30px" type="date" :value='customer?.createdAt?.slice(0,10)' disabled/>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Last Paid:</p>
                            <input class="input" style="height:30px" type="date" :value='customer?.user?.updatedAt?.slice(0,10)' disabled/>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Rank:</p>
                            <input class="input" style="height:30px; text-transform: capitalize" type="text" :value='customer?.user?.rank' disabled/>
                        </div>
                        <div class="input-field">
                            <p class="text-start">Point:</p>
                            <input class="input" style="height:30px" type="text" :value='customer?.user?.point' disabled/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="button-outline" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" :class="[isChanged? '' : 'button-disabled', 'button-solid']" @click="handleUpdate">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>