import { Options, Vue } from "vue-class-component";

@Options({
  components: {

  },
})
export default class Login extends Vue {
  public pageTitle:any=''
  public userData:any=null;
  created() {
    this.pageTitle = this.getPageIdFromRoute(this.$route.path);
    this.userData = this.$store.state.userData;
  }
  
  private getPageIdFromRoute(routePath: string) {
    const routeMappings: any = {
      '/dashboard': 'Dashboard',
      '/statistics': 'Statistics',
      '/user-management': 'User Management',
      '/book-management': 'Book Management',
      '/events': 'Events & Voucher',
      '/expenses': 'Expenses',
      '/invoices': 'Invoices',
      '/salary': 'Employee Salary',
      '/revenue': 'Aggregate revenue',
      '/reports': 'Reports',
      '/customer-books': 'Books',
      '/customer-invoices': 'Invoice',
      '/customer-vouchers': 'Vouchers',
      '/': '',
    };
    return routeMappings[routePath] || '';
  }
}