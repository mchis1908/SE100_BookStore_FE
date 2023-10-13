import { Modal } from 'bootstrap'
import readXlsxFile from 'read-excel-file'
import { Vue } from 'vue-class-component'

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

    public handleImportFile() {
        const arrayOfObjects = this.fileData.map((item: any) => {
            return {
                name: item[0],
                year: item[1],
                author: item[2],
                description: item[3]
            }
        })

        const bookList = {
            books: arrayOfObjects,
            supplier: this.$store.state.userData.data._id
        }
        console.log("fileData", bookList)
    }
}