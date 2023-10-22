<style scoped src="./event-item.css"></style>

<script lang="ts" src="./event-item.ts"></script>

<template>
    <div class="event-item-container">
        <img v-if="eventData?.image" :src="eventData?.image" class="img-fluid rounded-top event-image" alt="event image">
        <img v-else src="@/assets/event/png/event-no-image.png" class="img-fluid rounded-top event-image" alt="event image">
        <div class="content-event-container">
            <p class="event-title">{{ eventData?.name }}</p>
            <p>{{ formatDate(eventData?.startAt) }} - {{ formatDate(eventData?.endAt) }}</p>
        </div>

        <div class="sale-container">
            <p>{{ eventData?.eventDiscountValue * 100 }}% OFF</p>
        </div>

        <span v-if="isUpcoming" class="badge text-bg-danger">Upcoming</span>
    </div>
</template>