import { MutationTypes } from '@/store/mutation-types';
import { Modal } from 'bootstrap'
import { Vue, Options } from 'vue-class-component'
import { toast } from 'vue3-toastify'
import FormattedModal from '@/components/modal/modal.vue';

@Options({
    props: {
        bookItem: Object
    },
    watch: {
        bookItem: {
            handler: function (val: any, oldVal: any) {
                this.copiedBook = JSON.parse(JSON.stringify(val));
                if (this.copiedBook && this.copiedBook.categories && Array.isArray(this.copiedBook.categories)) {
                    this.seletectedCategory = this.copiedBook.categories.map((item: any) => item._id);
                  } else {
                    this.seletectedCategory = [];
                  }
            },
            deep: true,
            immediate: true
        }
    },
    components: {
        FormattedModal
    }
})

export default class ModalDetailsBook extends Vue {
    public bookItem!: any

    public isCopiedId: any = false
    public copiedBook: any = {}
    public isShowModalCategories: any = false
    public allCategories: any = []
    public seletectedCategory: any = []

    async beforeMount() {
        await this.fetchCategories()
    }

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
        this.copiedBook["categories"] = this.seletectedCategory
        let res =  await this.$store.dispatch(MutationTypes.UPDATE_A_BOOK, this.copiedBook)

        if (res.status === 200) {
            toast.success(res.data.message)
            window.location.reload()
        } else {
            toast.error(res.data.message)
        }
    }

    public handleOpenModalDeleteBook() {
        (this.$refs['modal-delete-book-component'] as any).openModal()
    }

    public async handleDeleteBook() {
        let res = await this.$store.dispatch(MutationTypes.DELETE_A_BOOK, {
            bookId: this.copiedBook._id
        })
        if (res.status === 200) {
            toast.success(res.data.message)
            window.location.reload()
        } else {
            toast.error(res.data.message)
        }
    }

    public toggleModalCategories(event: any) {
        this.isShowModalCategories = !this.isShowModalCategories
        console.log("abc")
    }

    public async fetchCategories() {
        let res = await this.$store.dispatch(MutationTypes.GET_ALL_CATEGORIES)
    
        this.allCategories = res.data.data
    }

    public handleCheckCategory(itemId: any) {
        return this.seletectedCategory.some((item: any) => item._id === itemId)
    }
}