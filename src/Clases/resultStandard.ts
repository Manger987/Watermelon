export class ResultStandard {
    public code: number;
    public statusMessage: string;
    public data: any;

    constructor() {
        this.code = 0;
        this.statusMessage = '';
        this.data = {};
    }
}
