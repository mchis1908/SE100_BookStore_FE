import { Options, Vue } from "vue-class-component";
import MenuDashBoard from '@/components/menu-dashboard/menu-dashboard.vue'
import Header from '@/components/header/header.vue'
@Options({
  components: {
    MenuDashBoard,
    Header
  },
})
export default class Reports extends Vue {

}