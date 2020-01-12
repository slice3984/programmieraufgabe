
export class Table {
    private static contentClass = '.edit-area__content';
    static resultsPerPage = 15;

    private constructor() {}

    static renderTable(head: string[],
                       rows: string[][],
                       page: number,
                       editCb: (index: number, indexCell: number, e: string) => void) {
        const contentEl = document.querySelector(this.contentClass) as HTMLDivElement;
        contentEl.innerHTML = '';
        const tableEl = document.createElement('table');
        
        // Table head
        const tableHeadEl = document.createElement('tr');
        
        head.forEach(cell => {
            const cellEl = document.createElement('th');
            cellEl.textContent = cell;
            tableHeadEl.append(cellEl);
        });

        tableEl.append(tableHeadEl);

        // Table content
        let startIndex = (page) * this.resultsPerPage;
        let endIndex = (page + 1) * this.resultsPerPage;
        for (let i = startIndex; i < endIndex; i++) {
            const tableRow = document.createElement('tr');
            rows[i].forEach((val, index) => {
                const tableCell = document.createElement('td');
                const inputEl = document.createElement('input');
                inputEl.setAttribute('type', 'text');
                inputEl.value = val;
                inputEl.className = 'in';
                tableCell.append(inputEl);
                tableRow.append(tableCell);
                inputEl.addEventListener('input', e => editCb(i, index, (e.target as HTMLInputElement).value));
            });

            tableEl.append(tableRow);
        }
        contentEl.append(tableEl);
    }
}