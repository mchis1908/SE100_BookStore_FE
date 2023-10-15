import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import VoucherItem from "./components/voucher-item/voucher-item.vue";
import ModalAddVoucher from "./components/modal-add-voucher/modal-add-voucher.vue";
import { MutationTypes } from "@/store/mutation-types";
@Options({
  components: {
    MenuDashBoard,
    Header,
    VoucherItem,
    ModalAddVoucher
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

  public handleAddNewVoucher() {
    (this.$refs['add-new-voucher-component'] as any).openModal()
  }
}