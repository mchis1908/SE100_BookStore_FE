import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import VoucherItem from "./components/voucher-item/voucher-item.vue";
import EventItem from "./components/event-item/event-item.vue";
import ModalAddVoucher from "./components/modal-add-voucher/modal-add-voucher.vue";
import ModalAddEvent from "./components/modal-add-event/modal-add-event.vue";
import Loading from "@/components/loading/loading.vue";
import { MutationTypes } from "@/store/mutation-types";
@Options({
  components: {
    MenuDashBoard,
    Header,
    VoucherItem,
    EventItem,
    ModalAddVoucher,
    ModalAddEvent,
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
  public events: any = [];
  public searchLevel: any = ''
  public isLoading: boolean = false;
  public async beforeMount() {
    this.fetchData();
  }

  public async fetchData() {
    this.isLoading = true;
    const response = await this.$store.dispatch(MutationTypes.GET_ALL_VOUCHERS, {
      level: this.searchLevel
    });
    if (response) {
      this.vouchers = await response.data.data;
      this.isLoading = false;
    }

    const responseEvents = await this.$store.dispatch(MutationTypes.GET_UPCOMING_EVENTS, {
      // search_q: this.searchLevel
    });

    if (responseEvents) {
      this.events = await responseEvents.data.data;
    }
  }

  public handleAddNewVoucher() {
    (this.$refs['add-new-voucher-component'] as any).openModal()
  }

  public handleAddNewEvent() {
    (this.$refs['add-new-event-component'] as any).openModal()
  }
}