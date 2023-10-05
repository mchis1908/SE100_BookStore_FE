import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
@Options({
  components: {
    MenuDashBoard,
    Header
  },
})
export default class DashBoard extends Vue {
  public options:any={
    autoWidth: true,
    gap: "1rem",
    perMove: 1,
    type    : 'loop',
    autoplay: true,
    perPage : 1,
    // arrows: false,
    pagination: false,
  }

  public mounted(){
    
  }
}