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
export default class SellingBooks extends Vue {
  public quantity:any=[]
  public cost:any=[]
  public bookInCart:any=[];
  public books:any=null;
  public vouchers:any=null;
  public customerInput:any=null;
  public selectCustomer:any=null;
  public selectVoucher:any=null;
  public subtotal:any=null;
  public voucherDiscount:any=null;
  public total:any=null;
  public suggest: any = [];
  public searchQuery:any=null

  public beforeMount(){
    this.getBooks();
  }

  public async getBooks(){
    const payload = {
      limit:1000,
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
    for(let i=0; i<this.bookInCart?.length; i++){
      if(this.bookInCart[i]?._id === item?._id && this.checkQuantity(item, this.quantity[i])) 
      {
        this.quantity[i]= this.quantity[i]+1;
        return
      }
      else if(this.bookInCart[i]?._id === item?._id && !this.checkQuantity(item, this.quantity[i])) 
      {
        toast.error(`This book only has ${item?.quantity} left`);
        return
      }
    }
    if(item?.quantity ===0) {
      toast.error("This book is sold out");
      return
    }
    this.bookInCart.push(item)
    this.quantity.push(1);
  }

  public async handleAddBookByBarcode(){
    await this.getBooks()
    // if(this.searchQuery.length<13) return;
    if(!Array.from(this.searchQuery).some((char:any) => {
      return /[0-9]/.test(char)})) return
    if(this.books.length===1) {
      this.handleAddBookByClick(this.books[0])
      this.searchQuery=""
    }
  }

  public checkQuantity(item:any, quantity:any){
    if(item?.quantity <= quantity) return false;
    else return true;
  }

  public handleSubtotal(){
    this.bookInCart.forEach((item:any,index:any) => {
      const costValue = this.quantity[index] * item?.salesPrice * (1 - item?.discountValue);
      this.cost[index] = costValue;
    });
    this.subtotal = this.cost.reduce((acc:any, item:any) => acc + item, 0);
    this.voucherDiscount = (this.selectVoucher?.discountValue ?? 0) * this.subtotal;
    this.total = this.subtotal- ((this.selectVoucher?.discountValue ?? 0) * this.subtotal);
  }

  public async handleDeleteBook(index:any){
    if (index >= 0 && index < this.bookInCart.length) {
      this.bookInCart.splice(index, 1);
      this.quantity.splice(index, 1);
      this.cost.splice(index, 1);
    }
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
    this.getVoucher();
  }

  public handleRemoveCustomer() {
    this.selectCustomer= null;
    this.customerInput = ''
    this.selectVoucher=null;
    this.getVoucher();
    this.handleSubtotal();
  }

  public async getVoucher(){
    if(!this.selectCustomer) this.vouchers=null;
    else
    {
      const res = await this.$store.dispatch(MutationTypes.GET_ALL_VOUCHERS, {
        level: this.selectCustomer?.user?.level,
        customer_id: this.selectCustomer?._id,
        canGetLowerLevel: true,
      });
      if (res.status===200) {
        this.vouchers = await res.data.data;
      }
    }
  }

  public async handlePay(){
    let detailBooks:any=[];
    this.bookInCart.forEach((item:any,index:any) => {
      const invoiceDetailValue = {"book": item?._id, "quantity": this.quantity[index]};
      detailBooks[index] = invoiceDetailValue;
    });
    let voucher:any=[]
    if(this.selectVoucher?._id) voucher.push(this.selectVoucher?._id)
    const payload={
      vouchers: voucher,
      customer: this.selectCustomer?._id,
      total: this.total,
      note: "",
      invoiceDetails: detailBooks
    }
    const res = await this.$store.dispatch(MutationTypes.CREATE_INVOICE, payload);
    if (res.status===201) {
      toast.success("Successfully created invoice");
      window.location.reload();
    }
  }
}