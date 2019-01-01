export class AddSite {
    constructor(
        public url: string,
        public name: string,
        public category: string,
        public userName: string,
        public password: string,
        public note?: string
    ) {}
}
