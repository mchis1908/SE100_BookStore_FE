import { Options, Vue } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import Header from '@/components/header/header.vue'
import BookPage from '@/components/book-page/book-page.vue'
@Options({
  components: {
    Header,
    BookPage
  },
})
export default class Home extends Vue {
  public events:any=null;
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
    const res = await this.$store.dispatch(MutationTypes.GET_UPCOMING_EVENTS, {});
    if (res?.status===200) {
      this.events = await res.data.data;
    }
    console.log('a',this.events)
  }
}