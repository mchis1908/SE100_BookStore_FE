<style scoped src="./modal-details-book.css"></style>

<script lang="ts" src="./modal-details-book.ts"></script>

<template>
    <FormattedModal ref="modal-delete-book-component" title="Delete this book" content="Do you want to delete this book?" actionButtonTitle="Delete" :isDangerAction="true" @handleClickActionButton="handleDeleteBook"/>

    <div class="modal fade" ref="details-book-modal" id="details-book-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">{{ bookItem.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="row mb-3">
                        <label for="inputId" class="col-3 col-form-label">Barcode</label>
                        <div class="col-8">
                            <input :disabled="disabledInput" type="text" class="form-control" id="inputId" :value="bookItem.barcode">
                        </div>
                        <div @click="handleCopyId" class="col-1 btn-copy">
                            <i v-if="!isCopiedId" class="bi bi-clipboard"></i>
                            <i v-else class="bi bi-check-lg"></i>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-3 col-form-label">Name</label>
                        <div class="col-9">
                            <input :disabled="disabledInput" v-model="copiedBook.name" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-3 col-form-label">Author</label>
                        <div class="col-9">
                            <input :disabled="disabledInput" v-model="copiedBook.author" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="selectCategories" class="col-form-label col-3">Categories</label>
                        <div class="col-9" style="position: relative;" @click="toggleModalCategories" required>
                            <div class="custom-select" >
                                <p>Select categories</p>
                                <i class="bi bi-chevron-down"></i>
                            </div>

                            <div v-if="isShowModalCategories" class="category-modal" v-motion-slide-top @click.stop>
                                <div v-for="(item, index) in allCategories" :key="index" class="category-item-container">
                                    <label :for="`category-${index}`">{{item.name}}</label>
                                    <input :disabled="disabledInput" v-model="seletectedCategory" :checked="handleCheckCategory(item._id)" type="checkbox" :id="`category-${index}`" :value="item._id"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-3 col-form-label">Import Price</label>
                        <div class="col-9">
                            <input :disabled="disabledInput" v-model="copiedBook.importPrice" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-3 col-form-label">Publisher</label>
                        <div class="col-9">
                            <input :disabled="disabledInput" v-model="copiedBook.publisher" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-3 col-form-label">Publishing Year</label>
                        <div class="col-9">
                            <input :disabled="disabledInput" v-model="copiedBook.publishingYear" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-3 col-form-label">Quantity</label>
                        <div class="col-9">
                            <input :disabled="disabledInput" v-model="copiedBook.quantity" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-3 col-form-label">Sales Price</label>
                        <div class="col-9">
                            <input :disabled="disabledInput" v-model="copiedBook.salesPrice" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputAuthor" class="col-3 col-form-label">Translator</label>
                        <div class="col-9">
                            <input :disabled="disabledInput" v-model="copiedBook.translator" type="text" class="form-control" id="inputAuthor"/>
                        </div>
                    </div>

                    <div class="input-field mt-3 d-flex flex-column" style="gap: 0">
                        <p class="report-items-title" >Book Image</p>
                        <div class="report-items-image" style="margin-top: 8px;">
                            <img v-if="fileInput1.length > 0" class="imgReport" v-for="(item, index) in fileInput1" :key="index" :src="item"/>
                            <label class="custom-file-upload card-image" v-if="fileInput1.length < 1">
                                <input :disabled="disabledInput" type="file" multiple accept=".png, .jpg, .jpeg" @change="onFileSelected"/>
                                <i class="bi bi-plus d-flex justify-content-center" style="font-size:24px"></i>
                            </label>
                        </div>
                    </div>
                </div>

                <div v-if="userData?.data?.role==='admin' || userData?.data?.role==='employee'" class="modal-footer">
                    <!-- <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="handleOpenModalDeleteBook">Delete</button> -->
                    <div class="save-container">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button @click="handleUpdateBook" type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
