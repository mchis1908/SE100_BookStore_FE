<style scoped src="./modal-import-files.css"></style>
<script lang="ts" src="./modal-import-files.ts"></script>

<template>
    <div class="modal fade" ref="import-files-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Add new books</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="modal-body text-start">
                        <input @change="handleChangeFile" type="file" class="file-input w-100" />
                    </div>
    
                    <table v-if="fileData.length > 0" class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col" v-for="(item, index) in fileData[0]" :key="index">{{item}}</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="(item, indexRow) in fileData.slice(1)" :key="indexRow">
                                <td class="cell-info" v-for="(cell, index) in item" :key="index">{{cell}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button v-if="fileData.length > 0" class="btn btn-primary" @click="handleImportFile">Import</button>
                </div>
            </div>
        </div>
    </div>
</template>
