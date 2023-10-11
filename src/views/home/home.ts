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
}