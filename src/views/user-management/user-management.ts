import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddCustomer from "./components/modal-add-customer/modal-add-customer.vue";
import ModalCustomerDetail from "./components/modal-customer-detail/modal-customer-detail.vue";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddCustomer,
    ModalCustomerDetail
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