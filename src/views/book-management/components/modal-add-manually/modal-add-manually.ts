import { Modal } from 'bootstrap'
import { Vue } from 'vue-class-component'

export default class ModalAddManually extends Vue {
    public isShowModalCategories: any = false

    public async openModal() {
        const myModal = new Modal(this.$refs["add-book-manually-modal"] as any)
        myModal.show()
    }

    public toggleModalCategories() {
        this.isShowModalCategories = !this.isShowModalCategories
    }
}