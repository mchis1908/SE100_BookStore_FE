import { Vue, Options } from "vue-class-component";

@Options({
    props: {
    }
})

export default class Modal extends Vue {
    public handleClickActionButton() {
        this.$emit("handleClickActionButton");
    }
}