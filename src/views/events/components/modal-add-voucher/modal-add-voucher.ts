import { MutationTypes } from "@/store/mutation-types";
import { Modal } from "bootstrap";
import { Vue } from "vue-class-component";
import { toast } from "vue3-toastify";

export default class ModalAddVoucher extends Vue {
    public voucher: any = {}

    public async openModal() {
        const myModal = new Modal(this.$refs["add-new-voucher-modal"] as any)
        myModal.show()
    }

    public async handleAddNewVoucher() {
        let res = await this.$store.dispatch(MutationTypes.CREATE_A_VOUCHER, this.voucher)
        
        if (res.status === 201) {
            toast.success(res.data.message)
            window.location.reload()
        } else {
            toast.error(res.data.message)
        }
    }
}