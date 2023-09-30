import { Options, Vue } from "vue-class-component";

@Options({
  components: {

  },
})
export default class Login extends Vue {

  public async handleLogin(){

    this.$router.push('/dashboard')
  }
}