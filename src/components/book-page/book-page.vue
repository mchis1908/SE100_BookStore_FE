<style scoped src="./book-page.css"></style>
<script lang="ts" src="./book-page.ts"></script>

<template>
    <div class="d-flex flex-row">
        <div class="filter" @click="showModalSortList = !showModalSortList">
            <p style="font-weight: 500; font-size: 16px; line-height: 100%; width: 100%">{{ sortList[selectedSort] }}</p>
            <img src="@/assets/home/arrowDown.svg" :style="showModalSortList ? 'transform: rotate(180deg)' : ''">
            <Transition name="slide-fade">
                <div v-if="showModalSortList" class="modal-sort">
                    <div class="sort-item" v-for="(item, index) in sortList" :key="index" @click="selectedSort = index" :style="selectedSort === index ? 'font-weight: 500; color: #065471' : ''">{{ item }}</div>
                </div>
            </Transition>
        </div>
        <div class="col d-flex flex-row justify-content-end" style="gap:16px">
            <div class="d-flex justify-content-center align-items-center" style="font-weight:600; font-size:16px; color: #065471">Search:</div>
            <input class="search-input input" type="text" placeholder="Enter your input" style="width:300px"/>
        </div>
    </div>
    <div class="book-container">
        <div class="book-item" v-for="(item, index) in 18" :key="index">
            <img src="@/assets/home/dacnhatam-book.webp" style="height:120px; object-fit:contain"/>
            <div class="d-flex flex-column justify-content-center align-items-center" style="gap:8px; height:100%">
                <div class="book-item-text">
                    <p>Name:</p>
                    <p>Nguyen Duy Linhiiii</p>
                </div>
                <div class="book-item-text">
                    <p>Author:</p>
                    <p>Nguyen Duy Linh</p>
                </div>
                <div class="book-item-text">
                    <p class="">Price:</p>
                    <p class="">100.000</p>
                </div>
            </div>
        </div>
    </div>
</template>