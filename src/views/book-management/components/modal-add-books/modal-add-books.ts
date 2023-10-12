import { Vue, Options } from 'vue-class-component'
import ModalImportFiles from '../modal-import-files/modal-import-files.vue'
import ModalAddManually from '../modal-add-manually/modal-add-manually.vue';
import { Modal } from "bootstrap";
@Options({
    components: {
        ModalImportFiles,
        ModalAddManually
    },
})
export default class ModalAddBooks extends Vue {
    public async openModal() {
        const myModal = new Modal(this.$refs["add-new-book-modal"] as any)
        myModal.show()
    }

    public handleImportFiles() {
        (this.$refs['import-files-component'] as any).openModal()
    }

    public handleAddManually() {
        (this.$refs['add-manually-component'] as any).openModal()
    }
}