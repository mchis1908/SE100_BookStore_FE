import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
@Options({
  components: {
    MenuDashBoard,
    Header,
  },
})
export default class UserManagement extends Vue {

  public async handleClick(){
    console.log("abc");
  }

  public async handleUpdate(){
    console.log("abc");
  }
  
}