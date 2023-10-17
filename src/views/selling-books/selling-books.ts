import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {
    MenuDashBoard,
    Header
  },
  watch:{
    searchQuery: {
      handler: function (val: any, oldVal: any) {
        this.getBooks()
      }
    },
  }
})
export default class SellingBooks extends Vue {
  public quantity:any=[]
  public books:any=null;
  public searchQuery:any=null

  public beforeMount(){
    this.getBooks();
  }

  public async getBooks(){
    const payload = { 
      search_q: this.searchQuery
    };
    const res = await this.$store.dispatch(
      MutationTypes.GET_ALL_BOOKS,
      payload
    );
    if(res.status ===200){
      this.books= res.data.data
    }
    
  }
  public async handleAddBook(){

  }
}