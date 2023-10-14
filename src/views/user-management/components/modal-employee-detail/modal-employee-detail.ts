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
    public scaleArr:any=null;
    public userInput:any={
        name: "",
        email: "",
        address: "",
        phone: "",
        birthdate: "",
        salary: "",
        salaryScale: null,
    }
    public isChanged:any=false;
    public employee:any=null;
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
                this.employee = mutation.payload
                console.log(this.employee)
                this.getData();
            }
        })
    }

    public getData(){
        this.getSalaryScale();
        this.userInput={
            name: this.employee?.name,
            email: this.employee?.email,
            address: this.employee?.address,
            phoneNumber: this.employee?.phoneNumber,
            birthdate: this.employee?.birthdate?.slice(0,10) ?? null,
            salary: this.employee?.user?.salary,
            salaryScale: this.employee?.user?.salaryScale,
        }
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

    public handleHasChanged(){
        this.isChanged = false;
        if(
            (
                this.userInput.name!== this.employee?.name ||
                this.userInput.email!== this.employee?.email ||
                this.userInput.address!== this.employee?.address ||
                this.userInput.phoneNumber!== this.employee?.phoneNumber ||
                this.userInput.birthdate!== (this.employee?.birthdate?.slice(0,10)?? null) ||
                this.userInput.salary!== (this.employee?.user?.salary) ||
                this.userInput.salaryScale!== (this.employee?.user?.salaryScale)
            ) &&
            ( this.userInput.name!== '' &&
                this.userInput.email!== '' &&
                this.userInput.phoneNumber!== '' &&
                this.userInput.salaryScale!== null &&
                this.userInput.salary!== ''
            )
        )
        this.isChanged = true;
    }
    
    public async handleUpdate() {
        const payload = {
            employee_id: this.employee.user._id,
            name: this.userInput.name,
            email: this.userInput.email,
            address: this.userInput.address,
            phoneNumber: this.userInput.phoneNumber,
            birthdate: this.userInput.birthdate,
            salary: this.userInput.salary,
            salaryScale: this.userInput.salaryScale._id,
        };
        const res = await this.$store.dispatch(
          MutationTypes.UPDATE_EMPLOYEE,
          payload
        );
        if(res.status ===200){
            toast.success('Successfully updated');
            window.location.reload();
        }
    }
}