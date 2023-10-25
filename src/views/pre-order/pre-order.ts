import { Options, Vue } from "vue-class-component";
import MenuDashBoard from "@/components/menu-dashboard/menu-dashboard.vue";
import Barcode from "@/components/barcode/barcode.vue";
import Header from "@/components/header/header.vue";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {
    MenuDashBoard,
    Header,
    Barcode,
  },
  watch: {
    search_q: {
      handler: function (val: any, oldVal: any) {
        this.fetchBooks();
      },
      deep: true,
    },
    customerInput: {
      handler(val, oldVal) {
        this.handleSearch();
      },
      deep: true,
    },
  },
})
export default class Pre_Order extends Vue {
  public customerInput: any = null;
  public selectCustomer: any = null;
  public Expireday: any = null;
  public Note: any = null;
  public suggest: any = [];
  public search_q: any = "";
  public allCategories: any = [];
  public books: any = [];
  public itemSelectedRemove: any = {};
  public itemSelectedAdd: any = {};
  public selectedBooks: any = [];
  public categoryID: any = "";

  async beforeMount() {
    await this.fetchCategories();
    await this.fetchBooks();
  }

  public checkQuantity(item: any, quantity: any) {
    if (item?.quantity <= quantity) return false;
    else return true;
  }

  public async handleSearch() {
    if (this.customerInput === "") return;
    let payload = {
      search_q: this.customerInput,
    };
    let res = await this.$store.dispatch(MutationTypes.GET_CUSTOMER, payload);
    if (res.status === 200) {
      this.suggest = res.data.data;
    }
  }

  public handleSelectCustomer(item: any) {
    this.selectCustomer = item;
    this.customerInput = "";
  }

  public handleRemoveCustomer() {
    this.selectCustomer = null;
    this.customerInput = "";
  }

  public async fetchCategories() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_CATEGORIES, {});
    if (res) {
      this.allCategories = await res.data.data;
    }
  }
  public async fetchBooks() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS, {
      search_q: this.search_q,
      category: this.categoryID,
      limit: 1000,
    });

    if (res) {
      this.books = await res.data.data;
      console.log("books", this.books);
    }
  }

  public addToSelectedBooks() {
    if(this.itemSelectedAdd){
      this.selectedBooks.push(this.itemSelectedAdd);
    this.books = this.books.filter(
      (book: any) => book?._id !== this.itemSelectedAdd._id
    );
    this.itemSelectedAdd=null
    }
    this.itemSelectedRemove=null

  }

  public removeFromSelectedBooks() {
    if(this.itemSelectedRemove){
      this.selectedBooks = this.selectedBooks.filter(
        (book: any) => book?._id !== this.itemSelectedRemove._id
      );
      this.books.push(this.itemSelectedRemove);
      this.itemSelectedRemove=null
    }
    else
      this.itemSelectedAdd=null
    
  }

  public generateRemoveSelectedBook(item: any) {
    if (item?._id === this.itemSelectedRemove?._id) {
      this.itemSelectedRemove = null;
    } else this.itemSelectedRemove = item;
  }
  public generateAddSelectedBook(item: any) {
    if (item?._id === this.itemSelectedAdd?._id) {
      this.itemSelectedAdd = null;
    } else this.itemSelectedAdd = item;
  }


  // public handleSelectChange(event: Event) {
  //   // Lấy giá trị của tùy chọn được chọn bằng cách sử dụng event.target.value
  //   const selectedValue = (event.target as HTMLSelectElement).value;

  //   // Console log giá trị đã chọn
  //   console.log("Selected Category ID: ", selectedValue);
  // }
}
