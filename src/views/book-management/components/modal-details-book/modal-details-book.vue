<style scoped src="./modal-details-book.css"></style>

<script lang="ts" src="./modal-details-book.ts"></script>

<template>
    <div class="modal fade" ref="details-book-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">{{ bookItem.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="row mb-3">
                        <label for="inputId" class="col-sm-2 col-form-label">ID</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="inputId" disabled :value="bookItem._id">
                        </div>
                        <div @click="handleCopyId" class="col-sm-1 btn-copy">
                            <i v-if="!isCopiedId" class="bi bi-clipboard"></i>
                            <i v-else class="bi bi-check-lg"></i>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.name" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Author</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.author" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Barcode</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.barcode" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Categories</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.categories" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Import Price</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.importPrice" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Publisher</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.publisher" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Publishing Year</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.publishingYear" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Quantity</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.quantity" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Sales Price</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.salesPrice" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Translator</label>
                        <div class="col-sm-10">
                            <input v-model="copiedBook.translator" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="handleUpdateBook" type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
