import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import { MutationTypes } from "@/store/mutation-types";
import Header from '@/components/header/header.vue'
import ModalAddCustomer from "../user-management/components/modal-add-customer/modal-add-customer.vue";
import ModalCustomerDetail from "../user-management/components/modal-customer-detail/modal-customer-detail.vue";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddCustomer,
    ModalCustomerDetail,
  },
  watch: {
    searchQuery: {
      handler(val, oldVal) {
        this.getData();
      },
      deep: true,
    },
  }
})
export default class CustomerManagement extends Vue {
  public searchQuery: any = {
    customer: ''
  }

  public selectSort: any = {
    'customer': {
      'name': false,
      'phoneNumber': false,
      'rank': false,
      'point': false,
      'lasTransaction': false,
    }
  }

  public list: any = {
    customer: 0
  };
  public totalPage: any = {
    customer: 0
  };
  public detail: any = {
    customerId: null
  }
  public currentPage: any = {
    customer: 1
  }
  public async beforeMount() {
    await this.getData();
  }

  public async getData() {
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
    if (res.status === 200) {
      this.list.customer = res.data.data
      this.totalPage.customer = res.data.totalPages
    }
  }

  public handleNextPage(item: any, index: any) {
    this.currentPage[item] = index + 1;
    this.getData()
  }

  public handleDetailCustomer(item: any) {
    this.$store.commit("setCustomer", item);
  }

  public handleSort(tab: any, item: any) {
    this.selectSort[tab][item] = !this.selectSort[tab][item]
    this.getData();
  }
}