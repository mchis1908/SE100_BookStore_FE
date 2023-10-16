import { MutationTypes } from '@/store/mutation-types'
import { Modal } from 'bootstrap'
import { Vue } from 'vue-class-component'
import { toast } from 'vue3-toastify'

export default class ModalAddManually extends Vue {
    public allCategories: any = []
    public isShowModalCategories: any = false
    public book: any = {}
    public bookCategories: any = []
    public seletectedCategory: any = []

    beforeMount(): void {
        this.fetchCategories()
    }

    public async openModal() {
        const myModal = new Modal(this.$refs["add-book-manually-modal"] as any)
        myModal.show()
    }

    public toggleModalCategories(event: any) {
        this.isShowModalCategories = !this.isShowModalCategories
    }

    public checkValidForm() {
        if ((document.querySelector("#bookNameInput") as HTMLInputElement ).value === "" ||
            (document.querySelector("#bookAuthorInput") as HTMLInputElement ).value === "" ||
            (document.querySelector("#bookTranslatorInput") as HTMLInputElement ).value === "" ||
            (document.querySelector("#bookBarcodeInput") as HTMLInputElement ).value === "" ||
            (document.querySelector("#bookPublisherInput") as HTMLInputElement ).value === "" ||
            (document.querySelector("#bookPublishYearInput") as HTMLInputElement ).value === "" ||
            (document.querySelector("#bookQuantityInput") as HTMLInputElement ).value === "" ||
            (document.querySelector("#bookPriceInput") as HTMLInputElement ).value === "" ||
            (document.querySelector("#bookImportDateInput") as HTMLInputElement ).value === "") {
                (document.querySelector(".text-fill-all") as HTMLElement).style.display = "block"
            return false
        }

        return true
    }

    public async handleCreateBook() {
        if (this.checkValidForm()) {
            this.book["categories"] = this.seletectedCategory
            let res =  await this.$store.dispatch(MutationTypes.CREATE_A_BOOK, this.book)
            if (res.status === 201) {
                toast.success(res.data.message)
                window.location.reload()
            } else {
                toast.error(res.data.message)
            }
        }
    }

    public async fetchCategories() {
        let res = await this.$store.dispatch(MutationTypes.GET_ALL_CATEGORIES)
    
        this.allCategories = res.data.data
    }
}