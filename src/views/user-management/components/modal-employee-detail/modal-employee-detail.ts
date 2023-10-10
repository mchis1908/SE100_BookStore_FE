import { Vue, Options } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
    watch:{
        userInput: {
            handler(val, oldVal) {
              this.handleHasChanged();
            },
            deep: true,
        },
    }
})

export default class ModalEmployeeDetail extends Vue {
    public userInput:any={
        name: "",
        email: "",
        address: "",
        phone: "",
        birthdate: "",
    }
    public isChanged:any=false;
    public customer:any=null;
    public unsubscribe!: any;

    public async mounted() {
        this.handleSubscribe()
    }

    public unmounted() {
        this.unsubscribe()
    }

    public handleSubscribe() {
    this.unsubscribe = this.$store.subscribe(async (mutation: any, state: any) => {
            if (mutation.type === 'setEmployee') {
                this.customer = mutation.payload
                this.getData();
            }
        })
    }

    public getData(){
        this.userInput={
            name: this.customer?.name,
            email: this.customer?.email,
            address: this.customer?.address,
            phoneNumber: this.customer?.phoneNumber,
            birthdate: this.customer?.birthdate?.slice(0,10) ?? null,
        }
        console.log('abc',this.userInput)
    }

    public handleHasChanged(){
        this.isChanged = false;
        if(
            (
                this.userInput.name!== this.customer?.name ||
                this.userInput.email!== this.customer?.email ||
                this.userInput.address!== this.customer?.address ||
                this.userInput.phoneNumber!== this.customer?.phoneNumber ||
                this.userInput.birthdate!== (this.customer?.birthdate?.slice(0,10)?? null)
            ) &&
            ( this.userInput.name!== '' &&
                this.userInput.email!== '' &&
                this.userInput.phoneNumber!== ''
            )
        )
        this.isChanged = true;
    }
    public async handleUpdate() {
        const payload = {
            customer_id: this.customer.user._id,
            name: this.userInput.name,
            email: this.userInput.email,
            address: this.userInput.address,
            phoneNumber: this.userInput.phoneNumber,
            birthdate: this.userInput.birthdate,
        };
        const res = await this.$store.dispatch(
          MutationTypes.UPDATE_CUSTOMER,
          payload
        );
        if(res.status ===200){
            toast.success('Successfully updated');
            window.location.reload();
        }
    }
}