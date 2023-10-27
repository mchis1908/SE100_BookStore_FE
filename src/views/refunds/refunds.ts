import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
import { Modal } from "bootstrap";
import ModalDetailInvoice from "@/views/invoices/modal-detail-invoice/modal-detail-invoice.vue";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalDetailInvoice
  },
  watch:{
    searchInvoice: {
      handler: function (val: any, oldVal: any) {
        this.getInvoice()
      },
      deep: true,
    },
    searchBook: {
      handler: function (val: any, oldVal: any) {
        this.handleSearch()
      },
      deep: true,
    },
    quantity: {
      handler: function (val: any, oldVal: any) {
        this.handleSubtotal()
      },
      deep: true,
    },
    bookInCart:{
      handler: function (val: any, oldVal: any) {
        this.handleSubtotal()
      },
      deep: true,
    },
  }
})
export default class Refunds extends Vue {
  public invoice:any=null;
  public detailInvoice:any=null;
  public searchInvoice:any=null;
  public searchBook:any="";
  public bookInCart:any=[];
  public quantity:any=[];
  public cost:any=[];
  public isInvoice:any=false;
  public suggest: any = [];
  public isShowSort: any = false;
  public total:any=null;

  public mounted(){
    document.addEventListener("click", this.handleClickOutside);
  }

  unmounted(): void {
    document.removeEventListener("click", this.handleClickOutside);
  }

  public async getInvoice(){
    const payload = {
      id: this.searchInvoice
    };
    const res = await this.$store.dispatch(
      MutationTypes.GET_INVOICE_BY_ID,
      payload
    );
    // if(res.status ===200){
    //   console.log(typeof(res.data.data))
    //   console.log(typeof(res.data.data[0]))
    // }
    if(res.status ===200 && typeof(res.data.data[0])!=='object'){
      if(res?.data?.data?.vouchers.length!==0)
      {
        toast.error(`This invoice had used a voucher so that it can not be refunded`);
        return
      }
      this.invoice= res.data.data
      this.detailInvoice= res.data.data?.invoiceDetails
      this.isInvoice=true
      this.handleSearch();
    }
  }

  public handleRemoveInvoice(){
    this.isInvoice=false;
    this.searchInvoice=null
    this.invoice= null;
    this.suggest= [];
    this.bookInCart=[]
    this.cost=[]
  }

  public async handleAddBook(book:any){
    let temp:any=false;
    this.bookInCart?.map((item:any) => {
      if(book?.book===item) {
        toast.error(`The cart have this book`);
        temp= true
        return
      }
    })
    if(!temp)
    {
      this.bookInCart.push(book)
      this.quantity.push(book?.quantity);
      this.searchBook="";
    }
  }

  public handleClickOutside = (event: any) => {
    if (this.isShowSort && !event.target.closest('.searchBook')) {
      this.isShowSort = false;
    }
    else if(event.target.closest('.searchBook')){
      this.isShowSort = true;
    }
  }

  public async handleSearch() {
    if(this.searchBook!=="")
    {
      this.suggest= this.detailInvoice.filter((item:any) => (
        item?.book?.barcode.toLowerCase()?.includes(this.searchBook.toLowerCase())
      ))
    }else this.suggest= this.detailInvoice
  }

  public handleDeleteBook(index:any){
    if (index >= 0 && index < this.bookInCart.length) {
      this.bookInCart.splice(index, 1);
      this.quantity.splice(index, 1);
      this.cost.splice(index, 1);
    }
  }

  public handleSubtotal(){
    this.bookInCart.forEach((item:any,index:any) => {
      const costValue = this.quantity[index] * item?.book?.salesPrice * (1 - item?.book?.discountValue);
      this.cost[index] = costValue;
    });
    this.total = this.cost.reduce((acc:any, item:any) => acc + item, 0);
    console.log('abc', this.cost);
  }

  public async handleRefund(){
    let detailBooks:any=[];
    this.bookInCart.forEach((item:any,index:any) => {
      const invoiceDetailValue = {"book": item?.book?._id, "quantity": this.quantity[index]};
      detailBooks[index] = invoiceDetailValue;
    });
    const payload={
      invoice_id: this?.invoice?._id,
      total: this.total,
      refund_details: detailBooks
    }
    const res = await this.$store.dispatch(MutationTypes.CREATE_REFUND, payload);
    if (res.status===200) {
      toast.success("Successfully refunded");
      this.$store.commit("setInvoice", this?.invoice?._id);
      const myModal = new Modal(this.$refs["modal-detail-invoice"] as any);
      document.body.appendChild(document.getElementById('modal-detail-invoice') as any);
      myModal.show();
    }
  }
}