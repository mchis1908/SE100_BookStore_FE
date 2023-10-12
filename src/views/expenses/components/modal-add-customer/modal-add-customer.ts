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

export default class ModalAddCustomer extends Vue {
    public userInput:any={
        name: "",
        email: "",
        address: "",
        password: "",
        phoneNumber: "",
        birthday: "",
    }
    public invalidMessage:any={
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
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
            phoneNumber: this.userInput.phoneNumber,
            birthdate: this.userInput.birthday,
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
            this.invalidMessage.password = "Please enter customer's password";
            return
        }else
        if (this.userInput.password.length < 6) {
            this.invalidMessage.password = "Password must be at least 6 characters";
            return
        }

        this.invalidMessage.phoneNumber = "";
        if (!this.userInput.phoneNumber) {
            this.invalidMessage.phoneNumber = "Please enter customer's phone number";
            return
        }

        this.validInput = true;
    }
}