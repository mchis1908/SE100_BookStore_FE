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
        console.log("fileData", this.fileData)
    }

    public handleQuantityChange(indexRow: any) {
        // this.fileData[indexRow + 1].push(this.quantity)
        console.log("indexRow", this.quantity)
    }
}