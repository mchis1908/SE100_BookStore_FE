import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import { MutationTypes } from "@/store/mutation-types";
import ModalDetailInvoice from "@/views/invoices/modal-detail-invoice/modal-detail-invoice.vue";
import { Modal } from "bootstrap";

@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalDetailInvoice
  },
  watch:{
    searchQuery: {
      handler(val, oldVal) {
        this.getData();
      },
      deep: true,
    },
    date: {
      handler(val, oldVal) {
        this.getData();
      },
      deep: true,
    },
  }
})
export default class Invoices extends Vue {
  public invoices:any=null;
  public date:any=null;
  public currentPage:any=1;
  public totalPage:any=0;
  public searchQuery:any=null;
  public beforeMount(){
    this.getData();
  }

  public mounted(){

  }
  public userData:any=null;

  public async getData(){
    this.userData = this.$store.state.userData;

    let payload = { 
      id:this.userData?.data._id,
      page: this.currentPage,
      limit: 9,
      date: this.date?.slice(0,10),
      search_q: this.searchQuery,
    };

    let res = await this.$store.dispatch(
      MutationTypes.GET_INVOICES_BY_ID,
      payload
    );
    if(res.status ===200){
      this.invoices= res.data.data
      this.totalPage= res.data.totalPages
    }
  }

  public handleNextPage(index:any){
    this.currentPage= index+1;
    this.getData()
  }

  public handleDetailInvoice(item:any){
    this.$store.commit("setInvoice", item?._id);
    const myModal = new Modal(this.$refs["modal-detail-invoice"] as any);
    document.body.appendChild(document.getElementById('modal-detail-invoice') as any);
    myModal.show();
  }

}