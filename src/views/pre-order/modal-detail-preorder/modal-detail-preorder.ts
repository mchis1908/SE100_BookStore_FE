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
        // this.preDetail={
        //     _id: "653a111b5b7da57770ed15b1",
        //     customer: {
        //         _id: "652a93c17391381dbf02cc09",
        //         name: "Chi Test 2",
        //         user: {
        //             _id: "652a93c17391381dbf02cc07",
        //             rank: "bronze",
        //             point: 254.45552999999995
        //         },
        //         refPath: "customers"
        //     },
        //     employee: {
        //         _id: "652e80a3a3a28064ba14c6cd",
        //         name: "testerK"
        //     },
        //     expirationDate: "2023-11-08T00:00:00.000Z",
        //     note: "Test 3",
        //     preOrderBookDetails: [
        //         {
        //             _id: "653a111a5b7da57770ed15ad",
        //             book: {
        //                 _id: "652deee079f142bdca832c28",
        //                 name: "Tấm cám",
        //                 author: "Nguyen Nhat Anh",
        //                 publisher: "Le Thanh Trong"
        //             },
        //             quantity: 1
        //         },
        //         {
        //             _id: "653a111a5b7da57770ed15ae",
        //             book: {
        //                 _id: "652c05464a8efbb0d154fa77",
        //                 name: "horor book",
        //                 author: "horor author",
        //                 publisher: "horror publisher"
        //             },
        //             quantity: 2
        //         }
        //     ],
        //     createdAt: "2023-10-26T07:11:23.032Z",
        //     updatedAt: "2023-10-26T07:11:23.032Z"
        // }
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