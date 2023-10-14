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
      '/book-management': 'Books Management',
      '/events': 'Events & Voucher',
      '/expenses': 'Expenses',
      '/invoices': 'Invoices',
      '/salary': 'Employee Salary',
      '/revenue': 'Revenue',
      '/reports': 'Reports',
      '/customers': 'Customers Management',
      '/selling-books': 'Selling Books',
      '/refunds': 'Refunds',
      '/report-problems': 'Report Problem',
      '/pre-order': 'Pre-Order',
      '/customer-books': 'Books',
      '/customer-invoices': 'Invoice',
      '/customer-vouchers': 'Vouchers',
      '/': '',
    };
    return routeMappings[routePath] || '';
  }
}