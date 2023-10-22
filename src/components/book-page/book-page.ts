import { Options, Vue } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import Modal from "@/components/modal/modal.vue";

@Options({
  components: {
    Modal
  },
  watch:{
    selectedSort: {
      handler(val, oldVal) {
        this.getBooks();
      },
      deep: true,
    },
    searchQuery: {
      handler(val, oldVal) {
        this.getBooks();
      },
      deep: true,
    },
  }
})
export default class BookPage extends Vue {
  public categories: any = []
  public books: any = []
  public selectedSort: any = 0;
  public searchQuery: any = null;
  public showModalSortList: any = false
  
  public mounted(){
    document.addEventListener('click', this.handleClickOutside);
  }

  public unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  }
  
  public async beforeMount(){
    await this.getCategories();
    await this.getBooks();
  }
  
  public handleClickOutside = (event: any) => {
    if (this.showModalSortList && !event.target.closest('.filter')) {
      this.showModalSortList = false;
    }
  };

  public async getCategories(){
    const res = await this.$store.dispatch(MutationTypes.GET_ALL_CATEGORIES);
    this.categories.push({ _id: null, name:'All'})
    if(res?.status ===200){
      res.data.data.map((item:any) => {
        this.categories.push(item)
      })
    }
  }

  public async getBooks(){
    const payload = { 
      limit: 1000,
      search_q: this.searchQuery,
      category: this.categories[this.selectedSort]?._id
    };
    const res = await this.$store.dispatch(MutationTypes.GET_ALL_BOOKS, payload);
    if(res?.status ===200){
      this.books= res.data.data
    }
  }
}