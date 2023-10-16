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
    public fileInput:any=[];
    public fileInput1:any=[];
    public imagesNotUpload = new FormData();
    public userInput:any={
        subject: null,
        cost: null,
        description: null,
        images: null
    }
    public invalidMessage:any={
        subject: "",
        description: "",
    }
    public validInput:any=false;
    public async mounted(){

    }

    public async handleClickActionButton() {
        if (!this.handleValidInput()) return;
        let res = await this.$store.dispatch(
            MutationTypes.CREATE_CUSTOMER,
            this.imagesNotUpload
        );
        if(res.status===200){
            const payload = { 
                subject: this.userInput.subject,
                cost: this.userInput.cost,
                description: this.userInput.description,
                images: this.userInput.images,
            };
            res = await this.$store.dispatch(
              MutationTypes.CREATE_CUSTOMER,
              payload
            );
            if(res.status ===200){
                toast.success('Successfully created');
                window.location.reload();
            }
        }
        
    }

    public handleValidInput(){
        this.validInput = false;

        this.invalidMessage.subject = "";
        if (!this.userInput.subject) {
            this.invalidMessage.subject = "Please enter subject";
            return
        }
        this.validInput = true;
        return this.validInput
    }

    public async onFileSelected(event: Event){
        const selectedFiles = (event.target as HTMLInputElement).files;
    
        if (selectedFiles) {
          for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
    
            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
              const fileURL = URL.createObjectURL(file);
              this.fileInput.push(file);
              const reader = new FileReader();
              reader.onload = () => {
                this.fileInput1.push(reader.result);
              };
              reader.readAsDataURL(file);
              this.imagesNotUpload.append('images', this.fileInput[i]);
            }else toast.error("Invalid file");
          }
        }
    }
}