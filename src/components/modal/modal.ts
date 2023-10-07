import { Vue, Options } from "vue-class-component";

@Options({
    props: {
        title: String,
        content: String,
        actionButtonTitle: String,
        isDangerAction: Boolean,
    }
})

export default class Modal extends Vue {
    public title!: string;
    public content!: string;
    public actionButtonTitle!: string;
    public isDangerAction!: boolean;

    public handleClickActionButton() {
        this.$emit("handleClickActionButton");
    }
}