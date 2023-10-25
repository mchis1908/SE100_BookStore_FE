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
      },
      deep: true,
    },
    bookInCart:{
      handler: function (val: any, oldVal: any) {
        this.handleSubtotal()
      },
      deep: true,
    },
    quantity: {
      handler: function (val: any, oldVal: any) {
        val.some((item:any, index:any) =>{
          if(this.bookInCart[index]?.quantity < item) 
          {
            this.quantity[index] = this.bookInCart[index]?.quantity
            toast.error(`This book only has ${this.bookInCart[index]?.quantity} left`)
          }
        })
        this.handleSubtotal()
      },
      deep: true,
    },
    selectVoucher: {
      handler: function (val: any, oldVal: any) {
        this.handleSubtotal()
      },
      deep: true,
    },
    customerInput: {
      handler(val, oldVal) {
        this.handleSearch();
      },
      deep: true,
    },
  }
})
export default class Pre_Order extends Vue {
  public customerInput:any=null;
  public selectCustomer:any=null;
  public Expireday:any=null;
  public Note:any=null;
  public suggest: any = [];
  public searchQuery:any=null
  public search_q:any=""
  public allCategories: any = []
  public books: any = []
  public categoryID: any = ""

  async beforeMount(){
    await this.fetchCategories()
    await this.fetchBooks()
  }



  

  

  public checkQuantity(item:any, quantity:any){
    if(item?.quantity <= quantity) return false;
    else return true;
  }

  public async handleSearch() {
    if (this.customerInput === '') return;
    let payload = { 
      search_q: this.customerInput,
    };
    let res = await this.$store.dispatch(
      MutationTypes.GET_CUSTOMER,
      payload
    );
    if(res.status ===200){
      this.suggest= res.data.data
    }
  }

  public handleSelectCustomer(item: any) {
    this.selectCustomer= item;
    this.customerInput = ''
  }


  public handleRemoveCustomer() {
    this.selectCustomer= null;
    this.customerInput = ''
  }

  public async fetchCategories() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_CATEGORIES, {
    })
    if (res) {
      this.allCategories = await res.data.data;
    }
  }
  public async fetchBooks() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS, {
     search_q: this.search_q,
     category:this.categoryID,
     limit:1000,
   })

   if (res) {
    this.books = await res.data.data;
    console.log("books", this.books)
  }
 }

  // public handleSelectChange(event: Event) {
  //   // Lấy giá trị của tùy chọn được chọn bằng cách sử dụng event.target.value
  //   const selectedValue = (event.target as HTMLSelectElement).value;
    
  //   // Console log giá trị đã chọn
  //   console.log("Selected Category ID: ", selectedValue);
  // }
}