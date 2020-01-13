import { parse, unparse } from 'papaparse';
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

    static saveCsv(head: string[], rows: string[][]) {
        const tmpArr = [...rows];
        tmpArr.unshift([...head]);
        const csvData = new Blob([unparse(tmpArr, {delimiter: ';'})], {type: 'text/csv;charset=utf-8;'});

        const csvUrl = window.URL.createObjectURL(csvData);
        const tmpLink = document.createElement('a');
        tmpLink.href = csvUrl;
        tmpLink.setAttribute('download', 'export.csv');
        tmpLink.click();
    }
}