import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddExpense from "./components/modal-add-expense/modal-add-expense.vue";
import ModalDetailExpense from "./components/modal-detail-expense/modal-detail-expense.vue";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddExpense,
    ModalDetailExpense
  },
  watch:{
    filter: {
      handler(val, oldVal) {
        this.getData();
      },
      deep: true,
    },
  }
})
export default class Expenses extends Vue {
  public expenses:any= null;
  public history:any= null;
  public filter:any=null;
  public color:any=[ 'background: #EA5A92', 'background: #19C5A6', 'background: #5097F8', 'background: #FD8238', 'background: #D289E2', 'background: #80BEE4']
  public sortList: any = []
  public sortStatus: any = []
  public selectedSortList: any = 0;
  public selectedSortStatus: any = 0;
  public showModalSortList: any = false
  public showModalSortStatus: any = false
  public mounted(){
    document.addEventListener('click', this.handleClickOutside);
  }

  public unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  public beforeMount(){
    this.sortList = [
      "All",
      "Last 7 days",
      "Last 30 days",
      "Last 365 days"
    ];
    this.sortStatus = [
      "All",
      "Resolved",
      "Rejected",
    ];
    this.filter={
      expenses:{
        date: null,
        lastNDays: null,
        status: 0,
      },
      history:{
        date: null,
        lastNDays: null,
        status: 0,
      }
    }
    this.getData();
  }
  
  public handleClickOutside = (event: any) => {
    if (this.showModalSortList && !event.target.closest('.filter')) {
      this.showModalSortList = false;
    }else if (this.showModalSortStatus && !event.target.closest('.filter')) {
      this.showModalSortStatus = false;
    }
  };

  public handleDetailExpense(item:any){
    this.$store.commit("setExpense", item);
  }

  public async getData(){
    let payload = { 
      date: this?.filter.expenses?.date,
      lastNDays: this.filter?.expenses?.lastNDays,
      status: 'PENDING',
    };
    let res = await this.$store.dispatch(
      MutationTypes.GET_EXPENSES,
      payload
    );
    if(res.status ===200){
      this.expenses= res.data.data
    }

    payload = { 
      date: this?.filter.history?.date,
      lastNDays: this.filter?.history?.lastNDays,
      status: (!this.filter?.history?.status ? '' : this.sortStatus[this.filter?.history?.status]?.toUpperCase())
    };
    res = await this.$store.dispatch(
      MutationTypes.GET_EXPENSES,
      payload
    );
    if(res.status ===200){
      this.history= res.data.data
    }
  }
}