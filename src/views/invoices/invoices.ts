import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
@Options({
  components: {
    MenuDashBoard,
    Header
  },
})
export default class Invoices extends Vue {
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