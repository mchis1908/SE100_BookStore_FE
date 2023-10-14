import { Vue, Options } from 'vue-class-component'

@Options({
    props: {
        voucher: Object
    }
})

export default class VoucherItem extends Vue {
    public voucher!: any;

    public btnCopyText: string = "COPY";
    public copyIt(){
        let copyInput: any = document.querySelector('#copyvalue');
      
        copyInput.select();
      
        navigator.clipboard.writeText(copyInput.value).then(() => {
            this.btnCopyText = "COPIED";
        })

        setTimeout(() => {
            this.btnCopyText = "COPY";
        }, 6000);
      }

      public formatDate(date: string){
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };

        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString('en-US', options);

        return formattedDate;
      }
}