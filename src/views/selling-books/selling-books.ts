import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Barcode from '@/components/barcode/barcode.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {
    MenuDashBoard,
    Header,
    Barcode
  },
  watch:{
    searchQuery: {
      handler: function (val: any, oldVal: any) {
        this.handleAddBookByBarcode()
      }
    },
  }
})
export default class SellingBooks extends Vue {
  public quantity:any=[]
  public bookInCart:any=[];
  public books:any=null;
  public subtotal:any=null;
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

  public async handleAddBookByClick(item:any){
    this.bookInCart.push(item);
    this.quantity.push(1);
  }

  public async handleAddBookByBarcode(){
    await this.getBooks()
    // if(this.searchQuery.length<13) return;
    if(this.books.length===1) this.bookInCart.push(this.books[0]);
  }
}