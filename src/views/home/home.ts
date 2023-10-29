import { Options, Vue } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import Header from '@/components/header/header.vue'
import BookPage from '@/components/book-page/book-page.vue'
import { fixedCurrency } from "@/utils/utils";
@Options({
  components: {
    Header,
    BookPage
  },
  methods:{
    fixedCurrency,
  }
})
export default class Home extends Vue {
  public events:any=[];
  public options:any={
    autoWidth: true,
    gap: "1rem",
    perMove: 1,
    type    : 'loop',
    autoplay: true,
    perPage : 1,
    arrows: false,
    pagination: false,
  }

  public async beforeMount() {
      this.getEvents();
  }

  public async getEvents(){
    let res = await this.$store.dispatch(MutationTypes.GET_UPCOMING_EVENTS);
    if (res?.status===200) {
      this.events = res.data.data;
    }
    console.log(this.events)
    res = await this.$store.dispatch(MutationTypes.GET_CURRENT_EVENTS);
    if (res?.status===200) {
      this.events.push(res.data.data);
    }
  }

  public formatDate(dateString: string) {
    const date: any = new Date(dateString);
    const options: any = { year: 'numeric', month: 'short', day: '2-digit' };

    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }
}