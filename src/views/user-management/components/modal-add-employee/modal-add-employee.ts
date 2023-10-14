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

export default class ModalAddEmployee extends Vue {
    public scaleArr:any=null;
    public userInput:any={
        name: "",
        email: "",
        address: "",
        password: "",
        phoneNumber: "",
        birthdate: "",
        salary: "",
        salaryScale: null,
    }
    public invalidMessage:any={
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        salary: "",
        salaryScale: "",
    }
    public validInput:any=false;

    public async beforeMount(){
        this.getSalaryScale();
    }

    public async mounted(){
        
    }

    public async getSalaryScale(){
        const payload = {};
        const res = await this.$store.dispatch(
            MutationTypes.GET_ALL_SALARY_SCALE,
            payload
        );
        if(res.status ===200){
            this.scaleArr= res.data.data
        }
    }

    public async handleClickActionButton() {
        if (!this.handleValidInput()) return;
        const payload = { 
            name: this.userInput.name,
            email: this.userInput.email,
            address: this.userInput.address,
            password: this.userInput.password,
            phoneNumber: this.userInput.phoneNumber,
            birthdate: this.userInput.birthdate,
            salary: this.userInput.salary,
            salaryScale: this.userInput.salaryScale._id,
        };
        const res = await this.$store.dispatch(
          MutationTypes.CREATE_EMPLOYEE,
          payload
        );
        if(res.status ===200){
            toast.success('successfully created');
            window.location.reload();
        }
    }

    public handleValidInput(){
        this.validInput = false;

        this.invalidMessage.name = "";
        if (!this.userInput.name) {
            this.invalidMessage.name = "Please enter employee's name";
            return
        }

        this.invalidMessage.email = "";
        if (!isValidEmail(this.userInput.email) || !this.userInput.email) {
            this.invalidMessage.email = "Please fill a valid email";
            return
        }
        
        this.invalidMessage.password = "";

        if (!this.userInput.password) {
            this.invalidMessage.password = "Please enter employee's password";
            return
        }else
        if (this.userInput.password.length < 6) {
            this.invalidMessage.password = "Password must be at least 6 characters";
            return
        }

        this.invalidMessage.phoneNumber = "";
        if (!this.userInput.phoneNumber) {
            this.invalidMessage.phoneNumber = "Please enter employee's phone number";
            return
        }

        this.invalidMessage.salary = "";
        if (!this.userInput.salary) {
            this.invalidMessage.salary = "Please enter employee's salary";
            return
        }

        this.invalidMessage.salaryScale = "";
        if (!this.userInput.salaryScale) {
            this.invalidMessage.salaryScale = "Please select employee's salary scale";
            return
        }

        this.validInput = true;

        return this.validInput
    }
}