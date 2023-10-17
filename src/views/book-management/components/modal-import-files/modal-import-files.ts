import { Modal } from 'bootstrap'
import readXlsxFile from 'read-excel-file'
import { Vue } from 'vue-class-component'
import { toast } from 'vue3-toastify'

export default class ModalImportFiles extends Vue {
    public fileData: any = []
    public quantity: number = 0

    public async openModal() {
        const myModal = new Modal(this.$refs["import-files-modal"] as any)
        myModal.show()
    }

    public handleChangeFile(event: any) {
        readXlsxFile(event.target.files[0]).then((rows: any) => {
            this.fileData = rows
          })
    }

    public async handleImportFile() {
        const arrayOfObjects = this.fileData.map((item: any) => {
            return {
                name: item[0],
                publishingYear: item[1],
                author: item[2],
                publisher: item[3],
                translator: item[4],
                barcode: item[5],
                categories: item[6].split(', '),
                quantity: item[7],
                importPrice: item[8]
            }
        })

        const bookList = {
            books: arrayOfObjects,
            supplier: this.$store.state.userData.data._id
        }
        console.log("fileData", bookList)

        let res = await this.$store.dispatch('CREATE_LIST_BOOKS', {
            books: arrayOfObjects.slice(1),
        })

        console.log("res", res)

        if(res.status === 200) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }
}