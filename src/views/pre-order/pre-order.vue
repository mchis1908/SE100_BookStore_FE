
<style scoped src="./pre-order.css"></style>
<script lang="ts" src="./pre-order.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header />
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2" />
            <div class="col-10 d-flex flex-column" style="padding:24px;overflow-y: scroll; overflow-x: hidden; z-index:1"
                v-motion-slide-left>
                <ul class="nav nav-pills mb-1" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">Pre-Order</button>
                    </li>
                    <li class="nav-item" role="presentation" style="margin-left: 0.1vw;">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Pre-List</button>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent"
                    style="background: #ffffff; border-radius: 16px; min-height: 100%; overflow-y: auto;gap:12px; position:relative">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
                        style="padding: 12px 24px; gap:12px; min-height: 100%;">
                        <div class="customer-content" id="customer-content"
                            style="width: 50%; padding:12px; gap:12px; position:relative; margin-left: 5vw; margin-top: 2vh;">
                            <div class="input-field align-items-center" style="gap:16px">
                                <div class="d-flex justify-content-start align-items-center"
                                    style="font-weight:600; font-size:14px">Customer:</div>
                                <input v-if="!selectCustomer" class="search-input input"
                                    placeholder="Enter customer information" v-model="customerInput" />
                                <div v-else style="
                                    display: flex;
                                    height: 40px;
                                    padding: 8px;
                                    align-items: center;
                                    gap: 16px;
                                    align-self: stretch;
                                    border-radius: 12px;
                                    outline: 1px solid var(--neutral-06-day, #D6D6D6);">
                                    <div class="d-flex flex-row p-1 gap-2"
                                        style="border-radius: 8px; background: var(--second-04, #E8F3EC); width: fit-content;">
                                        <p>{{ selectCustomer?.name }}</p>
                                        <img src="@/assets/selling-books/remove.svg" style="cursor:pointer"
                                            @click="handleRemoveCustomer()" />
                                    </div>
                                </div>
                            </div>
                            <div style="position:relative">
                                <div v-if="customerInput && suggest?.length !== 0"
                                    class="text-start p-2 d-flex flex-column suggest">
                                    <div class="d-flex flex-column suggest-item" v-for="(item, index) in suggest"
                                        :key="index" @click="handleSelectCustomer(item)" style="cursor:pointer; gap:8px">
                                        <p
                                            style="color: var(--neutral-darkest, #2B2B2B); font-size: 16px; font-weight: 600; line-height: 150%;">
                                            Name: {{ item?.name || 'N/A' }}</p>
                                        <p
                                            style="color: var(--neutral-darkest, #ADADAD); font-size: 14px; font-weight: 400; line-height: 150%;">
                                            Phone: {{ item?.phoneNumber || 'N/A' }}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="input-field"
                            style="width: 30%; padding:12px; gap:16px; position:relative; margin-left: 5vw;">
                            <p class="text-start" style="height:30px; font-weight:600">Expire day:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <input class="input" v-model="Expireday" style="height:35px" type="date" />
                            </div>
                        </div>
                        <div class="book-input-field"
                            style="width: 65%; padding: 12px; display: flex; gap: 4vw; position: relative; margin-left: 5vw;">
                            <div class="book-input-pre-title">
                                <p class="text-start" style="height: 30px; font-weight: 600;">Books:</p>
                            </div>
                            <div class="book-input-pre-content"
                                style="width: 100%; padding: 12px; display: flex; gap: 16px; position: relative;">
                                <!-- Phần bên trái -->
                                <div class="left-panel" style=" flex: 1; display: flex; flex-direction: column; gap: 5px;">
                                    <!-- Danh sách các đối tượng được chọn từ bên phải -->
                                    <div class="selected-items"
                                        style="min-height: 30vh;flex: 1; border: 1px solid #ccc; border-radius: 5px;">
                                        <!-- Ví dụ danh sách các đối tượng -->
                                        <div class="selected-item">Item 1</div>
                                        <div class="selected-item">Item 2</div>
                                        <!-- Thêm các mục khác tùy ý -->
                                    </div>
                                </div>
                                <!-- Button Add và Remove nằm giữa hai ô -->
                                <div class="button-container"
                                    style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
                                    <button class="add-button"
                                        style="border-radius: 5px; width: 6vw; border: 0.5px solid #ccc;">Add</button>
                                    <button class="remove-button"
                                        style="border-radius: 5px; width: 6vw; border: 0.5px solid #ccc;">Remove</button>
                                </div>
                                <!-- Phần bên phải -->
                                <div class="right-panel" style="flex: 1; display: flex; flex-direction: column;gap: 5px;">
                                    <!-- Ô search -->
                                    <input class="search-input" v-model="search_q" type="text"
                                        placeholder="Enter book informations" @change="fetchBooks"
                                        style="border-radius: 5px; padding: 4px;">
                                    <!-- Select box -->
                                    <select v-model="categoryID" id="filter-category" class="form-select"
                                        @change="fetchBooks" aria-label="Default select example"
                                        style="border-radius: 5px; padding: 4px;">
                                        <option value="">All</option>
                                        <option v-for="category in allCategories" :key="category._id" :value="category._id">
                                            {{
                                                category.name }}</option>
                                    </select>
                                    <!-- Ô chữ nhật để hiển thị giá trị được tìm kiếm -->
                                    <div class="search-result"
                                        style="flex: 1; border: 1px solid #ccc; border-radius: 5px; overflow-y: auto; max-height: 200px;">
                                        <ul style="list-style: none; padding: 0; margin: 0;">
                                            <li v-for="(book, index) in books" :key="book._id"
                                                :class="index % 2 === 0 ? 'even-li' : 'odd-li'"
                                                style="padding: 4px; border-bottom: 0.5px solid #ccc;">
                                                <p
                                                    style="color: var(--neutral-darkest, #2B2B2B); font-size: 16px; font-weight: 600; line-height: 150%; margin: 0;text-align:left">
                                                    {{ book?.name || 'N/A' }}
                                                </p>
                                                <p
                                                    style="color: var(--neutral-darkest, #ADADAD); font-size: 14px; font-weight: 400; line-height: 150%; margin: 0;text-align:left">
                                                    {{ book?.author || 'N/A' }}
                                                </p>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="input-field"
                            style="width: 85%; padding:12px; gap:16px; position:relative; margin-left: 5vw;">
                            <p class="text-start" style="height:30px; font-weight:600">Note:</p>
                            <div class="d-flex flex-column" style="gap:4px">
                                <textarea class="input" style="min-height:100px" v-model="Note" type="text"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                        style="padding: 12px 24px;gap:12px">
                        abc
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>