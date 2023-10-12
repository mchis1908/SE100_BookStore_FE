import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
import ModalAddCustomer from "./components/modal-add-customer/modal-add-customer.vue";
@Options({
  components: {
    MenuDashBoard,
    Header,
    ModalAddCustomer
  },
})
export default class Expenses extends Vue {
  public color:any=[ 'background: #EA5A92', 'background: #19C5A6', 'background: #5097F8', 'background: #FD8238', 'background: #D289E2', 'background: #80BEE4']
  public sortList: any = []
  public selectedSort: any = 0;
  public showModalSortList: any = false
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
  }
  
  public handleClickOutside = (event: any) => {
    if (this.showModalSortList && !event.target.closest('.filter')) {
      this.showModalSortList = false;
    }
  };
}