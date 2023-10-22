import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import VoucherItem from "./components/voucher-item/voucher-item.vue";
import EventItem from "./components/event-item/event-item.vue";
import ModalAddVoucher from "./components/modal-add-voucher/modal-add-voucher.vue";
import ModalAddEvent from "./components/modal-add-event/modal-add-event.vue";
import ModalDetailsEvent from "./components/modal-details-event/modal-details-event.vue";
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
    ModalDetailsEvent,
    Loading
  },
  watch: {
    searchLevel: {
      handler: async function (val: any, oldVal: any) {
          await this.fetchData()
      }
    },
    searchEvent: {
      handler: async function (val: any, oldVal: any) {
          await this.fetchEvents()
      }
    }
  }
})
export default class Events extends Vue {
  public vouchers: any = [];
  public events: any = [];
  public currentEvent: any = [];
  public searchLevel: any = ''
  public searchEvent: any = ''
  public isLoading: boolean = false;
  public selectedEvent: any = {}
  public async beforeMount() {
    this.fetchData();
    this.fetchEvents()

    const currentEvent = await this.$store.dispatch(MutationTypes.GET_CURRENT_EVENTS);
    if (currentEvent.data.success) {
      this.currentEvent = await currentEvent.data.data;
      this.events.unshift(this.currentEvent)
    }
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
  }

  public async fetchEvents() {
    const responseEvents = await this.$store.dispatch(MutationTypes.GET_UPCOMING_EVENTS, {
      search_q: this.searchEvent
    });

    if (responseEvents) {
      this.events = await responseEvents.data.data;
      this.isLoading = false;
    }
  }

  public handleAddNewVoucher() {
    (this.$refs['add-new-voucher-component'] as any).openModal()
  }

  public handleAddNewEvent() {
    (this.$refs['add-new-event-component'] as any).openModal()
  }

  public async handleDetailsEvent(item: any) {
    this.selectedEvent = await item;
    (this.$refs['details-event-component'] as any).openModal()
  }
}