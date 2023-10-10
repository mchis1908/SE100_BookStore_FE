import { Vue, Options } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import {
    isValidEmail,
} from "@/utils/utils";
@Options({
    props: {

    },
})

export default class Modal extends Vue {
    public userInput:any={
        name: "",
        email: "",
        address: "",
        password: "",
        phone: "",
        birthday: "",
    }
    public invalidMessage:any={
        name: "",
        email: "",
        password: "",
        phone: "",
    }
    public validInput:any=false;
    public async mounted(){

    }

    public async handleClickActionButton() {
        await this.handleValidInput();
        const payload = { 
            name: this.userInput.name,
            email: this.userInput.email,
            address: this.userInput.address,
            password: this.userInput.password,
            phone: this.userInput.phone,
            birthday: this.userInput.birthday,
        };
        const res = await this.$store.dispatch(
          MutationTypes.CREATE_CUSTOMER,
          payload
        );
        if(res.status ===200){
            toast.success(res.data.message)
        }
    }

    public handleValidInput(){
        this.validInput = false;

        this.invalidMessage.name = "";
        if (!this.userInput.name) {
            this.invalidMessage.name = "Please enter customer's name";
            return
        }

        this.invalidMessage.email = "";
        if (!isValidEmail(this.userInput.email) || !this.userInput.email) {
            this.invalidMessage.email = "Please fill a valid email";
            return
        }
        
        this.invalidMessage.password = "";

        if (!this.userInput.password) {
            this.invalidMessage.name = "Please enter customer's password";
            return
        }else
        if (this.userInput.password.length < 6) {
            this.invalidMessage.name = "Password must be at least 6 characters";
            return
        }

        this.invalidMessage.phone = "";
        if (!this.userInput.phone) {
            this.invalidMessage.phone = "Please enter customer's phone number";
            return
        }

        this.validInput = true;
    }
}