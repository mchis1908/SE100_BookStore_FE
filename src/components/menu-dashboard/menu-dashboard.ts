import { Options, Vue } from "vue-class-component";

@Options({
  components: {

  },
})
export default class Login extends Vue {
  public pageName:any='/dashboard'

  created() {
    this.pageName = this.$route.path;
  }

  public handleChangeTab(tab:any){
    this.$router.replace(tab)
    // window.location.href=tab;
  }

}