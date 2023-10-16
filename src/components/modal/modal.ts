import { Vue, Options } from "vue-class-component";
import { Modal } from 'bootstrap'

@Options({
    props: {
        title: String,
        content: String,
        actionButtonTitle: String,
        isDangerAction: Boolean,
    }
})

export default class FormattedModal extends Vue {
    public title!: string;
    public content!: string;
    public actionButtonTitle!: string;
    public isDangerAction!: boolean;

    public handleClickActionButton() {
        this.$emit("handleClickActionButton");
    }

    public async openModal() {
        const myModal = new Modal(this.$refs["formatted-modal"] as any)
        myModal.show()
    }
}