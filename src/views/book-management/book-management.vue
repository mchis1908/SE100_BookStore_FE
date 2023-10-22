<style scoped src="./book-management.css"></style>

<script lang="ts" src="./book-management.ts"></script>

<template>
<ModalAddBooks id="modalAddBooks" ref="add-new-books-component" />
<ModalAddCategory ref="modal-add-category-component"/>
<ModalDetailsBook ref="details-book-component" :bookItem="bookItem" />

<div class="background-feature d-flex flex-column">
    <Header />
    <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
        <MenuDashBoard class="col-2" />
        <div class="col-10 d-flex flex-column" style="padding:24px; overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
            <ul class="nav nav-pills mb-1" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Books</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Categories</button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent" style="background:#fff; border-radius: 16px;">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" style="padding: 12px 24px; gap:12px; min-height: 100%;">
                    <div class="w-100 d-flex justify-content-between align-items-center mb-5">
                        <div class="col-5 d-flex flex-row" style="gap:16px">
                            <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                            <input v-model="searchQuery" class="search-input input" placeholder="Enter your input"/>
                        </div>
                        <button class="btn-add" @click="handleAddNewBook"><i class="bi bi-plus-lg"></i> Add new books</button>
                    </div>

                    <table class="table table-striped table-hover">
                        <thead>
                            <tr class="text-start">
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Categories</th>
                                <th scope="col">Author</th>
                                <th scope="col">Publish Year</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr class="book-row text-start" v-for="(item, index) in allBooks" :key="index" @click="handleClickBookRow(index)">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ item["name"] }}</td>
                                <td v-if="item['categories'].length > 0">
                                    <p v-for="(category, indexCategory) in item['categories']" :key="indexCategory">{{ item["categories"][indexCategory].name }}</p>
                                </td>
                                <td v-else></td>
                                <td>{{ item["author"] }}</td>
                                <td>{{ item["publishingYear"] }}</td>
                                <td>{{ item["quantity"] }}</td>
                                <td>{{ item["importPrice"] }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="pagination-container">
                        <div class="pagination-item" v-for="(item, index) in totalPages" :key="index" @click="currentPage = index + 1" :style="index + 1 === currentPage ? 'background-color: #065471; outline: none; color: #fff' : ''">
                            {{ index + 1  }}
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" style="padding: 12px 24px;gap:12px">
                    <div class="w-100 d-flex justify-content-between align-items-center">
                        <div class="col-5 d-flex flex-row" style="gap:16px">
                            <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                            <input v-model="searchQueryCategory" class="search-input input" placeholder="Enter your input"/>
                        </div>
                        <button class="btn-add" @click="handleAddNewCategory"><i class="bi bi-plus-lg"></i> Add new category</button>
                    </div>

                    <table class="table table-striped table-hover">
                        <thead>
                            <tr class="text-start">
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Floor Index</th>
                                <th scope="col">Floor</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr class="book-row text-start" v-for="(item, index) in allCategories" :key="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ item["name"] }}</td>
                                <td>{{ item["row"]["index"] }}</td>
                                <td>{{ item["row"]["floor"] }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="pagination-container">
                        <div class="pagination-item" v-for="(item, index) in totalPageCategories" :key="index" @click="currentPageCategories = index + 1" :style="index + 1 === currentPage ? 'background-color: #065471; outline: none; color: #fff' : ''">
                            {{ index + 1  }}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
</template>
