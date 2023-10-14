<style scope src="./modal-setting.css"></style>
<script lang="ts" src="./modal-setting.ts"></script>

<template>
    <div class="modal fade" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="min-width:850px">
            <div class="modal-content" style="padding:24px; border-radius:16px">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Setting Salary Scale</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="addVisible = false"></button>
                </div>
                <div class="d-flex flex-column" style="gap:16px; margin:16px">
                    <div class="d-flex justify-content-end">
                        <div class="button-solid-small d-flex flex-row align-items-center" @click="addVisible = !addVisible" style="width:150px; gap:8px">
                            <i class="bi-plus-circle-fill"></i>
                            New Scale
                        </div>
                    </div>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr class="center">
                                <th scope="col">Scale</th>
                                <th scope="col">Coefficient</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr class="book-row center" v-for="(item, index) in scaleArr" :key="index">
                                <td>{{ item?.index }}</td>
                                <td>{{ item?.coefficient }}</td>
                                <td style="width:50px">
                                    <i class="bi-trash delete-item" style="color:red; font-size:20px" @click="handleDeleteScale(item)"></i>
                                </td>
                            </tr>
                            <tr v-if="addVisible" class="book-row center">
                                <td>{{scaleArr?.length +1}}</td>
                                <td>
                                    <input class="add-scale" type="number" v-model="newScale" />
                                </td>
                                <td style="width:50px">
                                    &nbsp;
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-flex flex-row justify-content-end" style="gap:12px">
                    <button type="button" class="button-outline" data-bs-dismiss="modal" @click="addVisible = false">Close</button>
                    <button type="button" :class="[(addVisible && newScale!==0) ? '':'button-disabled','button-solid']" @click="handleAddScale">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>