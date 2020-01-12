import { parse } from 'papaparse';
import { Table } from './table';

export class Csv {
    private constructor() {}

    static loadCsv(loadCb: (head, rows) => void) {
        let head;
        let rows;

        const csvFile = (document.getElementById('csv-file') as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.readAsText(csvFile);

        reader.onload = e => {

            let csv = e.target.result as string;

            parse(csv, {complete: res => {
                rows = res.data;
                head = rows[0];
                rows.splice(0, 1);
            }});

            loadCb(head, rows);
        };
    }
}