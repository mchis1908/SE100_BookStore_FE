<style scoped src="./modal-add-event.css"></style>
<script lang="ts" src="./modal-add-event.ts"></script>

<template>
    <div class="modal fade" ref="add-new-event-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add new event</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">Event Name</label>
                        <input v-model="newEvent.name" type="text" class="form-control" id="bookDiscountInput">
                    </div>

                    <div class="mb-2"> 
                        <label for="bookDiscountInput" class="form-label">Event Discount Value</label>
                        <input v-model="newEvent.eventDiscountValue" type="number" class="form-control" id="bookDiscountInput">
                    </div>

                    <div class="mb-2 book-input">
                        <label for="bookDiscountInput" class="form-label">Discounted Books</label>
                        <div class="input-book">
                            <input v-model="querySearchBook" @focus="handleOpenModalBook" @input="handleOpenModalBook" type="text" class="form-control" id="searchBook">
                            <i v-if="querySearchBook" class="bi bi-x-lg cursor_pointer zoomout-icon" @click="handleClearSearch"></i>
                        </div>

                        <div v-if="isOpenModalBook" class="book-search-container" :style="listBooks.length > 0 ? 'height: 200px' : 'height: fit-content'" v-motion-slide-top>
                            <div v-if="listBooks.length > 0" v-for="(item, index) in listBooks" :key="index" @click="handleSelectBook(item)" class="d-flex justify-content-between align-items-center mb-3 cursor_pointer book-item">
                                <p>{{item.name}} (Author: {{ item.author }})</p>
                                <p data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Quantity">{{ item.quantity }}</p>
                            </div>

                            <strong v-else class="d-flex justify-content-center align-items-center">
                                No books found.
                            </strong>
                        </div>

                        <div class="d-flex flex-wrap align-item-center mt-2" style="gap: 10px">
                            <div v-for="(item, index) in selectedBooks" :key="index" class="selected-item">
                                <p>{{ item.name }} ({{ item.quantity }})</p>
                                <i class="bi bi-x-circle cursor_pointer zoomout-icon" @click="handleDeselectBook(index)"></i>
                            </div>
                        </div>
                    </div>

                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">Start Day</label>
                        <input v-model="newEvent.startAt" type="date" class="form-control" id="bookDiscountInput">
                    </div>

                    <div class="mb-2">
                        <label for="bookDiscountInput" class="form-label">End Date</label>
                        <input v-model="newEvent.endAt" type="date" class="form-control" id="bookDiscountInput">
                    </div>

                    <div class="input-field mt-3 d-flex flex-column" style="gap: 0">
                        <p class="report-items-title" >Event Images</p>
                        <div class="report-items-image" style="margin-top: 8px;">
                            <img class="imgReport" v-for="(item, index) in fileInput1" :key="index" :src="item"/>
                            <label class="custom-file-upload card-image" v-if="fileInput1.length < 1">
                                <input type="file" multiple accept=".png, .jpg, .jpeg" @change="onFileSelected"/>
                                <i class="bi bi-plus d-flex justify-content-center" style="font-size:24px"></i>
                            </label>
                        </div>
                    </div>
                </div>
                    
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-cancel" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-add" @click="handleCreateEvent">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>