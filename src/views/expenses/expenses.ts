import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddExpense from "./components/modal-add-expense/modal-add-expense.vue";
import ModalDetailExpense from "./components/modal-detail-expense/modal-detail-expense.vue";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddExpense,
    ModalDetailExpense
  },
})
export default class Expenses extends Vue {
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
      "Confirm",
      "Decline",
    ];
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
}