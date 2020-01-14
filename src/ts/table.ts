export class Table {
    private static contentClass = '.edit-area__content';
    static resultsPerPage = 15;

    static renderTable(head: string[],
                       rows: string[][],
                       pageIndex: number,
                       validateCb: (row: string[]) => boolean,
                       editCb: (index: number, indexCell: number, e: string) => void): number {
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
        let startIndex = pageIndex;
        let numRows = 0;
        let endRow = 0;
        for (let row = startIndex; numRows < this.resultsPerPage; row++) {
            endRow = row;
            if (row >= rows.length) {
                break;
            }

            if (validateCb(rows[row])) {
                numRows++;
                
                const tableRow = document.createElement('tr');
                rows[row].forEach((val, col) => {
                    const tableCell = document.createElement('td');
                    const inputEl = document.createElement('input');
                    inputEl.setAttribute('type', 'text');
                    inputEl.value = val;
                    inputEl.className = 'in';
                    tableCell.append(inputEl);
                    tableRow.append(tableCell);
                    inputEl.addEventListener('input', e => editCb(row, col, (e.target as HTMLInputElement).value));
                });

                tableEl.append(tableRow);
            }
        }
        let endIndex = endRow + 1;
        contentEl.append(tableEl);

        return endIndex;
    }
}