<style scoped src="./modal-add-category.css"></style>

<script lang="ts" src="./modal-add-category.ts"></script>

<template>
    <div class="modal fade" ref="add-category-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add new category</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-2">
                        <label for="categoryNameInput" class="form-label">Category Name</label>
                        <input type="text" class="form-control" id="categoryNameInput">
                    </div>
                    <div class="mb-2">
                        <label for="categoryRowInput" class="form-label">Row</label>
                        <input type="text" class="form-control" id="categoryRowInput">
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button @click="handleAddCategory" type="button" class="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>
