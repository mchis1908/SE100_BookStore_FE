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
                this.fileInput1 = []
                this.copiedBook = JSON.parse(JSON.stringify(val));
                if (this.copiedBook["image"]) {
                    this.fileInput1.push(this.copiedBook["image"])
                }
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
    public userData: any=null;

    public isCopiedId: any = false
    public copiedBook: any = {}
    public isShowModalCategories: any = false
    public allCategories: any = []
    public seletectedCategory: any = []
    public fileInput:any = [];
    public fileInput1:any = [];
    public imagesNotUpload = new FormData();

    async beforeMount() {
        this.userData = this.$store.state.userData
        await this.fetchCategories()
    }

    public async openModal() {
        const myModal = new Modal(this.$refs["details-book-modal"] as any);
        document.body.appendChild(document.getElementById('details-book-modal') as any);
        myModal.show();
    }

    public handleCopyId() {
        navigator.clipboard.writeText(this.bookItem.barcode).then(() => {
            toast.success('Copied to clipboard')
            this.isCopiedId = true
        })

        setTimeout(() => {
            this.isCopiedId = false
        }, 3000)
    }

    public async handleUpdateBook() {
        let resImage = await this.$store.dispatch(MutationTypes.UPLOAD_MULTIPLE_IMAGES, this.imagesNotUpload)
        if (resImage.status === 200) {
            this.copiedBook["image"] = resImage.data.images[0]
        }
        this.copiedBook["bookId"] = await this.bookItem._id
        this.copiedBook["categories"] = this.seletectedCategory
        let res =  await this.$store.dispatch(MutationTypes.UPDATE_A_BOOK, this.copiedBook)

        if (res.status === 200) {
            toast.success(res.data.message)
            console.log("res", res)
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

    public selectedFilesFull:any=[];
    public async onFileSelected(event: Event){
        const selectedFiles: any = (event.target as HTMLInputElement).files;

        for (let i = 0; i < selectedFiles.length; i++) {
        this.selectedFilesFull.push(selectedFiles[i]);
        }
        this.imagesNotUpload=new FormData();
        this.fileInput=[];
        this.fileInput1=[];
        if (this.selectedFilesFull) {
        for (let i = 0; i < this.selectedFilesFull.length; i++) {
            const file = this.selectedFilesFull[i];

            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
            const fileURL = URL.createObjectURL(file);
            this.fileInput.push(file);
            const reader = new FileReader();
            reader.onload = () => {
                this.fileInput1.push(reader.result);
            };
            reader.readAsDataURL(file);
            this.imagesNotUpload.append('images', this.fileInput[i]);
            }else toast.error("Invalid file");
        }
        }
    }
}