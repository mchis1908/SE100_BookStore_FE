import { Vue, Options } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import { Modal } from 'bootstrap'
import ModalAddManually from "@/views/book-management/components/modal-add-manually/modal-add-manually";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Barcode from '@/components/barcode/barcode.vue'
import { fixedCurrency } from "@/utils/utils";
@Options({
    components: {
        Barcode
    },
    methods:{
        fixedCurrency
    }
})

export default class ModalDetailInvoice extends Vue {
    public invoiceDetail:any=ModalAddManually;
    public unsubscribe!: any;
    public cost:any=[];
    public subtotal:any=0;
    public voucherDiscount:any=0;
    public total:any=0;
    public selectVoucher:any=null
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
            this.invoiceDetail.invoiceDetails.forEach((item:any,index:any) => {
                const costValue = item?.quantity * item?.book?.salesPrice * (1 - item?.book?.discountValue);
                this.cost[index] = costValue;
            });
            this.subtotal = this.cost.reduce((acc:any, item:any) => acc + item, 0);
            if(this.invoiceDetail?.vouchers.length > 0)
            {
                await this.getDetailVoucher(this.invoiceDetail?.vouchers[0])
            }
            this.voucherDiscount = (this.selectVoucher?.discountValue ?? 0) * this.subtotal;
            this.total = this.subtotal- ((this.selectVoucher?.discountValue ?? 0) * this.subtotal);
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
                doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
                doc.save('Invoice ID:' + this.invoiceDetail?._id);
            });
        } else {
            console.error('Element with id')
        }
    }

    public handleCancel(){
        if(this.$route.path==='/selling-books')window.location.reload()
    }

    public async getDetailVoucher(id:any){
        let payload = { 
            id: id,
        };
        let res = await this.$store.dispatch(
            MutationTypes.GET_DETAIL_VOUCHER,
            payload
        );
        if(res.status ===200){
            this.selectVoucher= res.data.data
        }
    }
    
}