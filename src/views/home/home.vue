
<style scoped src="./home.css"></style>
<script lang="ts" src="./home.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            <div class="home-container" style="overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <div class="d-flex flex-column align-items-start" style="gap:8px">
                    <p class="areaContent-title">New Events</p>
                    <Splide class="splideSkill" :options="options">
                        <SplideSlide data-splide-interval="1500" class="col-12" v-for="(item,index) in events" :key="index">
                            <div class="event-container">
                                <img v-if="item?.image" :src="item?.image" style="width:100%; height: 250px; object-fit:contain; border-radius: 16px;">
                                <img v-else src="@/assets/event/banner.png" style="width:100%; height: 250px; object-fit:contain; border-radius: 16px;">
                                <p style="font-weight:600; font-size:20px; color:#065471">{{formatDate(item?.startAt)}}-{{formatDate(item?.endAt)}}</p>
                            </div>
                        </SplideSlide>
                    </Splide>
                </div>
                <!-- ---- -->
                <BookPage />
            </div>
        </div>
    </div>
</template>