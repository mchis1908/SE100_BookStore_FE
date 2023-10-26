<style scope src="./modal-detail-preorder.css"></style>
<script lang="ts" src="./modal-detail-preorder.ts"></script>

<template>
    <div class="modal fade" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="min-width:850px">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">Pre-Order Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="d-flex flex-column" style="gap:16px; margin:16px; overflow:auto">
                    <div class="d-flex flex-row" style="gap:32px">
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Pre-Order ID:</p>
                                <input class="input" :value="preDetail?._id" style="height:30px" type="text" disabled/>
                            </div>
                        </div>
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Expired Date:</p>
                                <input class="input" :value="preDetail?.expirationDate?.slice(0,10)" style="height:30px" type="text" disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-row" style="gap:32px">
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Customer:</p>
                                <input class="input" :value="preDetail?.customer?.name" style="height:30px" type="text" disabled/>
                            </div>
                        </div>
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field " style="height:30px">
                                <p class="text-start d-flex align-items-center" style="height:30px; font-weight:600">Creater:</p>
                                <input class="input" :value="preDetail?.employee?.name" style="height:30px" type="text" disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-row" style="gap:32px">
                        <div class="col d-flex flex-column" style="gap:16px">
                            <div class="input-field">
                                <p class="text-start d-flex align-items-start" style="height:100%; font-weight:600">Note:</p>
                                <textarea class="input" :value="preDetail?.note" type="text" disabled></textarea>
                            </div>
                        </div>
                    </div>
                    <hr style="margin: 5% 10%; border: 0.5px solid #E5E6E6; opacity: 1;"/>
                    <p class="text-start text-title-1">List Book</p>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr class="text-start">
                                <th scope="col">Book Name</th>
                                <th scope="col">Author</th>
                                <th scope="col">Publisher</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr class="book-row text-start" v-for="(item, index) in preDetail?.preOrderBookDetails" :key="index">
                                <td>{{item?.book?.name}}</td>
                                <td>{{item?.book?.author}}</td>
                                <td>{{item?.book?.publisher}}</td>
                                <td>{{item?.quantity}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>