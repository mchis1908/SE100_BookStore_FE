import { Options, Vue } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {

  },
})
export default class Login extends Vue {
  public username:any=null;
  public password:any=null;
  public invalidAccount:any=false;

  public async handleLogin(){
    const payload = { email: this.username, password: this.password };
    const res = await this.$store.dispatch(
      MutationTypes.LOGIN_USER_REQUEST,
      payload
    );
    if (res.status===200) {
      localStorage.setItem("sessionTokens", JSON.stringify(res.data.accessToken));
      this.$store.commit("setUserData", res.data);
      await this.$router.push("/dashboard");
    }else{
      this.invalidAccount = res.data.message;
      toast.error(res.data.message);
      return;
    }
  }
}