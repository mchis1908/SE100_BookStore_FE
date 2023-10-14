import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import VoucherItem from "./voucher-item/voucher-item.vue";
import { MutationTypes } from "@/store/mutation-types";
@Options({
  components: {
    MenuDashBoard,
    Header,
    VoucherItem
  },
})
export default class Events extends Vue {
  public vouchers: any = [];
  public async beforeMount() {
    const response = await this.$store.dispatch(MutationTypes.GET_ALL_VOUCHERS);
    if (response) {
      this.vouchers = response.data.data;
    }
  }
}