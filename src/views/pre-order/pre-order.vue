
<style scoped src="./pre-order.css"></style>
<script lang="ts" src="./pre-order.ts"></script>

<template>
    <ModalDetailPreOrder id="detailInvoice"/>
    <div class="background-feature d-flex flex-column">
        <Header />
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <MenuDashBoard class="col-2" />
            <div class="col-10 d-flex flex-column" style="padding:24px;" v-motion-slide-left>
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
                    style="background: #ffffff; border-radius: 16px; min-height: 90%; overflow-y: auto;gap:12px; position:relative">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
                        style="padding: 24px; gap:12px; min-height: 100%;">
                        <div class="d-flex flex-column justify-content-center" style="gap:16px; padding: 0 10%">
                            <div class="d-flex flex-column">
                                <div class="input-field" style="gap:16px; width: 60%; margin: 0.5vh 0vh;">
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
                                            :key="index" @click="handleSelectCustomer(item)"
                                            style="cursor:pointer; gap:8px">
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


                            <div class="input-field" style="width: 40%; margin: 0.5vh 0vh;">
                                <div class="d-flex justify-content-start align-items-center"
                                    style="font-weight:600; font-size:14px">Expire date:</div>
                                <div class="d-flex flex-column" style="gap:4px">
                                    <input class="input" v-model="Expireday" style="height:35px" type="date" />
                                </div>
                            </div>
                            <div class="input-field" style="margin: 0.5vh 0vh;">
                                <div class="book-input-pre-title">
                                    <p class="text-start" style="height: 30px; font-weight: 600;">Books:</p>
                                </div>
                                <div class="book-input-pre-content"
                                    style="width: 100%; height: 300px;display: flex; gap: 16px; position: relative;">
                                    <div class="right-panel"
                                        style="flex: 1; display: flex; flex-direction: column;gap: 5px;">
                                        <input class="search-input" v-model="search_q" type="text"
                                            placeholder="Enter book informations" @change="fetchBooks"
                                            style="border-radius: 5px; padding: 4px;">
                                        <select v-model="categoryID" id="filter-category" class="form-select"
                                            @change="fetchBooks" aria-label="Default select example"
                                            style="border-radius: 5px; padding: 4px;">
                                            <option value="">All</option>
                                            <option v-for="category in allCategories" :key="category._id"
                                                :value="category._id">
                                                {{
                                                    category.name }}</option>
                                        </select>
                                        <div class="search-result"
                                            style="flex: 1; border: 1px solid #ccc; border-radius: 5px; overflow-y: auto;">
                                            <ul style="list-style: none; padding: 0; margin: 0;">
                                                <li v-for="(book, index) in books" :key="index"
                                                    :class="[itemSelectedAdd?._id === book?._id ? `highLight` : `basic`, ``]"
                                                    @click="generateAddSelectedBook(book)">
                                                    <p class="book-name"
                                                        :style="itemSelectedAdd?._id !== book?._id ? 'color:#2B2B2B' : 'color:#fff'">
                                                        {{ book?.name || 'N/A' }}
                                                    </p>
                                                    <p class="book-author"
                                                        :style="itemSelectedAdd?._id !== book?._id ? 'color:#ADADAD' : 'color:#fff'">
                                                        {{ book?.author || 'N/A' }}
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="button-container"
                                        style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
                                        <button class="add-button btnPre"
                                            style="border-radius: 5px; width: 6vw; border: 0.5px solid #ccc;padding: 2px;"
                                            @click="addToSelectedBooks()">Add</button>
                                        <button class="remove-button btnPre" @click="removeFromSelectedBooks()"
                                            style="border-radius: 5px; width: 6vw; border: 0.5px solid #ccc; padding: 2px;">Remove</button>
                                    </div>

                                    <div class="left-panel"
                                        style=" flex: 1; display: flex; flex-direction: column; gap: 5px;">
                                        <div class="selected-items"
                                            style="flex: 1; border: 1px solid #ccc; border-radius: 5px; overflow-y: auto;">
                                            <ul style="list-style: none; padding: 0; margin: 0;">
                                                <li v-for="(book, index) in selectedBooks" :key="index"
                                                    :class="[itemSelectedRemove?._id === book?._id ? `highLight` : `basic`, ``]"
                                                    >
                                                    <div class="li-content-pre">
                                                        <div class="li-book-info" @click="generateRemoveSelectedBook(book,index)">
                                                            <p class="book-name"
                                                                :style="itemSelectedRemove?._id !== book?._id ? 'color:#2B2B2B' : 'color:#fff'">
                                                                {{ book?.name || 'N/A' }}
                                                            </p>
                                                            <p class="book-author"
                                                                :style="itemSelectedRemove?._id !== book?._id ? 'color:#ADADAD' : 'color:#fff'">
                                                                {{ book?.author || 'N/A' }}
                                                            </p>
                                                        </div>
                                                        <input class="quantity-pre" type="number" :min="1"
                                                            v-model="quantity[index]" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-field">
                                <p class="text-start" style="height:30px; font-weight:600">Note:</p>
                                <div class="d-flex flex-column" style="gap:4px">
                                    <textarea class="input" style="min-height:100px" v-model="Note" type="text"></textarea>
                                </div>
                            </div>

                        </div>
                        <div class="btn-pre" style="margin-top: 5vh; display: flex; justify-content: end;">
                            <button class="btn-reset" @click="handleReset"
                                style="border-radius: 5px; padding: 6px; margin-right:2vw; border: 0.5px solid #ccc;">Reset</button>
                            <button class="btn-create " @click="createPreOrder"
                                style="border-radius: 5px; padding: 6px; margin-right:2vw; border: 0.5px solid #ccc;">Create</button>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                        style="padding: 24px; gap:12px; min-height: 100%;">
                        <div class="table-pre" style="height:600px; padding: 20px;">
                            <table class="table table-striped table-hover"
                        >
                        <thead>
                            <tr class="text-start">
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Rank</th>
                                <th scope="col">Expired Day</th>
                                <th scope="col">Creater</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr class="book-row text-start" 
                            v-for="(item, index) in preOrders" :key="index"
                            @click="handleDetailPre(item)"
                            >
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ item?.customer?.name }}</td>
                                <td>{{ item?.customer?.user?.rank }}</td>
                                <td>{{ item?.expirationDate?.slice(0,10) }}</td>
                                <td>{{ item?.employee?.name }}</td>
                            </tr>
                        </tbody>
                    </table>
                        </div>

                    <div class="pagination-container">
                        <div class="pagination-item" v-for="(item, index) in totalPages" :key="index" @click="currentPage = index + 1" :style="index + 1 === currentPage ? 'background-color: #065471; outline: none; color: #fff' : ''">
                            {{ index + 1  }}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>