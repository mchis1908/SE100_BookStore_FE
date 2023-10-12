import { Options, Vue } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import Modal from "@/components/modal/modal.vue";

@Options({
  components: {
    Modal
  },
})
export default class BookPage extends Vue {
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
      "Honorific",
      "Science",
      "Poem"
    ];
  }
  
  public handleClickOutside = (event: any) => {
    if (this.showModalSortList && !event.target.closest('.filter')) {
      this.showModalSortList = false;
    }
  };
}