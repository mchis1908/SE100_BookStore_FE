<style scope src="./modal-add-expense.css"></style>
<script lang="ts" src="./modal-add-expense.ts"></script>

<template>
    <div class="modal fade" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="min-width:850px">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add New Problem</h5>
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
                                <div v-if="invalidMessage.description" class="text-start">
                                    <p class="text-error">{{ invalidMessage.description }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="input-field">
                            <p class="report-items-title" >Image</p>
                            <div class="report-items-image" style="margin-top: 8px;">
                                <img class="imgReport" v-for="(item, index) in fileInput1" :key="index" :src="item"/>
                                <label class="custom-file-upload card-image">
                                    <input type="file" multiple accept=".png, .jpg, .jpeg" @change="onFileSelected"/>
                                    <i class="bi bi-plus d-flex justify-content-center" style="font-size:24px"></i>
                                </label>
                            </div>
                        </div>
                    </div>
                    <p class="text-start text-warning">*If admin role, the expense/problem will be resolved if you create</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="button-outline" data-bs-dismiss="modal">Close</button>
                    <button type="button" :class="[validInput? '':'button-disabled','button-solid']" @click="handleClickActionButton">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>