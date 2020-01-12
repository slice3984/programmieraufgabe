
export class Table {
    private static contentClass = '.edit-area__content';
    private static resultsPerPage = 10;

    private constructor() {}

    static renderTable(head: string[],
                       rows: string[][],
                       page: number,
                       editCb: () => void) {
        const contentEl = document.querySelector(this.contentClass) as HTMLDivElement;

        let startIndex = page * this.resultsPerPage;
        let endIndex = (page + 1) * this.resultsPerPage;

        // Keep the dom refs
        

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
        for (let i = startIndex; i < endIndex; i++) {
            const tableRow = document.createElement('tr');
            console.log(i)
            rows[i].forEach(val => {
                const tableCell = document.createElement('td');
                const inputEl = document.createElement('input');
                inputEl.setAttribute('type', 'text');
                inputEl.value = val;
                inputEl.className = 'in';
                tableCell.append(inputEl);
                tableRow.append(tableCell);
                inputEl.addEventListener('input', this.editHandler.bind(this, i));
            });

            tableEl.append(tableRow);
        }
        contentEl.append(tableEl);
    }

    

    private static editHandler(arrIndex) {
        console.log(arrIndex);
    }
}