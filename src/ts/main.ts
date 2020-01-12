import { App } from './app';
import { Csv } from './csv';

const app = new App();

document.getElementById('csv-file').addEventListener('change', () => {
    Csv.loadCsv((head, rows) => app.setTable(head, rows));
});