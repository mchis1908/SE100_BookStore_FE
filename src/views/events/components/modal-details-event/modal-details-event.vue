<style scoped src="./modal-details-event.css"></style>
<script lang="ts" src="./modal-details-event.ts"></script>

<template>
    <div class="modal fade" ref="details-event-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add new voucher</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div v-if="isLoading" class="modal-body">
                    <div class="w-100 d-flex justify-content-center align-items-center">
                        <Loading />
                    </div>
                </div>
                <div v-else class="modal-body text-start">
                    <div class="input-group mb-3">
                        <span class="input-group-text col-4" id="inputGroup-sizing-default">Event Name</span>
                        <input v-model="detailsEvent.name" type="text" class="form-control col-8" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>

                    <div class="input-group mb-3 book-input">
                        <span class="input-group-text col-4" id="inputGroup-sizing-default">Discounted Books</span>
                        <input @input="handleSearchBook" v-model="searchBook" type="text" class="form-control col-8" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                        <div v-if="isOpenModalBook" class="book-search-container" :style="bookList.length > 0 ? 'height: 200px' : 'height: fit-content'" v-motion-slide-top>
                            <div v-if="bookList.length > 0" v-for="(item, index) in bookList" :key="index" @click="handleSelectBook(item)" class="d-flex justify-content-between align-items-center mb-3 cursor_pointer book-list-item">
                                <p>{{item.name}} (Author: {{ item.author }})</p>
                                <p data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Quantity">{{ item.quantity }}</p>
                            </div>

                            <strong v-else class="d-flex justify-content-center align-items-center">
                                No books found.
                            </strong>
                        </div>
                    </div>
                    <div v-if="detailsEvent.discountBooks.length > 0" class="d-flex w-100 flex-wrap" style="gap: 10px;">
                        <div v-for="(item, index) in detailsEvent.discountBooks" :key="index" class="d-flex justify-content-center align-items-center book-item">
                            <p>{{ item.name }}</p>
                            <i class="bi bi-x-circle cursor_pointer zoomout-icon" @click="handleDeselectBook(index)"></i>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text col-4" id="inputGroup-sizing-default">Discount Value</span>
                        <input v-model="detailsEvent.eventDiscountValue" type="text" class="form-control col-8" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text col-4" id="inputGroup-sizing-default">Start Date</span>
                        <input v-model="detailsEvent.startAt" type="date" class="form-control col-8" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text col-4" id="inputGroup-sizing-default">Due Date</span>
                        <input v-model="detailsEvent.endAt" type="date" class="form-control col-8" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-cancel" data-bs-dismiss="modal">Cancel</button>
                    <button @click="handleSaveChanges" type="button" class="btn btn-primary btn-add">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>