import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
import Modal from "@/components/modal/modal.vue";

@Options({
  components: {
    MenuDashBoard,
    Header, 
    Modal
  },
})
export default class DashBoard extends Vue {
  public mounted(){
    
  }

  public handleClick() {
    alert("Clicked!");
  }
}