import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {
    MenuDashBoard,
    Header
  },
  watch:{
    userInput: {
      handler(val, oldVal) {
        this.handleValidInput();
      },
      deep: true,
    },
  }
})
export default class ReportProblems extends Vue {
  public fileInput:any=[];
  public fileInput1:any=[];
  public imagesNotUpload = new FormData();
  public userInput:any={
    subject: null,
    cost: null,
    description: null,
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
        MutationTypes.UPLOAD_MULTIPLE_IMAGES,
        this.imagesNotUpload
    );
    if(res.status===200){
      const payload = { 
        subject: this.userInput?.subject,
        cost: this.userInput.cost,
        description: this.userInput.description,
        images: res.data.images,
      };
      res = await this.$store.dispatch(
        MutationTypes.ADD_EXPENSE,
        payload
      );
      if(res.status ===201){
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
    this.invalidMessage.description = "";
    if (!this.userInput.description) {
      this.invalidMessage.description = "Please enter description";
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