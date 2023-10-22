import { Modal } from 'bootstrap'
import { Vue, Options } from 'vue-class-component'
import Loading from '@/components/loading/loading.vue'
import { MutationTypes } from '@/store/mutation-types'
import { toast } from 'vue3-toastify'
@Options({
    props: {
        item: String
    },
    watch: {
        item: {
            handler: async function (val: any, oldVal: any) {
                await this.fetchData()
            }
        }
    },
    components: {
        Loading
    }
})
export default class ModalDetailsEvent extends Vue {
    public item!: any
    public isLoading: boolean = true
    public detailsEvent: any = {}
    public startDate: any = ''
    public searchBook: any = ''
    public bookList: any = []
    public isOpenModalBook: boolean = false

    mounted(): void {
        (this.$refs["details-event-modal"] as any).addEventListener('hidden.bs.modal', () => {
            this.isLoading = true
        })
    }

    public async openModal() {
        const myModal = new Modal(this.$refs["details-event-modal"] as any)
        myModal.show()
    }

    public async fetchData() {
        let response = await this.$store.dispatch('GET_DETAILS_EVENT', {
            eventId: this.item
        })

        if (response) {
            this.detailsEvent = await response.data.data
            this.detailsEvent.startAt = this.detailsEvent.startAt.split('T')[0]
            this.detailsEvent.endAt = this.detailsEvent.endAt.split('T')[0]
            this.isLoading = false
        }
    }

    public async handleSearchBook(event: any) {
        this.isOpenModalBook = true
        this.searchBook = await event.target.value
        if (this.searchBook === "") {
            this.isOpenModalBook = false
            return
        }
        let response = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS, {
            search_q: this.searchBook
        })

        if (response) {
            this.bookList = await response.data.data
            console.log(this.bookList)
        }
    }

    public handleSelectBook(book: any) {
        this.detailsEvent.discountBooks.some((item: any) => item._id === book._id) ? toast.error("Book already selected") : this.detailsEvent.discountBooks.push(book);
    }

    public handleDeselectBook(book: any) {
        this.detailsEvent.discountBooks.splice(book, 1)
    }

    public async handleSaveChanges() {
        let response = await this.$store.dispatch(MutationTypes.UPDATE_EVENT, this.detailsEvent)
        if (response) {
            toast.success(response.data.message)
            window.location.reload()
        } else {
            toast.error(response.data.message)
        }
    }
}