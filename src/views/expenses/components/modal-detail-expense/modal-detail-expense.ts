import { Vue, Options } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
    watch:{
        userInput: {
            handler(val, oldVal) {
              this.handleValidInput();
            },
            deep: true,
        },
    }
})

export default class ModalAddCustomer extends Vue {
    public payload = new FormData();
    public userInput:any={
        subject: null,
        cost: null,
        description: null,
    }
    public expenses:any=null
    public invalidMessage:any={
        subject: "",
    }
    public validInput:any=false;
    public unsubscribe!: any;

    public async mounted() {
        this.handleSubscribe()
    }

    public unmounted() {
        this.unsubscribe()
    }

    public handleSubscribe() {
        this.unsubscribe = this.$store.subscribe(async (mutation: any, state: any) => {
            if (mutation.type === 'setExpense') {
                console.log(mutation.payload);
                this.expenses= mutation.payload;
                this.getData();
            }
        })
    }

    public getData(){
        this.userInput={
            subject: this.expenses.subject,
            cost: this.expenses.cost,
            description: this.expenses.description,
        }
    }

    public async handleClickActionButton() {
        if (!this.handleValidInput()) return;
        const payload = { 
            subject: this.userInput.subject,
            cost: this.userInput.cost,
            description: this.userInput.description,
            images: this.userInput.images,
        };
        const res = await this.$store.dispatch(
          MutationTypes.CREATE_CUSTOMER,
          payload
        );
        if(res.status ===200){
            toast.success('Successfully created');
            window.location.reload();
        }
    }

    public handleValidInput(){
        this.validInput = false;

        this.invalidMessage.subject = "";
        if (!this.userInput.subject) {
            this.invalidMessage.subject = "Please enter subject";
            return
        }
        if (this.userInput.subject == this.expenses.subject && this.userInput.cost == this.expenses.cost
            && this.userInput.description == this.expenses.description
        ) {
            return
        }
        
        this.validInput = true;
        return this.validInput
    }

    public async handleChangeStatus(status:any){
        const payload = { 
            expenses_id: this.expenses._id,
            status: status,
        };
        const res = await this.$store.dispatch(
          MutationTypes.UPDATE_STATUS_EXPENSE,
          payload
        );
        if(res.status ===200){
            toast.success('Successfully updated');
            window.location.reload();
        }
    }
}