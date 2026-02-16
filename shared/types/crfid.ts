export default class CRFID {
    CRF_ID: string;

    constructor(CRF_ID: number) {
        this.CRF_ID = this.parseCRFID(CRF_ID);
    }

    private parseCRFID(CRF_ID: number): string {
        return CRF_ID.toString().padStart(6, "0");
    }
}
