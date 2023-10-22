import { Vue, Options } from 'vue-class-component'

@Options({
    props: {
        eventData: Object,
        isUpcoming: Boolean
    }, 
})

export default class EventItem extends Vue {
    public eventData!: any
    public isUpcoming!: boolean

    public formatDate(dateString: string) {
        const date: any = new Date(dateString);
        const options: any = { year: 'numeric', month: 'short', day: '2-digit' };

        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }
}