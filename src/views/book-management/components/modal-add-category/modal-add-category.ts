import { MutationTypes } from '@/store/mutation-types'
import { Modal } from 'bootstrap'
import { Vue } from 'vue-class-component'
import { toast } from 'vue3-toastify'

export default class ModalAddCategory extends Vue {
    public floors: any = []
    public rows: any = []
    public selectedFloor: any = 0
    public categoryName: any = ''
    public selectedRow: any = ''

    public async openModal() {
        const myModal = new Modal(this.$refs["add-category-modal"] as any)
        myModal.show()
    }
    
    beforeMount(): void {
        this.getFloors()
        this.getRows()
    }

    public async getFloors() {
        const response = await this.$store.dispatch(MutationTypes.GET_ALL_FLOORS)
        if (response) {
            this.floors = await response.data.data
        }

        console.log("this.floors", this.floors)
    }

    public async getRows() {
        const response = await this.$store.dispatch(MutationTypes.GET_ALL_ROWS)
        if (response) {
            this.rows = await response.data.data
        }
    }

    public async handleAddCategory() {
        const response = await this.$store.dispatch(MutationTypes.CREATE_CATEGORY, {
            name: this.categoryName,
            row: this.selectedRow
        })

        if (response.status === 200) {
            toast.success('Create category successfully');
        } else  {
            toast.error("There is an error. Please try again!")
        }
    }
}