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
  public searchLevel: any = ''
  public isFilteringVoucher: boolean = false;
  public async beforeMount() {
    this.userData = this.$store.state.userData;
    this.searchLevel = this.userData?.data.level;
    console.log("searchLevel in beforeMount:", this.searchLevel);
    this.fetchData()
  }

  public userData:any=null;


  public async fetchData() {
    console.log("searchLevel in fetchData:", this.searchLevel);
    this.isFilteringVoucher = true;
    const response = await this.$store.dispatch(MutationTypes.GET_CUSTOMER_VOUCHERS, {
      level: this.searchLevel,
    });
    if (response) {
      this.vouchers = await response.data.data;
      this.isFilteringVoucher = false;
    }
  }
}