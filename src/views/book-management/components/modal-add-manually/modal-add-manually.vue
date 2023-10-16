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
                        <input v-model="book.name" type="text" class="form-control" id="bookNameInput">
                    </div>
                    <div class="mb-2">
                        <label for="selectCategories" class="form-label">Categories</label>
                        <div class="custom-select" @click="toggleModalCategories" required>
                            <p>Select categories</p>
                            <i class="bi bi-chevron-down"></i>

                            <div v-if="isShowModalCategories" class="category-modal" v-motion-slide-top @click.stop>
                                <div v-for="(item, index) in allCategories" :key="index" class="category-item-container">
                                    <label :for="`category-${index}`">{{item.name}}</label>
                                    <input v-model="seletectedCategory" type="checkbox" :id="`category-${index}`" :value="item._id"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-2">
                        <label for="bookImagesInput" class="form-label">Images</label>
                        <input type="file" class="form-control" id="bookImagesInput" multiple>
                    </div>
                    <div class="mb-2">
                        <label for="bookAuthorInput" class="form-label">Author</label>
                        <input v-model="book.author" type="text" class="form-control" id="bookAuthorInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookTranslatorInput" class="form-label">Translator</label>
                        <input v-model="book.translator" type="text" class="form-control" id="bookTranslatorInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookBarcodeInput" class="form-label">Barcode</label>
                        <input v-model="book.barcode" type="text" class="form-control" id="bookBarcodeInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookPublisherInput" class="form-label">Publisher</label>
                        <input v-model="book.publisher" type="text" class="form-control" id="bookPublisherInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookPublishYearInput" class="form-label">Publish Year</label>
                        <input v-model="book.publishingYear" type="text" class="form-control" id="bookPublishYearInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookQuantityInput" class="form-label">Quantity</label>
                        <input v-model="book.quantity" type="text" class="form-control" id="bookQuantityInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookPriceInput" class="form-label">Price</label>
                        <input v-model="book.importPrice" type="text" class="form-control" id="bookPriceInput">
                    </div>
                    <div class="mb-2">
                        <label for="bookImportDateInput" class="form-label">Import Date</label>
                        <input v-model="book.importDate" type="date" class="form-control" id="bookImportDateInput">
                    </div>
                </div>

                <div class="modal-footer">
                    <p class="text-fill-all">Please fill in all fields!</p>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button @click="handleCreateBook" type="button" class="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>
