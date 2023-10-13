import { Modal, Tooltip } from 'bootstrap'
import { Vue, Options } from 'vue-class-component'
import { toast } from 'vue3-toastify'

@Options({
    props: {
        bookItem: Object
    }
})

export default class ModalDetailsBook extends Vue {
    public bookItem!: any
    public isCopiedId: any = false

    public async openModal() {
        const myModal = new Modal(this.$refs["details-book-modal"] as any)
        myModal.show()
    }

    public handleCopyId() {
        navigator.clipboard.writeText(this.bookItem._id).then(() => {
            toast.success('Copied to clipboard')
            this.isCopiedId = true
        })

        setTimeout(() => {
            this.isCopiedId = false
        }, 3000)
    }
}