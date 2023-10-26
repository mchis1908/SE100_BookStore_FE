import { Vue, Options } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import {
    isValidEmail,
} from "@/utils/utils";
import ModalAddManually from "@/views/book-management/components/modal-add-manually/modal-add-manually";
@Options({
    props: {

    },
})

export default class ModalDetailPreOrder extends Vue {
    public preDetail:any=ModalAddManually;
    public unsubscribe!: any;

    public async mounted() {
        this.handleSubscribe()
    }

    public unmounted() {
        this.unsubscribe()
    }

    public handleSubscribe() {
        this.unsubscribe = this.$store.subscribe(async (mutation: any, state: any) => {
            if (mutation.type === 'setPreOrder') {
                this.getData(mutation.payload);
            }
        })
    }

    public async getData(id:any){
        let payload = { 
            id: id,
        };
        let res = await this.$store.dispatch(
            MutationTypes.GET_PRE_BY_ID,
            payload
        );
        if(res.status ===200){
            this.preDetail= res.data.data
        }
}
}