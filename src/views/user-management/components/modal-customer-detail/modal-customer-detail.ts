import { Vue, Options } from "vue-class-component";

@Options({
    props: {
        idCustomer: Number
    }
})

export default class Modal extends Vue {
    public idCustomer!: string;

    public handleClickActionButton() {
        this.$emit("handleClickActionButton");
    }
}