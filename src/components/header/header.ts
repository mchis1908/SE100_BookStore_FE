import { Options, Vue } from "vue-class-component";

@Options({
  components: {

  },
})
export default class Login extends Vue {
  public pageTitle:any=''

  created() {
    this.pageTitle = this.getPageIdFromRoute(this.$route.path);
  }
  
  private getPageIdFromRoute(routePath: string) {
    const routeMappings: any = {
      '/dashboard': 'Dashboard',
      '/statistics': 'Statistics',
      '/user-management': 'User Management',
      '/events': 'Events & Voucher',
      '/expenses': 'Expenses',
      '/invoices': 'Invoices',
      '/reports': 'Reports',
    };
    return routeMappings[routePath] || '';
  }
}