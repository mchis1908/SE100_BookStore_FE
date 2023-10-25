<style scoped src="./book-page.css"></style>
<script lang="ts" src="./book-page.ts"></script>

<template>
    <ModalDetailsBook ref="details-book-component" :bookItem="bookItem" />
    <div class="d-flex flex-column">
        <div class="d-flex flex-row">
            <div class="col d-flex flex-row justify-content-start" style="gap:16px">
                <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
                <input class="search-input input" type="text" placeholder="Enter your input" style="width:500px" v-model="searchQuery"/>
            </div>
            <div class="filter" @click="showModalSortList = !showModalSortList">
                <p style="font-weight: 500; font-size: 16px; line-height: 100%;min-width: 100px; width: 100%">{{ categories[selectedSort]?.name }}</p>
                <img src="@/assets/home/arrowDown.svg" :style="showModalSortList ? 'transform: rotate(180deg)' : ''">
                <Transition name="slide-fade">
                    <div v-if="showModalSortList" class="modal-sort">
                        <div class="sort-item" v-for="(item, index) in categories" :key="index" @click="selectedSort = index" :style="selectedSort === index ? 'font-weight: 500; color: #065471' : ''">{{ item?.name }}</div>
                    </div>
                </Transition>
            </div>
        </div>
        <div class="book-container">
            <div class="book-item" v-for="(item, index) in books" :key="index" @click="handleClickBookRow(item)">
                <img v-if="item?.image" :src="item?.image" style="height:120px; object-fit:contain;z-index:0"/>
                <img v-else src="@/assets/book-page/book-default.png" style="height:120px; object-fit:contain;z-index:0"/>
                <div class="d-flex flex-column justify-content-center align-items-center" style="gap:8px; height:100%; ">
                    <div class="book-item-text">
                        <p>Name:</p>
                        <p>{{item?.name}}</p>
                    </div>
                    <div class="book-item-text">
                        <p>Author:</p>
                        <p>{{item?.author}}</p>
                    </div>
                    <div class="d-flex flex-row justify-content-between" style="width:100%">
                        <div :class="[item?.discountValue>0? 'book-item-text-line':'', 'book-item-text']">
                            <p>Price:</p>
                            <p>{{item?.salesPrice}}</p>
                        </div>
                        <div v-if="item?.discountValue>0" class="book-item-text-sale book-item-text justify-content-end">
                            <p>Price:</p>
                            <p>{{item?.salesPrice * (1- item?.discountValue)}}</p>
                        </div>
                    </div>
                    <div v-if="item?.discountValue>0" class="sale-container">
                        <p>{{item?.discountValue * 100 }}% OFF</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>