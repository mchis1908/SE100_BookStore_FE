
<style scoped src="./home.css"></style>
<script lang="ts" src="./home.ts"></script>

<template>
    <div class="background-feature d-flex flex-column">
        <Header/>
        <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
            
            <div class="home-container" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
                <div class="d-flex flex-column align-items-start" style="gap:8px">
                    <p class="areaContent-title">New Events</p>
                    <Splide class="splideSkill" :options="options">
                        <SplideSlide data-splide-interval="1500" class="col-12" v-for="(item,index) in 3" :key="index">
                            <div class="book-mostSale">
                                <img src="@/assets/dashboard/event-momo.webp" style="width:100%; height: 250px; object-fit:cover; border-radius: 16px;">
                            </div>
                        </SplideSlide>
                    </Splide>
                </div>
                <!-- ---- -->
                <BookPage/>
                
                
            </div>
        </div>
    </div>
</template>