import { Table } from "./table";
import { Csv } from "./csv";
import { BarChart } from "./chart";

export type productCategory = {
    name: string;
    amount: number;
}

export class App {
    private head: string[];
    private rows: string[][];
    private currPageIndex = 0;
    private nextPageIndex = 0;
    private prevPages: number[] = [];
    private searchQuery: string = '';
    private categories: productCategory[];
    private chart: BarChart;

    private prevBtnEl: HTMLLinkElement;
    private prevH1El: HTMLHeadingElement;

    private nextBtnEl: HTMLLinkElement;
    private nextH1El: HTMLHeadingElement;

    private searchBoxEl: HTMLInputElement;

    private exportBtnEl: HTMLLinkElement;

    constructor() {
        this.prevBtnEl = document.getElementById('prev') as HTMLLinkElement;
        this.prevH1El = document.getElementById('prev-page') as HTMLHeadingElement;

        this.prevBtnEl.addEventListener('click', e => {
            e.preventDefault();

            this.currPageIndex = this.prevPages.pop();
            this.nextPageIndex = this.currPageIndex;
            this.updatePage();
        });

        this.nextBtnEl = document.getElementById('next') as HTMLLinkElement;
        this.nextH1El = document.getElementById('next-page') as HTMLHeadingElement;

        this.nextBtnEl.addEventListener('click', e => {
            e.preventDefault();

            this.prevPages.push(this.currPageIndex);
            this.currPageIndex = this.nextPageIndex;
            this.updatePage();
        });

        this.searchBoxEl = document.getElementById('search') as HTMLInputElement;
        this.searchBoxEl.addEventListener('input', e => {
            this.searchQuery = (e.target as HTMLInputElement).value;
            this.currPageIndex = 0;
            this.prevPages = [];
            this.updatePage();
        })

        this.exportBtnEl = document.getElementById('export') as HTMLLinkElement;
        this.exportBtnEl.addEventListener('click', e => {
            if (this.rows) {
                Csv.saveCsv(this.head, this.rows);
            }
        });
        this.updatePage();
    }

    validateQuery( row: string[] ): boolean {
        if (this.searchQuery == '') {
            return true;
        }
        return row.some(col => col.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()));
    }

    handleEdit(index: number, indexCell: number, value: string) {
        console.log(index, indexCell, value);
        this.rows[index][indexCell] = value;
    }

    setTable(head: string[], rows: string[][]) {
        this.head = head;
        this.rows = rows;
        this.updatePage();
        this.getCategories();
        this.chart = new BarChart(this.categories);
        this.chart.drawChart();
    }

    handlePageSwitch() {
        if (!this.rows) {
            return;
        }

        if (this.nextPageIndex < this.rows.length) {
            this.nextBtnEl.classList.remove('hide')
            this.nextH1El.textContent = '' + (this.prevPages.length + 2);
        } else {
            this.nextBtnEl.classList.add('hide');
            this.nextH1El.textContent = '';
        }

        if (this.currPageIndex > 0) {
            this.prevBtnEl.classList.remove('hide');
            this.prevH1El.textContent = '' + (this.prevPages.length);
        } else {
            this.prevBtnEl.classList.add('hide');
            this.prevH1El.textContent = '';
        }
    }

    updatePage() {
        if (!this.rows) {
            return;
        }

        this.nextPageIndex = Table.renderTable(this.head, this.rows, this.currPageIndex, this.validateQuery.bind(this), this.handleEdit.bind(this));
        this.handlePageSwitch();
    }

    getCategories() {
        this.categories = [];

        this.rows.forEach(row => {
            const cat = row[6]; // 6 = index of the category col

            if (!cat || cat == '') {
                return;
            }

            const index = this.categories.findIndex(c => c.name.trim().toLocaleLowerCase() 
                                                        == cat.trim().toLocaleLowerCase());

            if (index < 0) { // Not found
                this.categories.push({
                    name: cat,
                    amount: 1
                });
            } else {
                this.categories[index].amount++;
            }
        });

        this.categories.sort((a, b) => a.amount - b.amount);

        console.log(this.categories);
    }
}