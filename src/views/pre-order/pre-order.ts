import { Options, Vue } from "vue-class-component";
import MenuDashBoard from "@/components/menu-dashboard/menu-dashboard.vue";
import Header from "@/components/header/header.vue";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import ModalDetailPreOrder from "./modal-detail-preorder/modal-detail-preorder.vue";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalDetailPreOrder,
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
  public preOrders: any = [];
  public books: any = [];
  public itemSelectedRemove: any = {};
  public itemSelectedAdd: any = {};
  public selectedBooks: any = [];
  public quantity: any = [];
  public quantityIndex: any = null;
  public categoryID: any = "";
  public totalPages: number = 1
  public currentPage: number = 1


  async beforeMount() {
    await this.fetchCategories();
    await this.fetchBooks();
    await this.fetchPreOrder()
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
    if (res.status === 200) {
      this.allCategories = await res.data.data;
    }
  }
  public async fetchBooks() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS, {
      search_q: this.search_q,
      category: this.categoryID,
      limit: 1000,
    });

    if (res.status === 200) {
      this.books = await res.data.data;
    }
  }

  public async fetchPreOrder() {
    let res = await this.$store.dispatch(MutationTypes.GET_ALL_PRE_ORDER, {
      page: this.currentPage
    });

    if (res.status === 200) {
      this.preOrders = await res.data.data;
      this.totalPages = res.data.totalPages
    }
  }

  public async createPreOrder() {
    let preOrderBookDetails:any=[];
    this.selectedBooks.forEach((item:any,index:any) => {
      const preDetailValue = {"book": item?._id, "quantity": this.quantity[index]};
      preOrderBookDetails[index] = preDetailValue;
    });
    let res = await this.$store.dispatch(MutationTypes.PRE_ORDER, {
      customer: this.selectCustomer?._id,
      expirationDate: this.Expireday,
      deposit: "",
      preOrderBookDetails: preOrderBookDetails,
      note:this.Note,
    });

    if (res.status === 201) {
      toast.success("Successfully created pre-order");
      this.books = await res.data.data;
    }
    this.handleReset()
    this.fetchPreOrder()
  }

  public addToSelectedBooks() {
    console.log(this.itemSelectedAdd)
    if (this.itemSelectedAdd) {
      this.selectedBooks.push(this.itemSelectedAdd);
      this.quantity.push(1);
      this.books = this.books.filter(
        (book: any) => book?._id !== this.itemSelectedAdd._id
      );
      this.itemSelectedAdd = null;
    }
    this.itemSelectedRemove = null;
    this.quantityIndex = null;
  }

  public removeFromSelectedBooks() {
    if (this.itemSelectedRemove) {
      this.selectedBooks = this.selectedBooks.filter(
        (book: any) => book?._id !== this.itemSelectedRemove._id
      );
      this.books.push(this.itemSelectedRemove);
      this.quantity.splice(this.quantityIndex, 1);
      this.itemSelectedRemove = null;
      this.quantityIndex = null;
    } else this.itemSelectedAdd = null;
  }

  public generateRemoveSelectedBook(item: any, index:any) {
    if (this.itemSelectedAdd) this.itemSelectedAdd = null;
    if (item?._id === this.itemSelectedRemove?._id) {
      this.itemSelectedRemove = null;
      this.quantityIndex = null;
    } else {
      this.itemSelectedRemove = item;
  }   this.quantityIndex=index
    }
  public generateAddSelectedBook(item: any) {
    if (this.itemSelectedRemove) {
      this.itemSelectedRemove = null;
      this.quantityIndex = null;
    }
    if (item?._id === this.itemSelectedAdd?._id) {
      this.itemSelectedAdd = null;
    } else this.itemSelectedAdd = item;
  }



  public async handleReset() {
    this.customerInput = null;
    this.selectCustomer = null;
    this.Note = null;
    this.itemSelectedAdd = null;
    this.itemSelectedRemove = null;
    this.quantityIndex = null;
    this.selectedBooks = [];
    this.quantity = [];
    this.Expireday=null
    this.categoryID=''
    await this.fetchBooks();
  }

  public handleDetailPre(item:any){
    this.$store.commit("setPreOrder", item?._id);
  }
}
