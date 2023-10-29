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
                        <input v-model="categoryName" type="text" class="form-control" id="categoryNameInput">
                    </div>
                    <div class="mb-2">
                        <label for="categoryRowInput" class="form-label">Floor</label>
                        <select @change="console.log(selectedFloor)" v-model="selectedFloor" class="w-100" style="height: 38px; border-radius: 8px">
                            <option v-for="(item, indexArray) in floors" :key="indexArray" :value="item.index">{{ item.index }}</option>
                        </select>
                    </div>

                    <div v-if="selectedFloor && floors[selectedFloor - 1].rows.length > 0" class="mb-2">
                        <label for="categoryRowInput" class="form-label">Row</label>
                        <select @change="console.log(selectedRow)" v-model="selectedRow" style="height: 38px; width: 100%; border-radius: 8px">
                            <option v-for="(item, index) in floors[selectedFloor - 1].rows" :key="index"  :value="item._id">{{ item.index }}</option>
                        </select>
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
