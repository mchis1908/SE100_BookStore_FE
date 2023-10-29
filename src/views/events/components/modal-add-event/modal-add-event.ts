import { MutationTypes } from '@/store/mutation-types'
import { Modal, Tooltip } from 'bootstrap'
import { Vue } from 'vue-class-component'
import { toast } from 'vue3-toastify'

export default class ModalAddEvent extends Vue {
    public newEvent: any = {}
    public isOpenModalBook: boolean = false
    public querySearchBook: string = ""
    public listBooks: any = []
    public selectedBooks: any = []
    public fileInput:any = [];
    public fileInput1:any = [];
    public imagesNotUpload = new FormData();

    mounted(): void {
        const tooltip = new Tooltip(document.body, {
            selector: "[data-bs-toggle='tooltip']",
            trigger: 'hover'
          })
        tooltip.show()
        document.addEventListener('click', this.handleClickOutside);
    }

    public async openModal() {
        const myModal = new Modal(this.$refs["add-new-event-modal"] as any)
        myModal.show()
    }

    public async handleCreateEvent() {
        this.newEvent.discountBooks = this.selectedBooks.map((book: any) => book._id)
        let imagesURL = await this.$store.dispatch(MutationTypes.UPLOAD_MULTIPLE_IMAGES, this.imagesNotUpload)

        if (imagesURL) {
            this.newEvent.image = imagesURL.data.images[0]
            let res = await this.$store.dispatch(MutationTypes.CREATE_EVENT, this.newEvent)
            if (res.status === 200) {
                toast.success(res.data.message);
                window.location.reload();
            }else toast.error(res.data.message)
        }
    }

    public handleSelectBook(book: any) {
        this.selectedBooks.some((item: any) => item._id === book._id) ? toast.error("Book already selected") : this.selectedBooks.push(book);
    }

    public async handleOpenModalBook(event: any) {
        this.querySearchBook = await event.target.value
        if (this.querySearchBook === "") {
            this.isOpenModalBook = false
            return
        }

        let response = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS, {
            search_q: this.querySearchBook
        })

        if (response) {
            this.listBooks = response.data.data
        }
        this.isOpenModalBook = true
        console.log("event", this.listBooks)
    }

    public handleClickOutside = (event: any) => {
        if (this.isOpenModalBook && !event.target.closest('.book-input')) {
            this.isOpenModalBook = false;
        } 
    };

    public handleDeselectBook(index: number) {
        this.selectedBooks.splice(index, 1)
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

    public handleClearSearch() {
        this.isOpenModalBook = false;
        (document.getElementById("searchBook") as HTMLInputElement).value = ''
        document.getElementById("searchBook")?.focus()
    }
}