import { Vue, Options } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import { Modal } from 'bootstrap'
import ModalAddManually from "@/views/book-management/components/modal-add-manually/modal-add-manually";
import { VueToPrint } from "vue-to-print";
import { useVueToPrint } from "vue-to-print";
import { reactive, ref } from "vue";

const componentRef = ref();

const handleAfterPrint = () => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  };
  
  const handleBeforePrint = () => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  };
  
  const handleOnBeforeGetContent = () => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
  
    return new Promise<void>((resolve) => {
      setTimeout(() => {
  
        resolve();
      }, 2000);
    });
};
const { handlePrint } = useVueToPrint({
    content: () => componentRef.value,
    documentTitle: "AwesomeFileName",
    onAfterPrint: handleAfterPrint,
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    removeAfterPrint: false
});

@Options({
    props: {

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

    public handlePrint(){
      
    }

    public handleCancel(){
        if(this.$route.path==='/selling-books')window.location.reload()
    }
    
}