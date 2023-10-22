
<style scoped src="./report-problems.css"></style>
<script lang="ts" src="./report-problems.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2"/>
            <div class="col-10 d-flex flex-column" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1;" v-motion-slide-left>
                <div class="d-flex flex-column justify-content-start" style="background:#fff; border-radius: 16px; height:100%">
                    <div class="d-flex flex-column" style="gap:32px; margin:16px; gap:16px">
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field">
                                <p class="text-start" style="height:30px; font-weight:600">Subject:</p>
                                <div class="d-flex flex-column" style="gap:4px">
                                    <input class="input" v-model="userInput.subject" style="height:30px" type="text" placeholder="Enter subject"/>
                                    <div v-if="invalidMessage?.subject" class="text-start">
                                        <p class="text-error">{{ invalidMessage?.subject }}</p>
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
                                    <textarea class="input" style="min-height:270px" v-model="userInput.description" type="text"></textarea>
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
                    </div>
                    <div class="modal-footer" style="padding:16px">
                        <button type="button" class="button-outline" data-bs-dismiss="modal">Close</button>
                        <button type="button" :class="[validInput? '':'button-disabled','button-solid']" @click="handleClickActionButton">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>