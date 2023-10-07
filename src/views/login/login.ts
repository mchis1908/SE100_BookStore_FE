import { Options, Vue } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import Loading from "@/components/loading/loading.vue";
@Options({
  components: {
    Loading
  },
})
export default class Login extends Vue {
  public username:any=null;
  public password:any=null;
  public invalidAccount:any=false;
  public isLoading: any = false

  public async handleLogin(){
    this.isLoading = true;
    const payload = { email: this.username, password: this.password };
    const res = await this.$store.dispatch(
      MutationTypes.LOGIN_USER_REQUEST,
      payload
    );
    if (res.status===200) {
      localStorage.setItem("sessionTokens", JSON.stringify(res.data.accessToken));
      await this.$router.push("/dashboard");
      this.isLoading = false;
    }else{
      this.invalidAccount = res.data.message;
      toast.error(res.data.message);
      this.isLoading = false;
      return;
    }
  }
}