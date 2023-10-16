import { Modal } from 'bootstrap'
import { Vue } from 'vue-class-component'

export default class ModalAddCategory extends Vue {
    public async openModal() {
        const myModal = new Modal(this.$refs["add-category-modal"] as any)
        myModal.show()
    }
}