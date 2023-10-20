import { Modal } from 'bootstrap'
import { Vue } from 'vue-class-component'

export default class ModalAddEvent extends Vue {
    public async openModal() {
        const myModal = new Modal(this.$refs["add-new-event-modal"] as any)
        myModal.show()
    }
}