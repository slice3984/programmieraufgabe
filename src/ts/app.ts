import { Table } from "./table";

export class App {
    private head: string[];
    private rows: string[][];
    private currPage = 0;
    private productsLeft: number;

    private prevBtnEl: HTMLLinkElement;
    private prevH1El: HTMLHeadingElement;

    private nextBtnEl: HTMLLinkElement;
    private nextH1El: HTMLHeadingElement;

    constructor() {
        this.prevBtnEl = document.getElementById('prev') as HTMLLinkElement;
        this.prevH1El = document.getElementById('prev-page') as HTMLHeadingElement;

        this.prevBtnEl.addEventListener('click', e => {
            e.preventDefault();

            if (this.currPage > 0) {
                this.currPage--;
                this.handlePageSwitch();
            } else {
                this.handlePageSwitch();
            }
        });

        this.nextBtnEl = document.getElementById('next') as HTMLLinkElement;
        this.nextH1El = document.getElementById('next-page') as HTMLHeadingElement;

        this.nextBtnEl.addEventListener('click', e => {
            e.preventDefault();

            if (this.productsLeft) {
                this.currPage++;
                this.handlePageSwitch();
            }
        });
        
        this.handlePageSwitch();
    }

    handleEdit(index: number, indexCell: number, value: string) {
        this.rows[index][indexCell] = value;
    }

    setTable(head: string[], rows: string[][]) {
        this.head = head;
        this.rows = rows;
        this.productsLeft = this.rows.length - (this.currPage * Table.resultsPerPage);
        this.updatePage();
        this.handlePageSwitch();
    }

    handlePageSwitch() {
        if (!this.rows) {
            return;
        }

        const tmpPage = this.currPage + 1;

        if (this.currPage < this.productsLeft) {
            this.nextBtnEl.classList.remove('hide')
            this.nextH1El.textContent = '' + (tmpPage + 1);
        }

        if (this.currPage > 0) {
            this.prevBtnEl.classList.remove('hide');
            this.prevH1El.textContent = '' + (tmpPage - 1);
        }

        if (!this.currPage) {
            this.prevBtnEl.classList.add('hide');
            this.prevH1El.textContent = '';
        }

        this.updatePage();
    }

    updatePage() {
        Table.renderTable(this.head, this.rows, this.currPage, this.handleEdit.bind(this));
    }
}