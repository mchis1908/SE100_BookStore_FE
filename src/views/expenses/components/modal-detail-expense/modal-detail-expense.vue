<style scope src="./modal-detail-expense.css"></style>
<script lang="ts" src="./modal-detail-expense.ts"></script>

<template>
    <div class="modal fade" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="min-width:850px">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Detail Problem</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="d-flex flex-column" style="gap:32px; margin:16px; gap:16px">
                    <div class="col d-flex flex-column" style="gap:16px">
                        <div class="input-field">
                            <p class="text-start" style="height:30px; font-weight:600">Subject:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input class="input" v-model="userInput.subject" style="height:30px" type="text" placeholder="Enter subject"/>
                                <div v-if="invalidMessage.subject" class="text-start">
                                    <p class="text-error">{{ invalidMessage.subject }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="text-start" style="height:30px; font-weight:600">Cost:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input class="input" v-model="userInput.cost" style="height:30px" type="text" />
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="text-start" style="height:30px; font-weight:600">Description:</p>
                            <div class="d-flex flex-column" style="gap:4px;">
                                <textarea class="input" v-model="userInput.description" type="text"></textarea>
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="text-start" style="height:30px; font-weight:600">Date Report:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input class="input" :value="expenses?.createdAt?.slice(0,10)" style="height:30px" type="text" disabled/>
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="text-start" style="height:30px; font-weight:600">Reporter:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input class="input" :value="expenses?.reporter?.name" style="height:30px" type="text" disabled/>
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="report-items-title" >Image</p>
                            <div class="report-items-image" style="margin-top: 8px;">
                                <img class="imgReport" v-for="(item, index) in expenses?.images" :key="index" :src="item"/>
                            </div>
                        </div>
                    </div>
                    <p v-if="expenses?.status==='PENDING'" class="text-start text-success">*If you decline or confirm this problem/expense, you can see this problem/expense in history.</p>
                </div>
                <div v-if="expenses?.status!=='PENDING'" class="modal-footer">
                    <button type="button" class="button-outline" data-bs-dismiss="modal">Close</button>
                    <button type="button" :class="[validInput && expenses?.status!=='PENDING' ? '':'button-disabled','button-solid']" @click="handleClickActionButton">Save</button>
                </div>
                <div v-else class="modal-footer">
                    <button type="button" class="button-danger" @click="handleChangeStatus('REJECTED')">Decline</button>
                    <button type="button" :class="[!invalidMessage.subject && !invalidMessage.description ? '':'button-disabled','button-solid']" @click="handleChangeStatus('RESOLVED')">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>