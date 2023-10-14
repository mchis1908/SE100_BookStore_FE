import { MutationTypes } from '@/store/mutation-types';
import { Modal, Tooltip } from 'bootstrap'
import { Vue, Options } from 'vue-class-component'
import { toast } from 'vue3-toastify'

@Options({
    props: {
        bookItem: Object
    },
    watch: {
        bookItem: {
            handler: function (val: any, oldVal: any) {
                this.copiedBook = JSON.parse(JSON.stringify(val));
            },
            deep: true,
            immediate: true
        }
    }
})

export default class ModalDetailsBook extends Vue {
    public bookItem!: any

    public isCopiedId: any = false
    public copiedBook: any = {}

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

    public async handleUpdateBook() {
        this.copiedBook["bookId"] = await this.bookItem._id
        let res =  await this.$store.dispatch(MutationTypes.UPDATE_A_BOOK, this.copiedBook)

        if (res.status === 200) {
            toast.success(res.data.message)
            window.location.reload()
        } else {
            toast.error(res.data.message)
        }
    }
}