<style scoped src="./modal-add-books.css"></style>
<script lang="ts" src="./modal-add-books.ts"></script>

<template>
    <div class="modal fade" ref="add-new-book-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add new books</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <p>Choose one method below to add new books:</p>
                    <div class="button-container">
                        <button class="button-import" @click="handleImportFiles" data-bs-dismiss="modal">
                            <p>Import files</p> 
                            <i class="bi bi-arrow-right"></i>
                        </button>
                        <button class="button-manual">
                            <p>Add manually</p> 
                            <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ModalImportFiles ref="import-files-component" id="modalImportFiles"/>
</template>