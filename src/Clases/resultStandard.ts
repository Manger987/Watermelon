export class ResultStandard {
    public status: number;
    public statusMessage: string;
    public data: any;

    constructor() {
        this.status = 0;
        this.statusMessage = '';
        this.data = {};
    }
}
