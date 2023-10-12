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
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Author</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAuthor" :value="bookItem.author"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Barcode</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAuthor" :value="bookItem.barcode"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Categories</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAuthor" :value="bookItem.categories"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Import Price</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAuthor" :value="bookItem.importPrice"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Publisher</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAuthor" :value="bookItem.publisher"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Publishing Year</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAuthor" :value="bookItem.publishingYear"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Quantity</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAuthor" :value="bookItem.quantity"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Sales Price</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAuthor" :value="bookItem.salesPrice"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-sm-2 col-form-label">Translator</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAuthor" :value="bookItem.translator"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
