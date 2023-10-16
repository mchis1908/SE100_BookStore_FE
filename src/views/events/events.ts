import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import VoucherItem from "./components/voucher-item/voucher-item.vue";
import ModalAddVoucher from "./components/modal-add-voucher/modal-add-voucher.vue";
import Loading from "@/components/loading/loading.vue";
import { MutationTypes } from "@/store/mutation-types";
@Options({
  components: {
    MenuDashBoard,
    Header,
    VoucherItem,
    ModalAddVoucher,
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
    this.fetchData();
  }

  public async fetchData() {
    this.isFilteringVoucher = true;
    const response = await this.$store.dispatch(MutationTypes.GET_ALL_VOUCHERS, {
      level: this.searchLevel
    });
    if (response) {
      this.vouchers = await response.data.data;
      this.isFilteringVoucher = false;
    }
  }

  public handleAddNewVoucher() {
    (this.$refs['add-new-voucher-component'] as any).openModal()
  }
}