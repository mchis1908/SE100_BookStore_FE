import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddCustomer from "./components/modal-add-customer/modal-add-customer.vue";
import ModalCustomerDetail from "./components/modal-customer-detail/modal-customer-detail.vue";
import ModalAddEmployee from "./components/modal-add-employee/modal-add-employee.vue";
import ModalEmployeeDetail from "./components/modal-employee-detail/modal-employee-detail.vue";
import ModalSetting from "./components/modal-setting/modal-setting.vue";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddCustomer,
    ModalCustomerDetail,
    ModalAddEmployee,
    ModalEmployeeDetail,
    ModalSetting
  },
  watch:{
    searchQuery: {
      handler(val, oldVal) {
        this.getData();
      },
      deep: true,
    },
  }
})
export default class UserManagement extends Vue {
  public searchQuery:any={
    customer:'',
    employee:''
  }

  public selectSort:any={
    'customer':{
      'name': false,
      'phoneNumber': false,
      'rank': false,
      'point': false,
      'lasTransaction': false,
    },
    'employee':{
      'name': false,
      'phoneNumber': false,
      'email': false,
      'seniority': false,
      'startDate': false,
    },
  }

  public list:any={
    customer:0,
    employee:0,
  };
  public totalPage:any={
    customer:0,
    employee:0,
  };
  public detail:any={
    customerId:null,
    employeeId:null,
  }
  public currentPage:any={
    customer:1,
    employee:1,
  }
  public async beforeMount(){
    await this.getData();
  }

  public async getData(){
    let sort_by = Object.keys(this.selectSort['customer']).filter(key => this.selectSort['customer'][key] === true).join(',');
    let payload = { 
      page: this.currentPage.customer,
      limit: 9,
      search_q: this.searchQuery.customer,
      sort_by: sort_by
    };
    let res = await this.$store.dispatch(
      MutationTypes.GET_CUSTOMER,
      payload
    );
    if(res.status ===200){
      this.list.customer= res.data.data
      this.totalPage.customer= res.data.totalPages
    }

    sort_by = Object.keys(this.selectSort['employee']).filter(key => this.selectSort['employee'][key] === true).join(',');
    payload = { 
      page: this.currentPage.employee,
      limit: 9,
      search_q: this.searchQuery.employee,
      sort_by: sort_by
    };
    res = await this.$store.dispatch(
      MutationTypes.GET_EMPLOYEE,
      payload
    );
    if(res.status ===200){
      this.list.employee= res.data.data
      this.totalPage.employee= res.data.totalPages
    }
  }

  public handleNextPage(item:any,index:any){
    this.currentPage[item]= index+1;
    this.getData()
  }

  public handleDetailCustomer(item:any){
    this.$store.commit("setCustomer", item);
  }

  public handleDetailEmployee(item:any){
    this.$store.commit("setEmployee", item);
  }

  public handleSort(tab:any, item:any){
    this.selectSort[tab][item] = !this.selectSort[tab][item]
    this.getData();
  }
  
}