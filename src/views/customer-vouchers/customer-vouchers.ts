import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
// import VoucherItem from "../events/components/voucher-item/voucher-item";
import VoucherItem from "@/views/events/components/voucher-item/voucher-item.vue";

import Loading from "@/components/loading/loading.vue";
import { MutationTypes } from "@/store/mutation-types";
@Options({
  components: {
    MenuDashBoard,
    Header,
    VoucherItem,
    Loading
  },
  watch: {
    searchLevel: {
      handler: async function (val: any, oldVal: any) {
          await this.fetchData()
      }
    }
  }
})
export default class Events extends Vue {
  public vouchers: any = [];
  public currentPage:any=1;
  public async beforeMount() {
    this.fetchData()
  }

  public userData:any=null;


  public async fetchData() {
    this.userData = this.$store.state.userData;

    let payload = { 
      customer_id:this.userData?.data._id,
      page: this.currentPage,
      limit: 10,
      canGetLowerLevel:true,
      level: this.userData?.data.user.level,
    };
    const response = await this.$store.dispatch(MutationTypes.GET_ALL_VOUCHERS, payload);
    if (response) {
      this.vouchers = await response.data.data;
    }
  }
}