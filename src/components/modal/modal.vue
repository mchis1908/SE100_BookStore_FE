<style scoped src="./modal.css"></style>
<script lang="ts" src="./modal.ts"></script>

<template>
    <div ref="formatted-modal" class="modal fade" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title w-100" id="ModalLabel">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                {{ content }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="button-outline" data-bs-dismiss="modal">Close</button>
                    <button type="button" :class="isDangerAction ? 'button-danger' : 'button-solid'" @click="handleClickActionButton">{{ actionButtonTitle }}</button>
                </div>
            </div>
        </div>
    </div>
</template>