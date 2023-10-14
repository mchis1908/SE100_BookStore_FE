import { Vue, Options } from "vue-class-component";
import { MutationTypes } from "@/store/mutation-types";
import { toast } from "vue3-toastify";
@Options({
    props: {

    },
})

export default class ModalSettingSalaryScale extends Vue {
    public newScale:any=0;
    public scaleArr:any=null;
    public addVisible:any=false;

    public async beforeMount() {
        this.getSalaryScale()
    }

    public async getSalaryScale(){
        const payload = {};
        const res = await this.$store.dispatch(
            MutationTypes.GET_ALL_SALARY_SCALE,
            payload
        );
        if(res.status ===200){
            this.scaleArr= res.data.data
        }
    }

    public async handleDeleteScale(item:any){
        const payload = {
            _id: item._id,
        };
        const res = await this.$store.dispatch(
            MutationTypes.DELETE_SCALE,
            payload
        );
        if(res.status ===200){
            toast.success('Delete salary scale successfully')
            window.location.reload();
        } else toast.error('Delete failed')
    }

    public async handleAddScale(){
        const payload = {
            coefficient: this.newScale,
        };
        const res = await this.$store.dispatch(
            MutationTypes.ADD_SCALE,
            payload
        );
        if(res.status ===200){
            toast.success('Create salary scale successfully')
            window.location.reload();
        } else toast.error('Create failed')
    }
}