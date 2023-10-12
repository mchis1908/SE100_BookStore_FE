import { Options, Vue } from "vue-class-component";

@Options({
  components: {

  },
})
export default class Login extends Vue {
  public pageName:any='/dashboard'
  public userData:any=null;
  created() {
    this.userData = this.$store.state.userData;
    this.pageName = this.$route.path;
    console.log(this.userData);
  }

  public handleChangeTab(tab:any){
    if(tab === '/login') 
    {
      localStorage.removeItem('sessionTokens');
      this.$store.commit("setUserData", null);
    }
    this.$router.replace(tab)
  }

}