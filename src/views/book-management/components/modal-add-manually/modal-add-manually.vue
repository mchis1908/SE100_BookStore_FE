<style scoped src="./modal-add-manually.css"></style>

<script lang="ts" src="./modal-add-manually.ts"></script>

<template>
    <div class="modal fade" ref="add-book-manually-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add new books</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-2">
                        <label for="bookNameInput" class="form-label">Name</label>
                        <input type="email" class="form-control" id="bookNameInput">
                    </div>
                    <div class="mb-2">
                        <label for="selectCategories" class="form-label">Categories</label>
                        <div class="custom-select" @click="toggleModalCategories">
                            <p>Select categories</p>
                            <i class="bi bi-chevron-down"></i>

                            <div v-if="isShowModalCategories" class="category-modal" v-motion-slide-top>
                                <p>Classic</p>
                                <p>Psychological</p>
                                <p>Historical</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-2">
                        <label for="bookImagesInput" class="form-label">Images</label>
                        <input type="file" class="form-control" id="bookImagesInput" multiple>
                    </div>
                    <div class="mb-2">
                        <label for="bookAuthorInput" class="form-label">Author</label>
                        <input type="text" class="form-control" id="bookAuthorInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookTranslatorInput" class="form-label">Translator</label>
                        <input type="text" class="form-control" id="bookTranslatorInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookBarcodeInput" class="form-label">Barcode</label>
                        <input type="text" class="form-control" id="bookBarcodeInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookPublisherInput" class="form-label">Publisher</label>
                        <input type="text" class="form-control" id="bookPublisherInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookPublishYearInput" class="form-label">Publish Year</label>
                        <input type="text" class="form-control" id="bookPublishYearInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookQuantityInput" class="form-label">Quantity</label>
                        <input type="text" class="form-control" id="bookQuantityInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookPriceInput" class="form-label">Price</label>
                        <input type="text" class="form-control" id="bookPriceInput">
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>
