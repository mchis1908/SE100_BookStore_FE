import { Vue, Options } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import { Modal } from 'bootstrap'
import ModalAddManually from "@/views/book-management/components/modal-add-manually/modal-add-manually";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Barcode from '@/components/barcode/barcode.vue'
@Options({
    components: {
        Barcode
    },
})

export default class ModalDetailInvoice extends Vue {
    public invoiceDetail:any=ModalAddManually;
    public unsubscribe!: any;

    public async mounted() {
        this.handleSubscribe()
    }

    public unmounted() {
        this.unsubscribe()
    }

    public handleSubscribe() {
        this.unsubscribe = this.$store.subscribe(async (mutation: any, state: any) => {
            if (mutation.type === 'setInvoice') {
                this.getData(mutation.payload);
            }
        })
    }

    public async getData(id:any){
        let payload = { 
            id: id,
        };
        let res = await this.$store.dispatch(
            MutationTypes.GET_DETAIL_INVOICE,
            payload
        );
        if(res.status ===200){
            this.invoiceDetail= res.data.data
        }
    }

    public async openModal() {
        const myModal = new Modal(this.$refs["modal-detail-invoice"] as any)
        myModal.show()
    }

    print(): void {
        const contentToPrint = document.getElementById('content-to-print');
        if (contentToPrint) {
            html2canvas(contentToPrint).then((canvas) => {
                document.body.appendChild(canvas);
                const imgData = canvas.toDataURL("image/jpeg");
                const doc = new jsPDF();
                doc.addImage(imgData, 'JPEG', 10, 10, 180, 0);
                doc.save('Invoice ID:' + this.invoiceDetail?._id);
            });
        } else {
            console.error('Element with id')
        }
    }

    public handleCancel(){
        if(this.$route.path==='/selling-books')window.location.reload()
    }
    
}