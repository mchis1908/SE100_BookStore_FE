import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddCustomer from "./components/modal-add-customer/modal-add-customer.vue";
import ModalCustomerDetail from "./components/modal-customer-detail/modal-customer-detail.vue";
import ModalAddEmployee from "./components/modal-add-employee/modal-add-employee.vue";
import ModalEmployeeDetail from "./components/modal-employee-detail/modal-employee-detail.vue";
import ModalAddManager from "./components/modal-add-manager/modal-add-manager.vue";
import ModalManagerDetail from "./components/modal-manager-detail/modal-manager-detail.vue";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddCustomer,
    ModalCustomerDetail,
    ModalAddEmployee,
    ModalAddManager,
    ModalEmployeeDetail,
    ModalManagerDetail
  },
})
export default class UserManagement extends Vue {
  public list:any={
    customer:0,
    employee:0,
    manager:0,
  };
  public totalPage:any={
    customer:0,
    employee:0,
    manager:0,
  };
  public detail:any={
    customerId:null,
    employeeId:null,
    managerId:null,
  }
  public currentPage:any={
    customer:1,
    employee:1,
    manager:1,
  }
  public async beforeMount(){
    await this.getData();
  }

  public async getData(){
    const payload = { 
      page: this.currentPage.customer,
      limit: 9,
    };
    let res = await this.$store.dispatch(
      MutationTypes.GET_CUSTOMER,
      payload
    );
    if(res.status ===200){
      this.list.customer= res.data.data
      this.totalPage.customer= res.data.totalPages
    }
    res = await this.$store.dispatch(
      MutationTypes.GET_EMPLOYEE,
      payload
    );
    if(res.status ===200){
      this.list.employee= res.data.data
      this.totalPage.employee= res.data.totalPages
    }
  }

  public handleNextPage(index:any){
    this.currentPage.customer= index+1;
    this.getData()
  }

  public handleDetailCustomer(item:any){
    this.$store.commit("setCustomer", item);
  }

  public handleDetailEmployee(item:any){
    this.$store.commit("setEmployee", item);
  }

  public handleDetailManager(item:any){
    this.$store.commit("setManager", item);
  }
  
}